
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Github, ExternalLink, Camera } from 'lucide-react'
import { claims } from '../data/claims'

export function Moments() {
  const verifiedCards = claims
    .filter(c => c.status === 'verified')
    .map((c, i) => ({
      id: c.id,
      title: c.title || 'Achievement',
      projectName: c.projectName,
      github: c.github,
      desc: c.text,
      tags: c.tags || [],
      year: c.year || '2024',
      image: c.image,
      gallery: c.gallery,
      color: ['#FF4B3A', '#33ECFF', '#00E676', '#B983F0', '#FF9E7D', '#FFAF94'][i % 6]
    }))

  const [cards, setCards] = useState(verifiedCards.length > 0 ? verifiedCards : [])

  const moveCard = () => {
    setCards((prev) => {
      if (prev.length <= 1) return prev
      const newCards = [...prev]
      newCards.unshift(newCards.pop()!)
      return newCards
    })
  }

  const prevCard = () => {
    setCards((prev) => {
      if (prev.length <= 1) return prev
      const newCards = [...prev]
      const first = newCards.shift()!
      newCards.push(first)
      return newCards
    })
  }

  const frontCard = cards[cards.length - 1]
  const galleryList = frontCard?.gallery || (frontCard?.image ? [frontCard.image] : [])

  return (
    <section id="moments" style={{ padding: '140px 24px', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        
        {/* Header Tag */}
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--accent-fg)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, transition: 'color 0.4s ease' }}>
          TIMELINE & HACKATHONS
        </div>

        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>
          Moments that mattered.
        </h2>
        
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 64px', transition: 'color 0.4s ease' }}>
          Swipe cards or use navigation controls to explore key milestones, national hackathons, and product prototypes.
        </p>

        {/* Outer Section Canvas Container */}
        <div style={{ position: 'relative', minHeight: 520, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* FLOATING DARKROOM PHOTOS (Popping up dynamically in outer empty space for front card) */}
          <AnimatePresence mode="wait">
            {frontCard && galleryList.length > 0 && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
                
                {/* Photo 1: Primary Photo (Left or Right side depending on count) */}
                <motion.div
                  key={`${frontCard.id}-photo-0`}
                  initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{
                    position: 'absolute',
                    top: galleryList.length > 1 ? 20 : 40,
                    left: galleryList.length > 1 ? 'calc(50% - 460px)' : 'calc(50% + 220px)',
                    width: 270,
                    padding: '10px 10px 18px',
                    background: 'var(--card-bg, rgba(18, 18, 22, 0.9))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 25px var(--accent-transparent)',
                    pointerEvents: 'auto',
                  }}
                  className="hide-on-mobile"
                >
                  {/* Tape Accent */}
                  <div style={{ width: 40, height: 10, background: 'var(--accent-fg)', opacity: 0.4, margin: '-15px auto 10px', borderRadius: 2 }} />
                  
                  <div style={{ width: '100%', height: 180, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: '#0A0A0C' }}>
                    <img src={galleryList[0]} alt={frontCard.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ marginTop: 10, fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--accent-fg)', fontWeight: 700, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Camera size={12} />
                    <span>{frontCard.title}</span>
                  </div>
                </motion.div>

                {/* Photo 2: Secondary Photo (For NMIMS Tech Fiesta 2025 with 2 photos) */}
                {galleryList.length > 1 && (
                  <motion.div
                    key={`${frontCard.id}-photo-1`}
                    initial={{ opacity: 0, scale: 0.8, y: 40, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 5 }}
                    exit={{ opacity: 0, scale: 0.8, y: -30, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 50,
                      right: 'calc(50% - 460px)',
                      width: 250,
                      padding: '10px 10px 18px',
                      background: 'var(--card-bg, rgba(18, 18, 22, 0.9))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 25px var(--accent-transparent)',
                      pointerEvents: 'auto',
                    }}
                    className="hide-on-mobile"
                  >
                    {/* Tape Accent */}
                    <div style={{ width: 40, height: 10, background: 'var(--accent-fg)', opacity: 0.4, margin: '-15px auto 10px', borderRadius: 2 }} />
                    
                    <div style={{ width: '100%', height: 210, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', background: '#0A0A0C' }}>
                      <img src={galleryList[1]} alt={frontCard.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ marginTop: 10, fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--accent-fg)', fontWeight: 700, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Camera size={12} />
                      <span>24-Hour Innovation Team</span>
                    </div>
                  </motion.div>
                )}

              </div>
            )}
          </AnimatePresence>

          {/* MAIN CARD STACK (In Center) */}
          <div style={{ position: 'relative', width: 380, height: 490, display: 'flex', justifyContent: 'center' }}>
            {cards.map((card, i) => {
              const isFront = i === cards.length - 1

              return (
                <motion.div
                  key={card.id}
                  drag={isFront ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (Math.abs(offset.x) > 80) moveCard()
                  }}
                  animate={{
                    scale: isFront ? 1 : 1 - (cards.length - 1 - i) * 0.045,
                    y: isFront ? 0 : (cards.length - 1 - i) * -16,
                    zIndex: i
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: 380,
                    height: 480,
                    background: 'var(--card-bg, rgba(18, 18, 22, 0.85))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    borderRadius: 24,
                    boxShadow: isFront ? '0 25px 50px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.2)',
                    padding: 28,
                    cursor: isFront ? 'grab' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: `4px solid ${card.color}`,
                    transition: 'border-color 0.4s ease, background 0.4s ease',
                    userSelect: 'none',
                  }}
                >
                  <div>
                    {/* Header Row: Date & Code Link */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 13, fontWeight: 700, color: 'var(--accent-fg)', transition: 'color 0.4s ease' }}>
                        {card.year}
                      </span>

                      {card.github && isFront && (
                        <a
                          href={card.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'var(--bg-hover)',
                            border: '1px solid var(--border)',
                            borderRadius: 16,
                            padding: '4px 12px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Github size={13} />
                          <span>Code</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>

                    {/* Main Title */}
                    <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)', textAlign: 'left', lineHeight: 1.2, transition: 'color 0.4s ease' }}>
                      {card.title}
                    </h3>

                    {/* Product Name Subtitle (If available) */}
                    {card.projectName && (
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-fg)', textAlign: 'left', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-fg)', display: 'inline-block' }} />
                        <span>{card.projectName}</span>
                      </div>
                    )}

                    {/* Description Text */}
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'left', lineHeight: 1.6, marginBottom: 18, transition: 'color 0.4s ease' }}>
                      {card.desc}
                    </p>

                    {/* Tech Badges / Feature Tags */}
                    {card.tags && card.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                        {card.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 11,
                              fontFamily: 'var(--font-mono, monospace)',
                              padding: '3px 9px',
                              borderRadius: 8,
                              background: 'var(--bg-hover)',
                              border: '1px solid var(--border)',
                              color: 'var(--text-tertiary)',
                              fontWeight: 500,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                      {isFront ? 'Swipe ↔' : ''}
                    </span>

                    {isFront && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={prevCard}
                          aria-label="Previous card"
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
                          onClick={moveCard}
                          aria-label="Next card"
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
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
