'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import { Frame } from './Frame'
import { hobbies } from '../../data/hobbies'
import { X, Mail, Sparkles } from 'lucide-react'

// Lazy-loaded toys (loaded dynamically when developed / opened)
const ChessPuzzle = dynamic(() => import('./toys/ChessPuzzle'), { ssr: false })
const GymBar = dynamic(() => import('./toys/GymBar'), { ssr: false })
const MusicDeck = dynamic(() => import('./toys/MusicDeck'), { ssr: false })
const PenaltyShootout = dynamic(() => import('./toys/PenaltyShootout'), { ssr: false })
const BeforeAfter = dynamic(() => import('./toys/BeforeAfter'), { ssr: false })
const SketchesGallery = dynamic(() => import('./toys/SketchesGallery'), { ssr: false })
const TwoSum = dynamic(() => import('./toys/TwoSum'), { ssr: false })

type ContactSheetProps = {
  soundEnabled: boolean
}

type FrameDef = {
  id: number
  number: string
  caption: string
  title: string
  sub: string
  aspectRatio: string
}

const FRAME_DEFS: FrameDef[] = [
  { id: 1, number: '01', caption: 'CHESS', title: 'Find the mate or get mated', sub: 'Tactical chess puzzle', aspectRatio: '4/3' },
  { id: 2, number: '02', caption: 'GYM', title: 'Load the bar', sub: 'Barbell plate loading simulator', aspectRatio: '4/3' },
  { id: 3, number: '03', caption: 'MUSIC', title: 'Press play', sub: 'Interactive 4-pad drum sampler', aspectRatio: '4/3' },
  { id: 4, number: '04', caption: 'FOOTBALL', title: 'Take the penalty', sub: 'Penalty shootout simulator', aspectRatio: '4/3' },
  { id: 5, number: '05', caption: 'SKETCHES', title: 'Pencil & Graphite Fine Art', sub: '5 Hand-Drawn Sketches Gallery', aspectRatio: '4/3' },
  { id: 6, number: '06', caption: 'LEETCODE', title: '250+ Problems Solved', sub: 'Live Stats & Heatmap', aspectRatio: '4/3' },
]

