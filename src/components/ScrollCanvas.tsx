'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const TOTAL_FRAMES = 300
const INTRO_END_FRAME = 150      // auto-play stops here
const AUTO_PLAY_FPS = 22         // cinematic feel (~6.8s for 150 frames)
const SCROLL_PIXELS_PER_FRAME = 8 // how many scroll px per frame in phase 3

function pad(n: number) {
  return String(n).padStart(3, '0')
}
function frameUrl(n: number) {
  return `/frames/ezgif-frame-${pad(n)}.jpg`
}

type Phase = 'intro' | 'hero' | 'scroll'

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES + 1).fill(null))
  const currentFrameRef = useRef(1)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const scrollSectionRef = useRef<HTMLDivElement>(null)

  const [phase, setPhase] = useState<Phase>('intro')
  const [introProgress, setIntroProgress] = useState(0) // 0–1 during auto-play
  const [scrollFrame, setScrollFrame] = useState(INTRO_END_FRAME)
  const [heroVisible, setHeroVisible] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  // ── Canvas resize ──────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // ── Draw a frame ───────────────────────────────────────────────────
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[frameNum]
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width: cw, height: ch } = canvas
    const { naturalWidth: iw, naturalHeight: ih } = img
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
  }, [])

  // ── Preload frames ─────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0
    const total = TOTAL_FRAMES

    const loadFrame = (n: number) => new Promise<void>((res) => {
      const img = new Image()
      img.src = frameUrl(n)
      img.onload = () => {
        imagesRef.current[n] = img
        loaded++
        // Draw frame 1 as soon as it's ready
        if (n === 1) drawFrame(1)
        if (loaded === total) setAllLoaded(true)
        res()
      }
      img.onerror = () => { loaded++; res() }
    })

    // Load first 5 frames instantly, then rest in background
    const bootstrap = async () => {
      await Promise.all([1, 2, 3, 4, 5].map(loadFrame))
      for (let n = 6; n <= TOTAL_FRAMES; n++) loadFrame(n)
    }
    bootstrap()
  }, [drawFrame])

  // ── Phase 1: AUTO-PLAY intro (frames 1 → INTRO_END_FRAME) ─────────
  useEffect(() => {
    if (phase !== 'intro') return

    // Lock scroll during intro
    document.body.style.overflow = 'hidden'

    const interval = 1000 / AUTO_PLAY_FPS
    let frame = currentFrameRef.current

    const tick = (timestamp: number) => {
      if (timestamp - lastTimeRef.current < interval) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastTimeRef.current = timestamp

      if (frame < INTRO_END_FRAME) {
        frame++
        currentFrameRef.current = frame
        drawFrame(frame)
        setIntroProgress(frame / INTRO_END_FRAME)
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Intro done → show hero
        currentFrameRef.current = INTRO_END_FRAME
        drawFrame(INTRO_END_FRAME)
        setIntroProgress(1)
        document.body.style.overflow = ''
        setPhase('hero')
        setTimeout(() => setHeroVisible(true), 200)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
    }
  }, [phase, drawFrame])

  // ── Phase 3: SCROLL drives frames INTRO_END_FRAME → TOTAL_FRAMES ──
  useEffect(() => {
    if (phase !== 'scroll') return

    const section = scrollSectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top
      if (scrolled < 0) return

      const totalScrollHeight = section.clientHeight - window.innerHeight
      const progress = Math.min(scrolled / totalScrollHeight, 1)
      const remaining = TOTAL_FRAMES - INTRO_END_FRAME
      const frameNum = INTRO_END_FRAME + Math.floor(progress * remaining)
      const clamped = Math.min(frameNum, TOTAL_FRAMES)

      if (currentFrameRef.current !== clamped) {
        currentFrameRef.current = clamped
        setScrollFrame(clamped)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(clamped))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase, drawFrame])

  // ── Render ─────────────────────────────────────────────────────────
  const scrollProgress = phase === 'scroll'
    ? (scrollFrame - INTRO_END_FRAME) / (TOTAL_FRAMES - INTRO_END_FRAME)
    : 0

  return (
    <>
      {/* ── PHASE 1 & 2: Fullscreen cinematic canvas ─────────────────── */}
      {(phase === 'intro' || phase === 'hero') && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            background: '#000',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
          }} />

          {/* Top gradient for nav readability */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 160, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
          }} />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          }} />

          {/* ── Intro progress bar ──────────────────────────────────── */}
          {phase === 'intro' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 2, background: 'rgba(255,255,255,0.1)',
            }}>
              <div style={{
                height: '100%',
                width: `${introProgress * 100}%`,
                background: 'var(--accent)',
                transition: 'width 0.05s linear',
              }} />
            </div>
          )}

          {/* ── Hero overlay (phase 2) ──────────────────────────────── */}
          <AnimatePresence>
            {phase === 'hero' && heroVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '0 48px 80px',
                  pointerEvents: 'none',
                }}
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{
                    fontSize: 11, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                    fontWeight: 700, marginBottom: 20,
                  }}
                >
                  UI/UX Designer
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 1.05,
                    letterSpacing: '-0.04em', fontWeight: 700,
                    color: '#fff', maxWidth: 780, marginBottom: 28,
                  }}
                >
                  Designing interfaces that feel completely{' '}
                  <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>effortless.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{
                    fontSize: 17, color: 'rgba(255,255,255,0.6)',
                    marginBottom: 48, maxWidth: 520, lineHeight: 1.6,
                  }}
                >
                  I'm Yatin — crafting intuitive, data-driven experiences for complex digital products.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  style={{
                    display: 'flex', gap: 20, alignItems: 'center',
                    pointerEvents: 'all',
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      // Transition to scroll phase
                      setPhase('scroll')
                      // Scroll to the scroll section
                      setTimeout(() => {
                        scrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                    style={{
                      background: '#fff', color: '#000',
                      padding: '15px 32px', borderRadius: 100,
                      fontSize: 14, fontWeight: 700,
                      border: 'none', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    View Work <ArrowRight size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ opacity: 0.7 }}
                    onClick={() => {
                      setPhase('scroll')
                      setTimeout(() => {
                        scrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                    style={{
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.8)',
                      padding: '15px 24px', borderRadius: 100,
                      fontSize: 14, fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    Scroll to explore ↓
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── PHASE 3: Scroll-driven sticky section ────────────────────── */}
      {phase === 'scroll' && (
        <div
          ref={scrollSectionRef}
          style={{
            // Height = scroll room for remaining 150 frames
            height: `${(TOTAL_FRAMES - INTRO_END_FRAME) * SCROLL_PIXELS_PER_FRAME + 100}vh`,
            position: 'relative',
          }}
        >
          {/* Sticky canvas viewport */}
          <div style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
          }}>
            <canvas
              ref={canvasRef}
              style={{ display: 'block', width: '100%', height: '100%' }}
            />

            {/* Vignette */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
            }} />

            {/* Persistent name label while scrolling */}
            <div style={{
              position: 'absolute', left: 48, bottom: 80,
              pointerEvents: 'none',
            }}>
              <div style={{
                fontSize: 11, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                fontWeight: 700, marginBottom: 10,
              }}>
                Yatin Patil
              </div>
              <div style={{
                fontSize: 'clamp(28px, 3vw, 48px)',
                fontWeight: 700, color: '#fff',
                letterSpacing: '-0.03em', opacity: 0.9,
              }}>
                UI/UX Designer
              </div>
            </div>

            {/* Scroll progress bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 2, background: 'rgba(255,255,255,0.08)',
            }}>
              <div style={{
                height: '100%',
                width: `${scrollProgress * 100}%`,
                background: 'var(--accent)',
                transition: 'width 0.05s linear',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed canvas during phases 1 & 2 */}
      {phase !== 'scroll' && (
        <div style={{ height: '100vh' }} />
      )}
    </>
  )
}
