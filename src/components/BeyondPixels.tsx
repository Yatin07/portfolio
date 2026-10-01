
import { motion } from 'framer-motion'
import { useState } from 'react'

export function BeyondPixels() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="beyond" style={{ padding: '150px 48px', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24 }}>Beyond pixels.</h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 80px' }}>What shapes my thinking when I close my laptop.</p>

        {/* Playable Desk Scene */}
        <div style={{ position: 'relative', width: '100%', height: 500, background: 'var(--card-bg)', borderRadius: 32, border: '1px solid var(--border)', overflow: 'hidden' }}>
          
          {/* Desk Surface */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'var(--border)', opacity: 0.2 }} />

          {/* Chessboard */}
          <motion.div 
            onMouseEnter={() => setActive('chess')} onMouseLeave={() => setActive(null)}
            whileHover={{ y: -10 }}
            style={{ position: 'absolute', bottom: '20%', left: '15%', width: 120, height: 120, background: '#1a1a1a', border: '8px solid #333', borderRadius: 8, cursor: 'pointer', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {Array.from({length: 16}).map((_, i) => <div key={i} style={{ background: (i + Math.floor(i/4)) % 2 === 0 ? '#333' : '#1a1a1a' }} />)}
            {active === 'chess' && <motion.div animate={{ y: [0, -20, 0], x: [0, 20, 0] }} style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, background: 'var(--accent)', borderRadius: '50%' }} />}
          </motion.div>

          {/* Dumbbell */}
          <motion.div 
            onMouseEnter={() => setActive('gym')} onMouseLeave={() => setActive(null)}
            whileHover={{ y: -10 }}
            style={{ position: 'absolute', bottom: '25%', right: '20%', width: 80, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20, height: 40, background: '#555', borderRadius: 4 }} />
            <div style={{ flex: 1, height: 10, background: '#777' }} />
            <div style={{ width: 20, height: 40, background: '#555', borderRadius: 4 }} />
            {active === 'gym' && <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ repeat: Infinity }} style={{ position: 'absolute', top: -30, left: 20, fontSize: 24 }}>💪</motion.div>}
          </motion.div>

          {/* Photo Card */}
          <motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            style={{ position: 'absolute', top: '20%', left: '40%', width: 140, padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', cursor: 'grab' }}>
            <img src="/src/assets/yatin.jpg" alt="Yatin" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 4, marginBottom: 8, filter: 'grayscale(100%)' }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: '#000', textAlign: 'center' }}>Yatin Patil</div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