export function ContactSheet({ soundEnabled }: ContactSheetProps) {
  const [developedIds, setDevelopedIds] = useState<number[]>([])
  const [activeFrameId, setActiveFrameId] = useState<number | null>(null)
  const [litFrameId, setLitFrameId] = useState<number | null>(null)
  const [cursorY, setCursorY] = useState<number>(-500)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  const sheetRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerButtonRef = useRef<HTMLDivElement | null>(null)

  const [isMounted, setIsMounted] = useState<boolean>(false)

  // SSR Safe localStorage loading
  useEffect(() => {
    setIsMounted(true)
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('darkroom_developed_frames')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) setDevelopedIds(parsed)
        }
      }
    } catch {}

    if (typeof window !== 'undefined' && window.matchMedia) {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  }, [])

  // Safelight cursor follower throttled with requestAnimationFrame
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const sheet = sheetRef.current
    if (!sheet) return
    const rect = sheet.getBoundingClientRect()
    const relY = e.clientY - rect.top

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setCursorY(relY)
    })
  }, [prefersReducedMotion])

  const developFrame = (id: number) => {
    if (!developedIds.includes(id)) {
      const nextDev = [...developedIds, id]
      setDevelopedIds(nextDev)
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('darkroom_developed_frames', JSON.stringify(nextDev))
        }
      } catch {}
    }
    setActiveFrameId(id)
  }

  // Focus Trapping & Esc Key Modal Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeFrameId !== null) {
        setActiveFrameId(null)
      }
    }

    if (activeFrameId !== null) {
      window.addEventListener('keydown', handleKeyDown)
      modalRef.current?.focus()
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeFrameId])

  const allDeveloped = FRAME_DEFS.every((f) => developedIds.includes(f.id))

  const renderToy = (id: number) => {
    switch (id) {
      case 1: return <ChessPuzzle soundEnabled={soundEnabled} />
      case 2: return <GymBar soundEnabled={soundEnabled} />
      case 3: return <MusicDeck soundEnabled={soundEnabled} />
      case 4: return <PenaltyShootout soundEnabled={soundEnabled} />
      case 5: return <SketchesGallery soundEnabled={soundEnabled} />
      case 6: return <TwoSum soundEnabled={soundEnabled} />
      default: return null
    }
  }

  return (
    <div
      ref={sheetRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1140,
        margin: '0 auto',
        padding: '24px 0',
      }}
    >
      {/* Safelight Cursor Soft Horizontal Light Band */}
      {!prefersReducedMotion && cursorY >= 0 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: cursorY - 100,
            height: 200,
            background:
              'linear-gradient(to bottom, transparent, rgba(255, 75, 58, 0.12) 50%, transparent)',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'top 0.05s linear',
          }}
        />
      )}

      {/* 3x2 Grid (Desktop) / 2x3 (Tablet) / 1 Column (Mobile) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {FRAME_DEFS.map((f) => {
          const isDev = developedIds.includes(f.id)
          const isLit = prefersReducedMotion || litFrameId === f.id

          return (
            <Frame
              key={f.id}
              number={f.number}
              caption={f.caption}
              aspectRatio={f.aspectRatio}
              developed={isDev}
              isLit={isLit}
              onClick={() => {
                setLitFrameId(f.id)
                developFrame(f.id)
              }}
            >
              {/* Frame Preview Card Content */}
              <div
                style={{
                  textAlign: 'center',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <div style={{ fontSize: 13, color: 'var(--accent-fg)', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: 8, transition: 'color 0.4s ease' }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}>
                  {f.sub}
                </div>
              </div>
            </Frame>
          )
        })}
      </div>

      {/* Unlocked 7th Frame: "07 · SAY HI" (Revealed ONLY after all 6 developed) */}
      {allDeveloped && (
        <div
          style={{
            marginTop: 40,
            padding: 32,
            borderRadius: 20,
            background: 'var(--surface-darkroom, #16161A)',
            border: '2px dashed var(--accent)',
            boxShadow: '0 0 35px var(--accent-transparent)',
            textAlign: 'center',
            position: 'relative',
            zIndex: 3,
            transition: 'border-color 0.4s ease',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--accent-fg)', fontWeight: 700, marginBottom: 12, transition: 'color 0.4s ease' }}>
            07 · SAY HI · UNLOCKED
          </div>

          <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, transition: 'color 0.4s ease' }}>
            Contact Sheet Complete
          </h3>

          {hobbies.finalNote && (
            <p style={{ fontSize: 15, color: 'var(--text-tertiary)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6, transition: 'color 0.4s ease' }}>
              {hobbies.finalNote}
            </p>
          )}

          <a
            href="mailto:yatinpatilyp07@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              borderRadius: 30,
              background: 'var(--accent)',
              color: 'var(--accent-text)',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 0 20px var(--accent-transparent)',
              transition: 'background 0.4s ease, color 0.4s ease',
            }}
          >
            <Mail size={16} /> Send Me an Email
          </a>
        </div>
      )}

      {/* Expanded Modal / In-Place Panel for Active Toy (Rendered via Portal above Nav) */}
      {activeFrameId !== null && isMounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Frame ${activeFrameId} expanded panel`}
          tabIndex={-1}
          ref={modalRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(10, 10, 12, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '70px 16px 20px',
            outline: 'none',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 580,
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto',
              background: 'var(--surface-darkroom, #16161A)',
              border: '1px solid var(--border-darkroom, #2A2A30)',
              borderRadius: 24,
              padding: '40px 24px 24px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.95), 0 0 40px rgba(255, 75, 58, 0.25)',
              margin: 'auto',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveFrameId(null)}
              aria-label="Close frame panel"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-darkroom, #2A2A30)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Toy Content */}
            {renderToy(activeFrameId)}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
