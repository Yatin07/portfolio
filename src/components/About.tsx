'use client'

import { motion } from 'framer-motion'

export function About() {
  const obsessions = [
    { title: 'Micro-interactions', color: '#ffb3ba' },
    { title: 'Kinetic Typography', color: '#ffdfba' },
    { title: 'Dieter Rams', color: '#ffffba' },
    { title: 'Subtle Grain', color: '#baffc9' },
    { title: 'Framer Motion', color: '#bae1ff' }
  ]

  return (
    <section id="about" style={{ padding: '140px 48px', background: 'transparent', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        
        {/* Profile Glass Card */}
        <div style={{ position: 'relative' }}>
          <motion.div 
            whileHover={{ rotate: 1, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              padding: 40,
              background: 'rgba(18, 18, 22, 0.75)',
              backdropFilter: 'blur(20px)',
              borderRadius: 28,
              border: '1px solid var(--border)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-fg)', marginBottom: 16, transition: 'color 0.4s ease' }}>
              PROFILE HIGHLIGHTS
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, transition: 'color 0.4s ease' }}>
              Yatin Patil
            </h3>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, transition: 'color 0.4s ease' }}>
              Information Technology student & self-driven product designer passionate about human-centered interfaces, AI integration, and fluid micro-interactions.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', transition: 'color 0.4s ease, border-color 0.4s ease' }}>
                B.Tech IT
              </span>
              <span style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', transition: 'color 0.4s ease, border-color 0.4s ease' }}>
                UI/UX Research
              </span>
              <span style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', transition: 'color 0.4s ease, border-color 0.4s ease' }}>
                Frontend Engineering
              </span>
            </div>
          </motion.div>
        </div>

        {/* Text & Obsession Canvas */}
        <div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 24, transition: 'color 0.4s ease' }}>
            I build for humans.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 40, transition: 'color 0.4s ease' }}>
            Hi, I'm Yatin. I believe the best interfaces are the ones you don't even notice—they just work, fluidly and effortlessly.
          </p>

          <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--accent-fg)', marginBottom: 20, transition: 'color 0.4s ease' }}>
            Things I'm obsessed with
          </h3>
          
          <div style={{ position: 'relative', height: 220, border: '1px dashed var(--border)', borderRadius: 20, background: 'rgba(12, 12, 14, 0.5)', backdropFilter: 'blur(12px)', overflow: 'hidden', transition: 'border-color 0.4s ease' }}>
             <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-tertiary)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', pointerEvents: 'none', transition: 'color 0.4s ease' }}>Drag around</p>
             {obsessions.map((obs, i) => (
               <motion.div 
                 key={obs.title}
                 drag dragConstraints={{ top: 10, bottom: 140, left: 10, right: 280 }}
                 whileDrag={{ scale: 1.08, zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                 style={{
                   position: 'absolute', top: 20 + (i*24), left: 20 + (i*36),
                   padding: '10px 18px', background: 'rgba(25, 25, 30, 0.85)', border: '1px solid var(--border)',
                   borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', cursor: 'grab',
                   backdropFilter: 'blur(8px)',
                   boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                   transition: 'color 0.4s ease, border-color 0.4s ease',
                 }}>
                 {obs.title}
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  )
}
