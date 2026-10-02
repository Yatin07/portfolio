'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 300
const INTRO_FRAMES = 150      // frames 1-150: fullscreen intro
const PRELOAD_BATCH = 30      // preload frames in batches

function pad(n: number) {
  return String(n).padStart(3, '0')
}

function frameUrl(n: number) {
  return `/frames/ezgif-frame-${pad(n)}.jpg`
}

export function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [phase, setPhase] = useState<'intro' | 'background'>('intro')
  const [introProgress, setIntroProgress] = useState(0) // 0-1

  // Preload all frames progressively
  useEffect(() => {
    let mounted = true
    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = frameUrl(i + 1)
        img.onload = () => {
          if (mounted) imagesRef.current[i] = img
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    // Load first 30 frames immediately (above the fold)
    const loadBatch = async (start: number, end: number) => {
      const promises = []
      for (let i = start; i < end && i < TOTAL_FRAMES; i++) {
        promises.push(loadFrame(i))
      }
      await Promise.all(promises)
    }

    // Priority: first 30, then rest
    loadBatch(0, PRELOAD_BATCH).then(() => {
      for (let batch = PRELOAD_BATCH; batch < TOTAL_FRAMES; batch += PRELOAD_BATCH) {
        loadBatch(batch, batch + PRELOAD_BATCH)
      }
    })

    return () => { mounted = false }
  }, [])

  // Draw frame to canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[frameIndex]
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Maintain aspect ratio — cover the canvas
    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const drawW = iw * scale
    const drawH = ih * scale
    const ox = (cw - drawW) / 2
    const oy = (ch - drawH) / 2
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, ox, oy, drawW, drawH)
  }

  // Resize canvas to window
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Scroll → frame mapping
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const introScrollHeight = container.clientHeight - window.innerHeight

      if (scrolled < 0) {
        // Above intro section
        if (phase !== 'intro') setPhase('intro')
        const frameIndex = 0
        if (currentFrameRef.current !== frameIndex) {
          currentFrameRef.current = frameIndex
          rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
        }
        setIntroProgress(0)
        return
      }

      const introEnd = introScrollHeight * (INTRO_FRAMES / TOTAL_FRAMES)

      if (scrolled <= introEnd) {
        // Phase 1: Intro — sticky, frames 0-149
        if (phase !== 'intro') setPhase('intro')
        const progress = Math.min(scrolled / introEnd, 1)
        setIntroProgress(progress)
        const frameIndex = Math.min(Math.floor(progress * (INTRO_FRAMES - 1)), INTRO_FRAMES - 1)
        if (currentFrameRef.current !== frameIndex) {
          currentFrameRef.current = frameIndex
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
        }
      } else {
        // Phase 2: Background — frames 150-299
        if (phase !== 'background') setPhase('background')
        setIntroProgress(1)
        const bgProgress = Math.min((scrolled - introEnd) / (introScrollHeight - introEnd), 1)
        const frameIndex = INTRO_FRAMES + Math.floor(bgProgress * (TOTAL_FRAMES - INTRO_FRAMES - 1))
        if (currentFrameRef.current !== frameIndex) {
          currentFrameRef.current = frameIndex
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase])

  // Initial draw
  useEffect(() => {
    const timer = setTimeout(() => {
      if (imagesRef.current[0]) drawFrame(0)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        // Total scroll height: ~400vh gives frames room to breathe
        height: '400vh',
        position: 'relative',
      }}
    >
      {/* Sticky canvas viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Dark overlay that fades away as intro progresses */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: Math.max(0, 0.6 - introProgress * 1.5),
            pointerEvents: 'none',
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* Subtle vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Scroll hint — fades out as user scrolls */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: Math.max(0, 1 - introProgress * 5),
            transition: 'opacity 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 600,
            }}
          >
            Scroll
          </div>
          {/* Animated scroll indicator */}
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'rgba(255,255,255,0.8)',
                animation: 'scrollHint 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
