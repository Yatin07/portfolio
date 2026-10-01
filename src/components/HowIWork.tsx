
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
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 60, textAlign: 'center' }}>
          How I work.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
           {steps.map((step, i) => (
             <motion.div 
               key={step.title}
               onClick={() => setActive(i)}
               animate={{ flex: active === i ? 2 : 1 }}
               style={{
                 background: active === i ? 'var(--text-main)' : 'var(--card-bg)',
                 color: active === i ? 'var(--bg-main)' : 'var(--text-main)',
                 border: '1px solid var(--border)',
                 padding: 32, borderRadius: 24, cursor: 'pointer',
                 display: 'flex', flexDirection: 'column', gap: 24,
                 height: 300, transition: 'background 0.3s'
               }}>
               <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>0{i+1}</div>
               <h3 style={{ fontSize: 24, fontWeight: 600 }}>{step.title}</h3>
               <AnimatePresence>
                 {active === i && (
                   <motion.p 
                     initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                     style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8, overflow: 'hidden' }}>
                     {step.desc}
                   </motion.p>
                 )}
               </AnimatePresence>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
