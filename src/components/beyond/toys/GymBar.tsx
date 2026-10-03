'use client'

import { useState } from 'react'
import { hobbies } from '../../../data/hobbies'
import { Plus, Minus, RotateCcw, Zap } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

const AVAILABLE_PLATES = [1.25, 2.5, 5, 10, 15, 20]

const PLATE_COLORS: Record<number, string> = {
  1.25: '#E0E0E0',
  2.5: '#2196F3',
  5: '#FFFFFF',
  10: '#00E676',
  15: '#FFB703',
  20: '#FF4B3A',
}

const PLATE_HEIGHTS: Record<number, number> = {
  1.25: 35,
  2.5: 45,
  5: 55,
  10: 65,
  15: 75,
  20: 85,
}

export default function GymBar({ soundEnabled }: Props) {
  const [plates, setPlates] = useState<number[]>([20, 20, 10]) // default plates per side
  const [isLifting, setIsLifting] = useState<boolean>(false)
  const [liftMessage, setLiftMessage] = useState<string | null>(null)

  const barWeight = 20
  const sideWeight = plates.reduce((acc, p) => acc + p, 0)
  const totalWeight = barWeight + sideWeight * 2

  const playClankSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } catch {}
  }

  const addPlate = (weight: number) => {
    if (plates.length >= 8) return
    setPlates((prev) => [...prev, weight])
    setLiftMessage(null)
    playClankSound()
  }

  const removePlate = (index: number) => {
    setPlates((prev) => prev.filter((_, i) => i !== index))
    setLiftMessage(null)
    playClankSound()
  }

  const handleLift = () => {
    setIsLifting(true)
    playClankSound()

    if (totalWeight > 200) {
      setLiftMessage('Heavy weight alert. Spotter required.')
    } else {
      setLiftMessage(`Lifted ${totalWeight} kg cleanly.`)
    }

    setTimeout(() => {
      setIsLifting(false)
    }, 800)
  }

  const resetBar = () => {
    setPlates([])
    setLiftMessage(null)
  }

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Live Total Display */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono, monospace)', color: 'var(--muted-darkroom, #9A958E)', textTransform: 'uppercase' }}>
          BARBELL LOAD
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
          {totalWeight} <span style={{ fontSize: 20, color: 'var(--safelight-accent, #FF4B3A)' }}>KG</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted-darkroom, #9A958E)' }}>
          (20 kg Bar + {sideWeight} kg per side)
        </div>
      </div>

      {/* Visual Barbell Representation */}
      <div
        style={{
          position: 'relative',
          height: 120,
          background: 'rgba(10, 10, 12, 0.6)',
          borderRadius: 16,
          border: '1px solid var(--border-darkroom, #2A2A30)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: 20,
          transform: isLifting ? 'translateY(-12px) rotate(-1deg)' : 'none',
          transition: 'transform 0.15s ease-in-out',
        }}
      >
        {/* Steel Bar Shaft */}
        <div style={{ position: 'absolute', width: '90%', height: 12, background: 'linear-gradient(to bottom, #888, #444, #222)', borderRadius: 4 }} />

        {/* Left Sleeves & Plates */}
        <div style={{ position: 'absolute', left: '15%', display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 3 }}>
          {plates.map((p, idx) => (
            <button
              key={idx}
              onClick={() => removePlate(idx)}
              title={`Click to remove ${p}kg plate`}
              style={{
                width: 14,
                height: PLATE_HEIGHTS[p] || 50,
                background: PLATE_COLORS[p] || '#FFF',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.5)',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Center Grip Marks */}
        <div style={{ position: 'absolute', width: 40, height: 16, borderLeft: '2px solid #999', borderRight: '2px solid #999' }} />

        {/* Right Sleeves & Plates */}
        <div style={{ position: 'absolute', right: '15%', display: 'flex', alignItems: 'center', gap: 3 }}>
          {plates.map((p, idx) => (
            <button
              key={idx}
              onClick={() => removePlate(idx)}
              title={`Click to remove ${p}kg plate`}
              style={{
                width: 14,
                height: PLATE_HEIGHTS[p] || 50,
                background: PLATE_COLORS[p] || '#FFF',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.5)',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Plate Picker Controls */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--muted-darkroom, #9A958E)', marginBottom: 10 }}>
          TAP TO ADD PLATES (PER SIDE)
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {AVAILABLE_PLATES.map((p) => (
            <button
              key={p}
              onClick={() => addPlate(p)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${PLATE_COLORS[p]}`,
                color: '#FFF',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Plus size={12} color={PLATE_COLORS[p]} /> {p}kg
            </button>
          ))}
        </div>
      </div>

      {/* Lift & Reset Buttons */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          onClick={handleLift}
          style={{
            padding: '10px 24px',
            borderRadius: 24,
            background: 'var(--safelight-accent, #FF4B3A)',
            border: 'none',
            color: '#FFF',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(255, 75, 58, 0.4)',
          }}
        >
          LIFT
        </button>

        <button
          onClick={resetBar}
          style={{
            padding: '10px 18px',
            borderRadius: 24,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--border-darkroom, #2A2A30)',
            color: '#F3EEE7',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <RotateCcw size={14} /> Clear Bar
        </button>
      </div>

      {/* Feedback Message */}
      {liftMessage && (
        <div
          role="region"
          aria-live="polite"
          style={{
            marginTop: 16,
            fontSize: 13,
            fontWeight: 700,
            color: totalWeight > 200 ? '#FFB703' : '#00E676',
          }}
        >
          {liftMessage}
        </div>
      )}

      {/* Real PR Stats (Rendered ONLY if filled in) */}
      {hobbies.gym?.prs && (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border-darkroom, #2A2A30)', fontSize: 12, color: 'var(--muted-darkroom, #9A958E)' }}>
          Real Lifts: {hobbies.gym.prs}
        </div>
      )}
    </div>
  )
}
