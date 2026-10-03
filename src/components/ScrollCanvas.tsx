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
  const loadingMap      = useRef<Map<number, boolean>>(new Map())
  const currentFrame    = useRef<number>(1)
  const rafRef          = useRef<number>(0)
  const lastTimeRef     = useRef<number>(0)
  const playlistIdx     = useRef<number>(0)

  const [phase, setPhase]             = useState<Phase>('loading')
  const [heroVisible, setHeroVisible] = useState(false)
  const [scrollPct, setScrollPct]     = useState(0)
  const [loadPct, setLoadPct]         = useState(0)

  // ── Draw a frame with sharp high-DPR scaling & fallback support ──────────────
  const draw = useCallback((n: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 1. Direct match
    let img = images.current.get(n)

    // 2. Fallback to nearest available loaded frame if target frame is still downloading
    if (!img) {
      for (let delta = 1; delta <= 30; delta++) {
        if (n - delta >= 1 && images.current.has(n - delta)) {
          img = images.current.get(n - delta)
          break
        }
        if (n + delta <= TOTAL_FRAMES && images.current.has(n + delta)) {
          img = images.current.get(n + delta)
          break
        }
      }
    }

    if (!img) return

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

  useEffect(() => {
    resizeCanvas()
  }, [phase, resizeCanvas])

  // ── Optimized Staged Frame Preloading ──────────────────────────────────────
  const loadSingleFrame = useCallback((n: number): Promise<HTMLImageElement> => {
    if (images.current.has(n)) {
      return Promise.resolve(images.current.get(n)!)
    }
    if (loadingMap.current.has(n)) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (images.current.has(n)) {
            clearInterval(check)
            resolve(images.current.get(n)!)
          }
        }, 30)
      })
    }

    loadingMap.current.set(n, true)
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = frameUrl(n)
      img.onload = () => {
        images.current.set(n, img)
        loadingMap.current.delete(n)
        resolve(img)
      }
      img.onerror = (err) => {
        loadingMap.current.delete(n)
        reject(err)
      }
    })
  }, [])

  useEffect(() => {
    let loadedCount = 0
    const total = TOTAL_FRAMES

    const updateProgress = () => {
      loadedCount = images.current.size
      setLoadPct(Math.min(loadedCount / total, 1))
    }

    // Step 1: Preload Frame 1 immediately for fast initial paint
    loadSingleFrame(1).then(() => {
      draw(1)
      updateProgress()
    }).catch(() => {})

    // Step 2: Preload initial intro chunk (frames 1..15)
    const initialIntroBatch = Array.from({ length: 15 }, (_, i) => i + 1)
    Promise.all(initialIntroBatch.map(loadSingleFrame)).then(() => {
      updateProgress()
      setPhase('intro')
    }).catch(() => {
      setPhase('intro')
    })

    // Step 3: Stream rest of intro frames (16..120) in small parallel batches
    const streamFramesInChunks = async () => {
      const chunkSize = 12
      for (let i = 16; i <= INTRO_END; i += chunkSize) {
        const chunk = []
        for (let j = i; j < i + chunkSize && j <= INTRO_END; j++) {
          chunk.push(j)
        }
        await Promise.all(chunk.map(loadSingleFrame).map(p => p.catch(() => {})))
        updateProgress()
      }

      // Step 4: Stream scroll frames (121..240) in background
      for (let i = INTRO_END + 1; i <= TOTAL_FRAMES; i += chunkSize) {
        const chunk = []
        for (let j = i; j < i + chunkSize && j <= TOTAL_FRAMES; j++) {
          chunk.push(j)
        }
        await Promise.all(chunk.map(loadSingleFrame).map(p => p.catch(() => {})))
        updateProgress()
      }
    }

    streamFramesInChunks()

    return () => {
      // Cleanup
    }
  }, [draw, loadSingleFrame])

  // ── AUTO-PLAY: frames 1..120 ──────────────────────────────────────────────
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

  // ── HERO: show text & unlock body scroll ──────────────────────────────────
  useEffect(() => {
    if (phase !== 'hero') return
    // Lock briefly so intro finishes smoothly before unlocking
    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setHeroVisible(true), 200)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      setPhase('scroll')
    }, 1200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [phase])

  // ── SCROLL phase: window scroll drives frames 120→240 ─────────────────────
  useEffect(() => {
    if (phase !== 'scroll') return

    const onScroll = () => {
      const scrolled = window.scrollY
      // First 1200px of page scroll animates portrait frames 120->240
      const scrollRange = Math.max(window.innerHeight * 1.5, 1000)
      const pct = Math.max(0, Math.min(scrolled / scrollRange, 1))
      setScrollPct(pct)

      const remaining = TOTAL_FRAMES - INTRO_END
      const frameNum  = INTRO_END + Math.round(pct * remaining)
      const clamped   = Math.min(frameNum, TOTAL_FRAMES)

      if (!images.current.has(clamped)) {
        loadSingleFrame(clamped)
      }

      if (currentFrame.current !== clamped) {
        currentFrame.current = clamped
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => draw(clamped))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase, draw, loadSingleFrame])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Persistent Full-Screen Canvas Fixed Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#000',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Single Canvas Element */}
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
      </div>

      {/* Hero Content Section — in normal document flow so it scrolls UP naturally */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 56px 72px',
          opacity: heroVisible ? 1 : 0,
          transition: 'opacity 0.9s ease',
          pointerEvents: heroVisible ? 'all' : 'none',
        }}
      >
        {/* Role label */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            fontWeight: 700,
            marginBottom: 18,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'transform 0.9s ease 0.1s, color 0.4s ease',
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
            color: 'var(--text-primary)',
            textShadow: '0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)',
            maxWidth: 820,
            margin: '0 0 22px',
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'transform 0.9s ease 0.2s, color 0.4s ease',
          }}
        >
          Designing interfaces that feel completely{' '}
          <span style={{ color: 'var(--accent-fg)', fontStyle: 'italic', transition: 'color 0.4s ease' }}>
            effortless.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 17,
            color: 'var(--text-secondary)',
            marginBottom: 44,
            maxWidth: 500,
            lineHeight: 1.65,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 0.9s ease 0.3s, color 0.4s ease',
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
              color: 'var(--text-tertiary)',
              fontWeight: 600,
              transition: 'color 0.4s ease',
            }}
          >
            Scroll to explore
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}>↓</div>
        </div>
      </section>
    </>
  )
}
