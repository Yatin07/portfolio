
import { motion } from 'framer-motion'
import { useState } from 'react'

export function About() {
  const obsessions = [
    { title: 'Micro-interactions', color: '#ffb3ba' },
    { title: 'Kinetic Typography', color: '#ffdfba' },
    { title: 'Dieter Rams', color: '#ffffba' },
    { title: 'Subtle Grain', color: '#baffc9' },
    { title: 'Framer Motion', color: '#bae1ff' }
  ]

  return (
    <section id="about" style={{ padding: '150px 48px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
        
        {/* Photo with Parallax */}
        <div style={{ position: 'relative' }}>
          <motion.div 
            whileHover={{ rotate: 2, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ width: '100%', aspectRatio: '3/4', background: 'var(--border)', borderRadius: 24, overflow: 'hidden' }}>
            <img src="/src/assets/yatin.jpg" alt="Yatin Patil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          <div style={{ position: 'absolute', bottom: -20, right: -20, background: 'var(--card-bg)', padding: '16px 24px', borderRadius: 12, border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
             <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Yatin Patil</p>
             <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Navi Mumbai, India</p>
          </div>
        </div>

        {/* Text & Mood Board */}
        <div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 32 }}>
            I build for humans.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 48 }}>
            Hi, I'm Yatin. I'm a digital designer currently studying Information Technology. I believe the best interfaces are the ones you don't even notice—they just work, fluidly and effortlessly.
          </p>

          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--accent)', marginBottom: 24 }}>
            Things I'm obsessed with
          </h3>
          
          <div style={{ position: 'relative', height: 250, border: '1px dashed var(--border)', borderRadius: 16, background: 'var(--bg-alt)', overflow: 'hidden' }}>
             <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Drag around</p>
             {obsessions.map((obs, i) => (
               <motion.div 
                 key={obs.title}
                 drag dragConstraints={{ top: 0, bottom: 200, left: 0, right: 300 }}
                 whileDrag={{ scale: 1.1, zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                 style={{
                   position: 'absolute', top: 20 + (i*20), left: 20 + (i*40),
                   padding: '12px 20px', background: 'var(--card-bg)', border: '1px solid var(--border)',
                   borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'grab',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
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
