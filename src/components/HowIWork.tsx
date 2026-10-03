
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function HowIWork() {
  const [active, setActive] = useState<number>(0)
  const steps = [
    { title: 'Understand', desc: 'I don\'t touch Figma until I know exactly what the user is trying to achieve and what business metric we are driving.' },
    { title: 'Explore', desc: 'Wireframing multiple divergent concepts. Testing the weird ideas before settling on the logical ones.' },
    { title: 'Build', desc: 'Creating high-fidelity, interactive prototypes that feel real. Motion is considered from day one.' },
    { title: 'Iterate', desc: 'Testing with users, finding the friction, and polishing until the experience feels completely effortless.' },
  ]

  return (
    <section style={{ padding: '150px 48px', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 60, textAlign: 'center', color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>
          How I work.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
           {steps.map((step, i) => {
             const isActive = active === i
             return (
               <motion.div 
                 key={step.title}
                 onMouseEnter={() => setActive(i)}
                 onFocus={() => setActive(i)}
                 tabIndex={0}
                 style={{
                   background: isActive ? 'rgba(30, 30, 38, 0.95)' : 'rgba(18, 18, 22, 0.75)',
                   color: 'var(--text-primary)',
                   border: isActive ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                   boxShadow: isActive ? '0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--accent-transparent)' : 'none',
                   padding: '28px 24px', borderRadius: 24, cursor: 'default',
                   display: 'flex', flexDirection: 'column', gap: 16,
                   height: 320, transition: 'all 0.4s ease',
                   backdropFilter: 'blur(16px)',
                 }}>
                 <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? 'var(--accent-fg)' : 'var(--text-tertiary)', fontFamily: 'var(--font-mono, monospace)', transition: 'color 0.4s ease' }}>0{i+1}</div>
                 <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', transition: 'color 0.4s ease' }}>{step.title}</h3>
                 <AnimatePresence>
                   {isActive && (
                     <motion.p 
                       initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                       style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', overflow: 'hidden', transition: 'color 0.4s ease' }}>
                       {step.desc}
                     </motion.p>
                   )}
                 </AnimatePresence>
               </motion.div>
             )
           })}
        </div>
      </div>
    </section>
  )
}
