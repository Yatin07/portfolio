
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Layers, Github, ExternalLink } from 'lucide-react'
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
      year: c.year || '2024',
      image: c.image,
      gallery: c.gallery,
      color: ['#FF4B3A', '#33ECFF', '#00E676', '#B983F0', '#FF9E7D', '#FFAF94'][i % 6]
    }))

  const [cards, setCards] = useState(verifiedCards.length > 0 ? verifiedCards : [])
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<Record<string, number>>({})

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

  const cycleGallery = (cardId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveGalleryIdx(prev => ({
      ...prev,
      [cardId]: ((prev[cardId] || 0) + 1) % total
    }))
  }

  return (
    <section id="moments" style={{ padding: '140px 24px', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header Tag */}
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, color: 'var(--accent-fg)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, transition: 'color 0.4s ease' }}>
          TIMELINE & HACKATHONS
        </div>

        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>
          Moments that mattered.
        </h2>
        
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 56px', transition: 'color 0.4s ease' }}>
          Swipe cards or use navigation controls to explore key milestones, national hackathons, and achievements.
        </p>

        {/* Card Carousel Stack */}
        <div style={{ position: 'relative', height: 490, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {cards.map((card, i) => {
            const isFront = i === cards.length - 1
            const galleryList = card.gallery || (card.image ? [card.image] : [])
            const currentGalleryIdx = activeGalleryIdx[card.id] || 0
            const currentImg = galleryList[currentGalleryIdx] || card.image

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
                  background: 'var(--card-bg, rgba(18, 18, 22, 0.75))',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  boxShadow: isFront ? '0 25px 50px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.2)',
                  padding: 24,
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
                  {/* Event Image Display */}
                  {currentImg ? (
                    <div style={{ position: 'relative', width: '100%', height: 180, borderRadius: 16, overflow: 'hidden', marginBottom: 14, border: '1px solid var(--border)', background: '#0A0A0C' }}>
                      <img
                        src={currentImg}
                        alt={card.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />

                      {/* Multi-Photo Gallery Switcher Badge */}
                      {galleryList.length > 1 && isFront && (
                        <button
                          onClick={(e) => cycleGallery(card.id, galleryList.length, e)}
                          style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            borderRadius: 20,
                            background: 'rgba(12, 12, 14, 0.85)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Layers size={12} color="var(--accent-fg)" />
                          <span>Photo {currentGalleryIdx + 1}/{galleryList.length}</span>
                        </button>
                      )}
                    </div>
                  ) : null}

                  {/* Date & Title & GitHub link */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12, fontWeight: 700, color: 'var(--accent-fg)', transition: 'color 0.4s ease' }}>
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
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          background: 'var(--bg-hover)',
                          border: '1px solid var(--border)',
                          borderRadius: 14,
                          padding: '3px 10px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Github size={12} />
                        <span>Code</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)', textAlign: 'left', lineHeight: 1.25, transition: 'color 0.4s ease' }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'left', lineHeight: 1.45, transition: 'color 0.4s ease' }}>
                    {card.desc}
                  </p>
                </div>

                {/* Footer Controls & Drag Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    {isFront ? 'Swipe ↔' : ''}
                  </span>

                  {isFront && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={prevCard}
                        aria-label="Previous card"
                        style={{
                          width: 32,
                          height: 32,
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
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={moveCard}
                        aria-label="Next card"
                        style={{
                          width: 32,
                          height: 32,
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
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
