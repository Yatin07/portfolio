
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export function Moments() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Hackathon Winner', desc: 'Built a sustainable energy tracker in 24 hours.', year: '2025', color: '#ffb3ba' },
    { id: 2, title: 'UX Design Internship', desc: 'Redesigned the core onboarding flow, increasing conversion by 14%.', year: '2024', color: '#bae1ff' },
    { id: 3, title: 'Google UX Certificate', desc: 'Mastered the foundations of user-centered design.', year: '2023', color: '#baffc9' },
  ])

  const moveCard = () => {
    setCards((prev) => {
      const newCards = [...prev]
      newCards.unshift(newCards.pop()!)
      return newCards
    })
  }

  return (
    <section style={{ padding: '150px 48px', background: 'var(--bg-main)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24 }}>Moments that mattered.</h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 80 }}>Swipe to explore my timeline.</p>

        <div style={{ position: 'relative', height: 400, display: 'flex', justifyContent: 'center' }}>
          {cards.map((card, i) => {
            const isFront = i === cards.length - 1
            return (
              <motion.div
                key={card.id}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (Math.abs(offset.x) > 100) moveCard()
                }}
                animate={{
                  scale: isFront ? 1 : 1 - (cards.length - 1 - i) * 0.05,
                  y: isFront ? 0 : (cards.length - 1 - i) * -20,
                  zIndex: i
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  position: 'absolute', width: 340, height: 420,
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 24,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)', padding: 32, cursor: isFront ? 'grab' : 'auto',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  borderTop: `4px solid ${card.color}`
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 16 }}>{card.year}</div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{card.title}</h3>
                  <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>{card.desc}</p>
                </div>
                {isFront && <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', alignSelf: 'center' }}>Swipe ↔</div>}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
