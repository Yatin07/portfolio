
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { SelectedWork } from '../components/SelectedWork'
import { BeyondPixels } from '../components/BeyondPixels'
import { About } from '../components/About'
import { HowIWork } from '../components/HowIWork'
import { Moments } from '../components/Moments'
import { DesignLab } from '../components/DesignLab'
import { Contact } from '../components/Contact'
import { ScrollCanvas } from '../components/ScrollCanvas'


export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorMode, setCursorMode] = useState('default')
  const [cursorLabel, setCursorLabel] = useState('')

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const viewEl = target.closest('[data-cursor]') as HTMLElement
      if (viewEl) {
        setCursorMode(viewEl.getAttribute('data-cursor') || 'default')
        setCursorLabel(viewEl.getAttribute('data-label') || '')
      } else {
        setCursorMode('default')
        setCursorLabel('')
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])



  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      
      {/* Sticky Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
         <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: 'var(--text-main)' }}>YATIN.</div>
         <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>Press 'T' for magic</div>
      </nav>

      {/* Custom Cursor */}
      <motion.div
        data-testid="custom-cursor"
        className="hide-on-mobile"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          x: cursorPos.x, y: cursorPos.y, translateX: '-50%', translateY: '-50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div 
          animate={{ 
            width: cursorMode === 'view' ? 80 : 12, 
            height: cursorMode === 'view' ? 80 : 12,
            background: cursorMode === 'view' ? 'var(--accent)' : 'var(--text-main)',
            opacity: cursorMode === 'view' ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {cursorMode === 'view' && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--bg-main)', letterSpacing: '0.1em' }}>{cursorLabel}</span>}
        </motion.div>
      </motion.div>

      <ScrollCanvas />
      <Hero />
      <Process />
      <SelectedWork />
      <BeyondPixels />
      
      <About />
      <HowIWork />
      <Moments />
      <DesignLab />
      <Contact />

    </div>
  )
}
