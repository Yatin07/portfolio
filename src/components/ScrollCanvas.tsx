'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── Config ────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240   // Extracted directly from 1080p original video
const INTRO_END    = 120   // auto-play intro ends at frame 120 (~5s at 24fps)
const FPS          = 24    // cinematic auto-play speed

// Frames played during intro: 1..120
function buildPlaylist(): number[] {
  const list: number[] = []
  for (let i = 1; i <= INTRO_END; i++) {
    list.push(i)
  }
  return list
}
const PLAYLIST = buildPlaylist()

function pad(n: number) { return String(n).padStart(3, '0') }
function frameUrl(n: number) { return `/frames/ezgif-frame-${pad(n)}.jpg` }

// ── Types ─────────────────────────────────────────────────────────────────────
type Phase = 'loading' | 'intro' | 'hero' | 'scroll'

export function ScrollCanvas() {
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const images          = useRef<Map<number, HTMLImageElement>>(new Map())
  const currentFrame    = useRef<number>(1)
  const rafRef          = useRef<number>(0)
  const lastTimeRef     = useRef<number>(0)
  const playlistIdx     = useRef<number>(0)
  const containerRef    = useRef<HTMLDivElement>(null)

  const [phase, setPhase]             = useState<Phase>('loading')
  const [heroVisible, setHeroVisible] = useState(false)
  const [scrollPct, setScrollPct]     = useState(0)
  const [loadPct, setLoadPct]         = useState(0)

  // ── Draw a frame with sharp high-DPR scaling ──────────────────────────────
  const draw = useCallback((n: number) => {
    const canvas = canvasRef.current
    const img    = images.current.get(n)
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height
    if (!iw || !ih) return

    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  // ── Resize canvas to device pixel ratio ───────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.max(window.devicePixelRatio || 1, 1)
    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width  = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`

    if (currentFrame.current) {
      draw(currentFrame.current)
    }
  }, [draw])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // Re-size and re-draw whenever phase changes to guarantee canvas dimensions
  useEffect(() => {
    resizeCanvas()
  }, [phase, resizeCanvas])

  // ── Preload frames ────────────────────────────────────────────────────────
  useEffect(() => {
    let done = 0
    const total = TOTAL_FRAMES

    const loadOne = (n: number) => {
      const img = new Image()
      img.src = frameUrl(n)
      img.onload = () => {
        images.current.set(n, img)
        done++
        setLoadPct(done / total)

        if (n === 1) {
          draw(1)
        }
        if (done === 15) {
          setPhase('intro')
        }
      }
      img.onerror = () => {
        done++
        setLoadPct(done / total)
      }
    }

    PLAYLIST.forEach(loadOne)
    for (let n = INTRO_END + 1; n <= TOTAL_FRAMES; n++) loadOne(n)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── AUTO-PLAY: frames 1..109, 131..150 ───────────────────────────────────
  useEffect(() => {
    if (phase !== 'intro') return

    document.body.style.overflow = 'hidden'
    playlistIdx.current = 0
    lastTimeRef.current = 0
    const interval = 1000 / FPS

    const tick = (ts: number) => {
      const elapsed = ts - lastTimeRef.current
      if (elapsed < interval) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastTimeRef.current = ts - (elapsed % interval)

      const idx = playlistIdx.current
      if (idx >= PLAYLIST.length) {
        currentFrame.current = INTRO_END
        draw(INTRO_END)
        setPhase('hero')
        return
      }

      const frameNum = PLAYLIST[idx]
      if (!images.current.has(frameNum)) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      currentFrame.current = frameNum
      draw(frameNum)
      playlistIdx.current = idx + 1
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
    }
  }, [phase, draw])

  // ── HERO: auto-show text, then auto-unlock scroll ─────────────────────────
  useEffect(() => {
    if (phase !== 'hero') return
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setHeroVisible(true), 300)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      setPhase('scroll')
    }, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [phase])

  // ── SCROLL phase: frames 150→300 ──────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'scroll') return

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const maxScroll = container.clientHeight - window.innerHeight
      if (maxScroll <= 0) return

      const pct = Math.max(0, Math.min(scrolled / maxScroll, 1))
      setScrollPct(pct)

      const remaining = TOTAL_FRAMES - INTRO_END
      const frameNum  = INTRO_END + Math.round(pct * remaining)
      const clamped   = Math.min(frameNum, TOTAL_FRAMES)

      if (currentFrame.current !== clamped) {
        currentFrame.current = clamped
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => draw(clamped))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase, draw])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Single Canvas node maintained throughout all phase transitions
  // ─────────────────────────────────────────────────────────────────────────

  const scrollTrackHeight = `${(TOTAL_FRAMES - INTRO_END) * 12 + 100}vh`

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: phase === 'scroll' ? scrollTrackHeight : '100vh',
      }}
    >
      {/* Persistent Full-Screen Viewport Container */}
      <div
        style={{
          position: phase === 'scroll' ? 'sticky' : 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: phase === 'scroll' ? 0 : 50,
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Single Canvas Element — Never Unmounts */}
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Bottom Ambient Dark Gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          }}
        />

        {/* Loading Progress Bar */}
        {phase === 'loading' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--accent)',
                width: `${loadPct * 100}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        )}

        {/* Auto-Play Intro Progress Bar */}
        {phase === 'intro' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--accent)',
                width: `${(playlistIdx.current / PLAYLIST.length) * 100}%`,
                transition: 'width 0.05s linear',
              }}
            />
          </div>
        )}

        {/* Scroll Progress Bar */}
        {phase === 'scroll' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--accent)',
                width: `${scrollPct * 100}%`,
                transition: 'width 0.04s linear',
              }}
            />
          </div>
        )}

        {/* Hero Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 56px 72px',
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 0.9s ease',
            pointerEvents: heroVisible && phase !== 'scroll' ? 'all' : 'none',
          }}
        >
          {/* Role label */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 700,
              marginBottom: 18,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'transform 0.9s ease 0.1s',
            }}
          >
            UI/UX Designer
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 76px)',
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              fontWeight: 700,
              color: '#fff',
              maxWidth: 820,
              margin: '0 0 22px',
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'transform 0.9s ease 0.2s',
            }}
          >
            Designing interfaces that feel completely{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
              effortless.
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 44,
              maxWidth: 500,
              lineHeight: 1.65,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.9s ease 0.3s',
            }}
          >
            I'm Yatin — crafting intuitive experiences for complex digital products.
          </p>

          {/* Scroll hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'transform 0.9s ease 0.45s',
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 600,
              }}
            >
              Scroll to explore
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>↓</div>
          </div>
        </div>
      </div>
    </div>
  )
}
