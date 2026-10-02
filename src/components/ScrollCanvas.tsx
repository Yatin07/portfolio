'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ── Config ────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 300
const SKIP_START   = 110   // skip blink frames
const SKIP_END     = 130   // exclusive — frames 110..130 are skipped
const INTRO_END    = 150   // auto-play ends here
const FPS          = 24    // cinematic auto-play speed

// Frames we actually play: 1..109, 131..150
function buildPlaylist(): number[] {
  const list: number[] = []
  for (let i = 1; i <= INTRO_END; i++) {
    if (i >= SKIP_START && i <= SKIP_END) continue
    list.push(i)
  }
  return list
}
const PLAYLIST = buildPlaylist() // ~131 frames to auto-play

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
  const scrollRef       = useRef<HTMLDivElement>(null)

  const [phase, setPhase]             = useState<Phase>('loading')
  const [heroVisible, setHeroVisible] = useState(false)
  const [scrollPct, setScrollPct]     = useState(0)    // 0-1 for frames 150-300
  const [loadPct, setLoadPct]         = useState(0)    // preload progress

  // ── Canvas: size at full device pixel ratio ──────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width  = window.innerWidth  * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width  = window.innerWidth  + 'px'
    canvas.style.height = window.innerHeight + 'px'
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // ── Draw a frame ──────────────────────────────────────────────────────────
  const draw = useCallback((n: number) => {
    const canvas = canvasRef.current
    const img    = images.current.get(n)
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const cw  = canvas.width            // already multiplied by dpr
    const ch  = canvas.height
    const iw  = img.naturalWidth
    const ih  = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }, [])

  // ── Preload all frames ────────────────────────────────────────────────────
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
        // Draw first frame as soon as it's ready
        if (n === 1 && phase === 'loading') {
          draw(1)
        }
        // Start auto-play once first 15 frames are loaded
        if (done === 15) {
          setPhase('intro')
        }
      }
      img.onerror = () => { done++; setLoadPct(done / total) }
    }

    // Prioritise playlist frames first
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
        // Done — show hero
        currentFrame.current = INTRO_END
        draw(INTRO_END)
        setPhase('hero')
        return
      }

      const frameNum = PLAYLIST[idx]
      // If image not loaded yet, wait this tick
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

    // Hero text fades in after 300ms
    const t1 = setTimeout(() => setHeroVisible(true), 300)
    // Unlock scroll after 2.5s (user has read it)
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

  // ── SCROLL phase: frames 150→300 in background, UI scrolls over ──────────
  useEffect(() => {
    if (phase !== 'scroll') return

    const onScroll = () => {
      const el = scrollRef.current
      if (!el) return
      const rect     = el.getBoundingClientRect()
      const scrolled = -rect.top
      const max      = el.clientHeight - window.innerHeight
      if (max <= 0 || scrolled < 0) return
      const pct = Math.min(scrolled / max, 1)
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
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  const isFixed  = phase === 'loading' || phase === 'intro' || phase === 'hero'
  const isScroll = phase === 'scroll'

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          FIXED CANVAS (phases: loading, intro, hero)
          ═══════════════════════════════════════════════════════════════════ */}
      {isFixed && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50, background: '#000',
        }}>
          <canvas ref={canvasRef} style={{ display: 'block' }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.8) 100%)',
          }} />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          }} />

          {/* Loading progress bar */}
          {phase === 'loading' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}>
              <div style={{
                height: '100%', background: 'var(--accent)',
                width: `${loadPct * 100}%`, transition: 'width 0.1s linear',
              }} />
            </div>
          )}

          {/* Intro progress bar */}
          {phase === 'intro' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}>
              <div style={{
                height: '100%', background: 'var(--accent)',
                width: `${(playlistIdx.current / PLAYLIST.length) * 100}%`,
                transition: 'width 0.05s linear',
              }} />
            </div>
          )}

          {/* ── HERO OVERLAY ── */}
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '0 56px 72px',
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.9s ease',
              pointerEvents: heroVisible ? 'all' : 'none',
            }}
          >
            {/* Role label */}
            <div style={{
              fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginBottom: 18,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'transform 0.9s ease 0.1s',
            }}>
              UI/UX Designer
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 76px)', lineHeight: 1.06,
              letterSpacing: '-0.04em', fontWeight: 700,
              color: '#fff', maxWidth: 820, marginBottom: 22, margin: '0 0 22px',
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'transform 0.9s ease 0.2s',
            }}>
              Designing interfaces that feel completely{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>effortless.</span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,0.55)',
              marginBottom: 44, maxWidth: 500, lineHeight: 1.65,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.9s ease 0.3s',
            }}>
              I'm Yatin — crafting intuitive experiences for complex digital products.
            </p>

            {/* Scroll hint */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'transform 0.9s ease 0.45s',
            }}>
              <div style={{
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', fontWeight: 600,
              }}>
                Scroll to explore
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>↓</div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer so page has height during fixed phase */}
      {isFixed && <div style={{ height: '100vh' }} />}

      {/* ═══════════════════════════════════════════════════════════════════
          SCROLL PHASE: sticky canvas behind, UI scrolls on top
          ═══════════════════════════════════════════════════════════════════ */}
      {isScroll && (
        <div ref={scrollRef} style={{
          // Scroll room: 150 remaining frames × generous scroll amount
          height: `${(TOTAL_FRAMES - INTRO_END) * 12 + 100}vh`,
          position: 'relative',
        }}>
          {/* Sticky canvas — stays behind everything */}
          <div style={{
            position: 'sticky', top: 0, height: '100vh',
            overflow: 'hidden', zIndex: 0,
          }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />

            {/* Same vignette */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.8) 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            }} />

            {/* Progress bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: 'rgba(255,255,255,0.08)',
            }}>
              <div style={{
                height: '100%', background: 'var(--accent)',
                width: `${scrollPct * 100}%`, transition: 'width 0.04s linear',
              }} />
            </div>
          </div>

          {/* Page sections scroll on top (dark overlay fades in so sections are readable) */}
          <div style={{
            position: 'absolute',
            // Start sections after ~80% of scroll frames complete
            top: `${(TOTAL_FRAMES - INTRO_END) * 12 * 0.8}vh`,
            left: 0, right: 0,
            background: 'var(--bg-main)',
            zIndex: 10,
          }} id="sections-start" />
        </div>
      )}
    </>
  )
}
