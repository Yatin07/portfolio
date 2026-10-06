'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Sparkles, ChevronLeft, ChevronRight, Grid, Image as ImageIcon } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

export type SketchItem = {
  id: string
  title: string
  subtitle: string
  medium: string
  image: string
  year: string
  aspectRatio: string
}

export const SKETCHES: SketchItem[] = [
  {
    id: 'shivaji-maharaj',
    title: 'Chhatrapati Shivaji Maharaj',
    subtitle: 'Historical Portrait in Graphite',
    medium: 'Pencil & Graphite on Paper',
    image: '/sketches/shivaji_maharaj.jpg',
    year: '2024',
    aspectRatio: '4/5'
  },
  {
    id: 'red-accent-portrait',
    title: 'Lady in Red Accents',
    subtitle: 'Side Profile with Crimson Highlights',
    medium: 'Graphite & Colored Accent',
    image: '/sketches/red_accent_portrait.jpg',
    year: '2024',
    aspectRatio: '3/4'
  },
  {
    id: 'wavy-hair-portrait',
    title: 'Wavy Locks Study',
    subtitle: 'Texture & Flow Graphite Shading',
    medium: 'Soft Pencil & Blending Stump',
    image: '/sketches/wavy_hair_portrait.jpg',
    year: '2024',
    aspectRatio: '3/4'
  },
  {
    id: 'beard-glasses-portrait',
    title: 'Portrait in Glasses',
    subtitle: 'Value & Perspective Study',
    medium: 'Graphite & Charcoal',
    image: '/sketches/beard_glasses_portrait.jpg',
    year: '2024',
    aspectRatio: '3/4'
  },
  {
    id: 'realistic-eye-study',
    title: 'Iris Realism Study',
    subtitle: 'Reflective Light & Lash Detailing',
    medium: '2B-8B Graphite Pencils',
    image: '/sketches/realistic_eye_study.jpg',
    year: '2024',
    aspectRatio: '4/3'
  }
]

export default function SketchesGallery({ soundEnabled }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('grid')
  const [lightboxSketch, setLightboxSketch] = useState<SketchItem | null>(null)

  const current = SKETCHES[currentIndex]

  const nextSketch = () => {
    setCurrentIndex((prev) => (prev + 1) % SKETCHES.length)
  }

  const prevSketch = () => {
    setCurrentIndex((prev) => (prev - 1 + SKETCHES.length) % SKETCHES.length)
  }

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Header Mode Switcher & View All at Once */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--accent-fg)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            RAW ARTWORKS & SKETCHES
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Hand-Drawn Pencil Collection
          </div>
        </div>

        <button
          onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 20,
            background: 'var(--accent-transparent, rgba(255, 75, 58, 0.15))',
            border: '1px solid var(--border)',
            color: 'var(--accent-fg)',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {viewMode === 'single' ? (
            <>
              <Grid size={14} /> View All at Once ✨
            </>
          ) : (
            <>
              <ImageIcon size={14} /> Spotlight View
            </>
          )}
        </button>
      </div>

      {/* SINGLE SPOTLIGHT VIEW */}
      {viewMode === 'single' && (
        <div>
          {/* Main Frame Mount */}
          <div
            onClick={() => setLightboxSketch(current)}
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: 380,
              aspectRatio: '4/3',
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#08080A',
              padding: 12,
              boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px var(--accent-transparent)',
              cursor: 'zoom-in',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Paper Texture Frame Wrapper */}
            <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden', position: 'relative', background: '#0F0F12', border: '1px solid rgba(255,255,255,0.08)' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: '#0F0F12',
                  }}
                />
              </AnimatePresence>

              {/* Hover Zoom Hint */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  padding: '6px 12px',
                  borderRadius: 14,
                  background: 'rgba(0,0,0,0.75)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFF',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono, monospace)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <Maximize2 size={12} /> Click to Expand
              </div>
            </div>
          </div>

          {/* Sketch Info Card & Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {current.title}
              </h4>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                {current.subtitle} • <span style={{ color: 'var(--accent-fg)' }}>{current.medium}</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={prevSketch}
                aria-label="Previous sketch"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSketch}
                aria-label="Next sketch"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, overflowX: 'auto', padding: '4px 0' }}>
            {SKETCHES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: currentIndex === idx ? '2px solid var(--accent-fg)' : '1px solid var(--border)',
                  opacity: currentIndex === idx ? 1 : 0.5,
                  padding: 0,
                  cursor: 'pointer',
                  background: '#000',
                  transition: 'all 0.2s ease',
                }}
              >
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW ALL AT ONCE (AESTHETIC GALLERY MASONRY / GRID) */}
      {viewMode === 'grid' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 12,
            maxHeight: 420,
            overflowY: 'auto',
            paddingRight: 4,
          }}
        >
          {SKETCHES.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightboxSketch(s)}
              style={{
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                background: '#0B0B0E',
                border: '1px solid var(--border)',
                padding: 6,
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ width: '100%', height: 160, borderRadius: 10, overflow: 'hidden', background: '#050507' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: 6, textAlign: 'left', padding: '2px 4px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 10, color: 'var(--accent-fg)', fontFamily: 'var(--font-mono, monospace)' }}>
                  {s.year} • Hand-Drawn
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* LIGHTBOX EXPANDED FULL VIEW */}
      {lightboxSketch && (
        <div
          onClick={() => setLightboxSketch(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100005,
            background: 'rgba(5, 5, 8, 0.95)',
            backdropFilter: 'blur(25px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '82vh',
              background: '#0C0C0F',
              borderRadius: 20,
              padding: 16,
              border: '1px solid var(--border)',
              boxShadow: '0 30px 70px rgba(0,0,0,0.9), 0 0 35px var(--accent-transparent)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={lightboxSketch.image}
              alt={lightboxSketch.title}
              style={{
                maxWidth: '100%',
                maxHeight: '68vh',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            />

            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {lightboxSketch.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
                {lightboxSketch.subtitle} — <span style={{ color: 'var(--accent-fg)' }}>{lightboxSketch.medium}</span>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
