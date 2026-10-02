
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Process } from '../components/Process'
import { SelectedWork } from '../components/SelectedWork'
import { BeyondPixels } from '../components/BeyondPixels'
import { About } from '../components/About'
import { HowIWork } from '../components/HowIWork'
import { Moments } from '../components/Moments'
import { DesignLab } from '../components/DesignLab'
import { Contact } from '../components/Contact'
import { ScrollCanvas } from '../components/ScrollCanvas'


const MAGIC_THEMES = [
  { name: 'Cyber Violet', accent: '#9D4EDD', bgTrans: 'rgba(157, 78, 221, 0.18)' },
  { name: 'Electric Cyan', accent: '#00E5FF', bgTrans: 'rgba(0, 229, 255, 0.18)' },
  { name: 'Solar Gold', accent: '#FFB703', bgTrans: 'rgba(255, 183, 3, 0.18)' },
  { name: 'Crimson Neon', accent: '#FF0055', bgTrans: 'rgba(255, 0, 85, 0.18)' },
  { name: 'Emerald Matrix', accent: '#00E676', bgTrans: 'rgba(0, 230, 118, 0.18)' },
]

export default function Portfolio() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorMode, setCursorMode] = useState('default')
  const [cursorLabel, setCursorLabel] = useState('')
  const [themeIdx, setThemeIdx] = useState(0)
  const [magicToast, setMagicToast] = useState<string | null>(null)

  const triggerMagic = () => {
    const nextIdx = (themeIdx + 1) % MAGIC_THEMES.length
    setThemeIdx(nextIdx)
    const active = MAGIC_THEMES[nextIdx]

    document.documentElement.style.setProperty('--accent', active.accent)
    document.documentElement.style.setProperty('--accent-transparent', active.bgTrans)

    setMagicToast(`✨ Magic Mode: ${active.name}`)
    setTimeout(() => setMagicToast(null), 2400)
  }

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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 't') {
        // Ignore if user is typing in an input or textarea
        if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return
        triggerMagic()
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [themeIdx])

  return (
    <div style={{ background: 'transparent', color: 'var(--text-main)', minHeight: '100vh' }}>
      
      {/* Sticky Nav — clickable Magic button & white dark glass blur */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 200, backdropFilter: 'blur(16px)', background: 'rgba(5, 5, 5, 0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
         <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', color: '#fff' }}>YATIN.</div>
         
         <button
           onClick={triggerMagic}
           style={{
             fontSize: 12,
             fontWeight: 600,
             color: '#FFF',
             background: 'rgba(255,255,255,0.08)',
             border: '1px solid var(--accent)',
             borderRadius: 20,
             padding: '6px 16px',
             cursor: 'pointer',
             display: 'flex',
             alignItems: 'center',
             gap: 6,
             boxShadow: '0 0 15px var(--accent-transparent)',
             transition: 'all 0.3s ease',
           }}
         >
           Press 'T' for magic ✨
         </button>
      </nav>

      {/* Floating Magic Toast */}
      <AnimatePresence>
        {magicToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: 84,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 300,
              padding: '10px 24px',
              borderRadius: 30,
              background: 'rgba(15, 15, 20, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--accent)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--accent-transparent)',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.05em',
            }}
          >
            {magicToast}
          </motion.div>
        )}
      </AnimatePresence>

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
            background: cursorMode === 'view' ? 'var(--accent)' : '#FFFFFF',
            opacity: cursorMode === 'view' ? 0.9 : 1
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {cursorMode === 'view' && <span style={{ fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.1em' }}>{cursorLabel}</span>}
        </motion.div>
      </motion.div>

      <ScrollCanvas />

      {/* Page sections — transparent background so background portrait face remains continuously visible */}
      <div style={{ position: 'relative', zIndex: 20, background: 'transparent' }}>
        <Process />
        <SelectedWork />
        <BeyondPixels />
        <About />
        <HowIWork />
        <Moments />
        <DesignLab />
        <Contact />
      </div>

    </div>
  )
}

