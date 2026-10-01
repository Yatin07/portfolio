
import { motion } from 'framer-motion'
import { useState } from 'react'

export function DesignLab() {
  const [loading, setLoading] = useState(false)
  const [toggled, setToggled] = useState(false)

  return (
    <section style={{ padding: '150px 48px', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24 }}>Design Lab.</h2>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 60, maxWidth: 500 }}>
          A playground for micro-interactions, components, and tiny details that bring interfaces to life.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          
          {/* 1. Liquid Button */}
          <div style={{ height: 240, background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <p style={{ position: 'absolute', top: 20, left: 24, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>01 / BUTTON</p>
             <motion.button 
               whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
               onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000) }}
               style={{ padding: '16px 32px', background: 'var(--text-main)', color: 'var(--bg-main)', borderRadius: 100, fontWeight: 600, border: 'none', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
               {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 1 }} style={{ width: 16, height: 16, border: '2px solid var(--bg-main)', borderTopColor: 'transparent', borderRadius: '50%' }} /> : 'Submit'}
             </motion.button>
          </div>

          {/* 2. Magnetic Toggle */}
          <div style={{ height: 240, background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <p style={{ position: 'absolute', top: 20, left: 24, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>02 / TOGGLE</p>
             <div onClick={() => setToggled(!toggled)} style={{ width: 64, height: 32, background: toggled ? 'var(--accent)' : 'var(--border)', borderRadius: 32, cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
               <motion.div animate={{ x: toggled ? 32 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} style={{ position: 'absolute', top: 4, left: 0, width: 24, height: 24, background: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
             </div>
          </div>

          {/* 3. Hover Card */}
          <div style={{ height: 240, background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <p style={{ position: 'absolute', top: 20, left: 24, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>03 / CARD</p>
             <motion.div whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} style={{ width: 180, height: 120, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 16 }}>
                <div style={{ width: 32, height: 32, background: 'var(--accent-transparent)', borderRadius: 8, marginBottom: 16 }} />
                <div style={{ width: '80%', height: 8, background: 'var(--border)', borderRadius: 4, marginBottom: 8 }} />
                <div style={{ width: '60%', height: 8, background: 'var(--border)', borderRadius: 4 }} />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
