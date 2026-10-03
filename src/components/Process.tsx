
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  
  const stages = [
    { id: 1, title: 'Problem', desc: 'Understanding the true friction point.', honest: 'I initially assumed wrong.' },
    { id: 2, title: 'Approach', desc: 'Mapping user journeys and constraints.', honest: 'Threw away 3 initial drafts.' },
    { id: 3, title: 'Build', desc: 'Prototyping high-fidelity interactions.', honest: 'Framer Motion took some tweaking.' },
    { id: 4, title: 'Result', desc: 'A seamless, tested experience.', honest: 'Users still found edge cases.' },
    { id: 5, title: 'Learning', desc: 'Iteration never truly ends.', honest: 'Less is always more.' },
  ]

  return (
    <section ref={containerRef} id="process" style={{ height: '300vh', position: 'relative', background: 'var(--bg-alt)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', padding: '0 48px', overflow: 'hidden' }}>
        
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>
              I show the thinking behind it.
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}>The raw, unpolished process of getting to effortless.</p>
          </div>

          <div style={{ position: 'relative', height: 400 }}>
            {stages.map((stage, i) => {
              const start = i * 0.2
              const end = start + 0.2
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0])
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [50, 0, 0, -50])
              
              return (
                <motion.div key={stage.id} style={{ position: 'absolute', inset: 0, opacity, y, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--accent-fg)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16, transition: 'color 0.4s ease' }}>STAGE 0{stage.id}</div>
                  <h3 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>{stage.title}</h3>
                  <p style={{ fontSize: 20, color: 'var(--text-secondary)', marginBottom: 24, transition: 'color 0.4s ease' }}>{stage.desc}</p>
                  
                  <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, borderLeft: '4px solid var(--accent)', transition: 'border-color 0.4s ease' }}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4, fontWeight: 600, transition: 'color 0.4s ease' }}>What actually happened:</div>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', fontStyle: 'italic', transition: 'color 0.4s ease' }}>{stage.honest}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, height: 2, background: 'var(--border)' }}>
           <motion.div style={{ height: '100%', background: 'var(--accent)', scaleX: scrollYProgress, transformOrigin: 'left' }} />
        </div>

      </div>
    </section>
  )
}
