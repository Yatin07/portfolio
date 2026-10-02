'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Trophy, Dumbbell, Camera, BookOpen, Sparkles, RefreshCw, Zap } from 'lucide-react'

export function BeyondPixels() {
  const [activeTab, setActiveTab] = useState<number>(0)
  
  // Chess mini-game state
  const [chessStep, setChessStep] = useState(0)
  const chessMoves = [
    { title: 'Opening: e4', desc: 'Control the center early.', board: ['♔', '', '', '♙'] },
    { title: 'Middle: Nf3', desc: 'Develop pieces with intent.', board: ['♔', '♘', '', '♙'] },
    { title: 'Tactical Sacrifice: Bxh7+', desc: 'Calculated risk for strategic gain.', board: ['♔', '', '♗', '💥'] },
    { title: 'Checkmate: Qh5#', desc: 'Flawless execution of the strategy.', board: ['♛', '', '', '♔'] },
  ]

  // Photo filter state
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(110)
  const [sepia, setSepia] = useState(0)

  // Hobbies data
  const pillars = [
    {
      id: 'chess',
      icon: Trophy,
      label: 'Strategic Thinking',
      title: 'Chess & Pattern Recognition',
      subtitle: 'Anticipating user flows like calculating candidate moves.',
      quote: '"Every UI decision has an equal and opposite reaction downstream."',
      color: '#9D4EDD',
    },
    {
      id: 'fitness',
      icon: Dumbbell,
      label: 'Peak Discipline',
      title: 'Fitness & Physical Stamina',
      subtitle: 'Building mental resilience through consistent daily training.',
      quote: '"Discipline when nobody is watching translates directly to code quality."',
      color: '#00E5FF',
    },
    {
      id: 'photography',
      icon: Camera,
      label: 'Visual Composition',
      title: 'Photography & Lighting',
      subtitle: 'Understanding real-world light, depth, and spatial balance.',
      quote: '"Observing natural lighting shapes how I construct digital glassmorphism."',
      color: '#FFB703',
    },
    {
      id: 'learning',
      icon: BookOpen,
      label: 'First Principles',
      title: 'Deep Reading & Philosophy',
      subtitle: 'Deconstructing complex engineering problems into simple primitives.',
      quote: '"Simplicity is the ultimate sophistication."',
      color: '#00E676',
    },
  ]

  return (
    <section
      id="beyond"
      style={{
        position: 'relative',
        padding: '140px 48px',
        zIndex: 10,
        background: 'transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 700,
              marginBottom: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 20,
              background: 'var(--accent-transparent)',
              border: '1px solid var(--border)',
            }}
          >
            <Sparkles size={13} /> BEYOND THE CANVAS
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#FFF',
              marginBottom: 20,
            }}
          >
            Beyond pixels & code.
          </h2>

          <p
            style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            What sharpens my problem-solving mindset when I step away from Figma and the terminal.
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}
        >
          {pillars.map((p, idx) => {
            const Icon = p.icon
            const isActive = activeTab === idx
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 30,
                  border: isActive ? `1px solid ${p.color}` : '1px solid var(--border)',
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 15, 18, 0.5)',
                  backdropFilter: 'blur(12px)',
                  color: isActive ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 20px ${p.color}33` : 'none',
                }}
              >
                <Icon size={16} color={isActive ? p.color : 'var(--text-muted)'} />
                {p.label}
              </button>
            )
          })}
        </div>

        {/* Active Pillar Card Viewer */}
        <div
          style={{
            background: 'rgba(18, 18, 22, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: 28,
            border: '1px solid var(--border)',
            padding: '48px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 56,
                alignItems: 'center',
              }}
            >
              {/* Left Column: Description & Quote */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: pillars[activeTab].color,
                    marginBottom: 16,
                  }}
                >
                  {pillars[activeTab].label}
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 700,
                    color: '#FFF',
                    letterSpacing: '-0.02em',
                    marginBottom: 18,
                    lineHeight: 1.15,
                  }}
                >
                  {pillars[activeTab].title}
                </h3>

                <p
                  style={{
                    fontSize: 17,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: 32,
                  }}
                >
                  {pillars[activeTab].subtitle}
                </p>

                <div
                  style={{
                    padding: '20px 24px',
                    borderRadius: 16,
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderLeft: `4px solid ${pillars[activeTab].color}`,
                    fontSize: 15,
                    fontStyle: 'italic',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                  }}
                >
                  {pillars[activeTab].quote}
                </div>
              </div>

              {/* Right Column: Dynamic Interactive Widget per Pillar */}
              <div
                style={{
                  background: 'rgba(10, 10, 12, 0.6)',
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 320,
                }}
              >
                {/* WIDGET 0: Interactive Chess Tactical Board */}
                {activeTab === 0 && (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, fontWeight: 600 }}>
                      Interactive Move Analysis
                    </div>

                    {/* 2x2 Tactical Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        width: 180,
                        height: 180,
                        margin: '0 auto 24px',
                      }}
                    >
                      {chessMoves[chessStep].board.map((symbol, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ scale: symbol ? [1, 1.1, 1] : 1 }}
                          style={{
                            background: (idx % 2 === 0) ? 'rgba(255,255,255,0.06)' : 'rgba(157, 78, 221, 0.15)',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {symbol}
                        </motion.div>
                      ))}
                    </div>

                    <div style={{ fontWeight: 700, color: '#FFF', fontSize: 16, marginBottom: 6 }}>
                      {chessMoves[chessStep].title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
                      {chessMoves[chessStep].desc}
                    </div>

                    <button
                      onClick={() => setChessStep((prev) => (prev + 1) % chessMoves.length)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 20px',
                        borderRadius: 20,
                        background: 'var(--accent)',
                        color: '#FFF',
                        fontWeight: 600,
                        fontSize: 13,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <RefreshCw size={14} /> Next Move ({chessStep + 1}/4)
                    </button>
                  </div>
                )}

                {/* WIDGET 1: Fitness Consistency Meter */}
                {activeTab === 1 && (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, fontWeight: 600 }}>
                      Weekly Discipline Metric
                    </div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ height: 40 }}
                          animate={{ height: [40, 60 + idx * 8, 50 + idx * 6] }}
                          style={{
                            width: 24,
                            background: idx < 6 ? '#00E5FF' : 'rgba(255,255,255,0.1)',
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 6,
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#000',
                          }}
                        >
                          {day}
                        </motion.div>
                      ))}
                    </div>

                    <div style={{ fontSize: 28, fontWeight: 700, color: '#00E5FF', marginBottom: 4 }}>
                      6 / 7 Days
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      92% Consistency Rate
                    </div>
                  </div>
                )}

                {/* WIDGET 2: Photography Filter Controls */}
                {activeTab === 2 && (
                  <div style={{ width: '100%' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
                      Real-time Composition Shader
                    </div>

                    {/* Preview Box */}
                    <div
                      style={{
                        height: 120,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #FFB703 0%, #7000FF 100%)',
                        filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${sepia}%)`,
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: '0.1em',
                      }}
                    >
                      LIGHT & SHADOW
                    </div>

                    {/* Sliders */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                        <span>Exposure</span>
                        <span>{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        style={{ accentColor: '#FFB703' }}
                      />
                    </div>
                  </div>
                )}

                {/* WIDGET 3: First Principles Knowledge Stack */}
                {activeTab === 3 && (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, fontWeight: 600 }}>
                      Mental Models Stack
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { title: 'First Principles', sub: 'Break down to fundamental truths' },
                        { title: 'Inversion Thinking', sub: 'Avoid stupidity before chasing brilliance' },
                        { title: 'Pareto Principle', sub: '80% value from 20% effort' },
                      ].map((model, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            background: 'rgba(0, 230, 118, 0.1)',
                            border: '1px solid rgba(0, 230, 118, 0.2)',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#00E676' }}>
                            {model.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                            {model.sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
