'use client'

import { useState, useEffect } from 'react'
import { hobbies } from '../../../data/hobbies'
import { RotateCcw, Target } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

type Direction = 'left' | 'center' | 'right'

export default function PenaltyShootout({ soundEnabled }: Props) {
  const [aim, setAim] = useState<Direction>('center')
  const [shotsLeft, setShotsLeft] = useState<number>(5)
  const [score, setScore] = useState<number>(0)
  const [keeperPos, setKeeperPos] = useState<Direction>('center')
  const [isShooting, setIsShooting] = useState<boolean>(false)
  const [result, setResult] = useState<string | null>(null)

  const playWhistleSound = (isGoal: boolean) => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = isGoal ? 'sine' : 'sawtooth'
      osc.frequency.setValueAtTime(isGoal ? 587.33 : 200, ctx.currentTime) // D5 or low
      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } catch {}
  }

  const shoot = () => {
    if (shotsLeft <= 0 || isShooting) return

    setIsShooting(true)
    setResult(null)

    // Goalkeeper dives randomly
    const dirs: Direction[] = ['left', 'center', 'right']
    const randomDive = dirs[Math.floor(Math.random() * dirs.length)]
    setKeeperPos(randomDive)

    setTimeout(() => {
      setIsShooting(false)
      setShotsLeft((prev) => prev - 1)

      if (aim !== randomDive) {
        // GOAL!
        setScore((prev) => prev + 1)
        setResult('GOAL!')
        playWhistleSound(true)
      } else {
        // SAVED!
        setResult('SAVED!')
        playWhistleSound(false)
      }
    }, 500)
  }

  const resetGame = () => {
    setShotsLeft(5)
    setScore(0)
    setAim('center')
    setKeeperPos('center')
    setResult(null)
  }

  // Keyboard accessibility: Left / Right arrows to aim, Space to shoot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (shotsLeft <= 0) return
      if (e.key === 'ArrowLeft') setAim('left')
      if (e.key === 'ArrowDown') setAim('center')
      if (e.key === 'ArrowRight') setAim('right')
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        shoot()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [aim, shotsLeft, isShooting])

  return (
    <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Score Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontFamily: 'var(--font-mono, monospace)', fontSize: 13 }}>
        <div>SCORE: <span style={{ color: '#00E676', fontWeight: 700 }}>{score}</span> / {5 - shotsLeft}</div>
        <div>SHOTS LEFT: <span style={{ color: '#FF4B3A', fontWeight: 700 }}>{shotsLeft}</span></div>
      </div>

      {/* Interactive Penalty Net Frame */}
      <div
        style={{
          position: 'relative',
          height: 180,
          background: 'linear-gradient(to bottom, #101520, #0B0E14)',
          borderRadius: 16,
          border: '3px solid #FFF',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)',
          overflow: 'hidden',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {/* Net Grid Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#ffffff22 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.5 }} />

        {/* Goalkeeper Icon */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: keeperPos === 'left' ? '20%' : keeperPos === 'center' ? '50%' : '80%',
            transform: 'translateX(-50%)',
            fontSize: 36,
            transition: 'all 0.3s ease-out',
          }}
        >
          🧤
        </div>

        {/* Aim Indicator Target */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: aim === 'left' ? '20%' : aim === 'center' ? '50%' : '80%',
            transform: 'translateX(-50%)',
            fontSize: 24,
            transition: 'left 0.2s ease',
          }}
        >
          <Target size={24} color="var(--safelight-accent, #FF4B3A)" />
        </div>

        {/* Football Ball */}
        <div
          style={{
            position: 'absolute',
            bottom: isShooting ? 120 : 15,
            left: isShooting ? (aim === 'left' ? '20%' : aim === 'center' ? '50%' : '80%') : '50%',
            transform: 'translateX(-50%)',
            fontSize: isShooting ? 22 : 28,
            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          ⚽
        </div>
      </div>

      {/* Aim & Shoot Controls */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--muted-darkroom, #9A958E)', marginBottom: 10 }}>
          SELECT AIM SPOT & SHOOT (OR USE ARROW KEYS + SPACE)
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14 }}>
          {(['left', 'center', 'right'] as Direction[]).map((dir) => (
            <button
              key={dir}
              onClick={() => setAim(dir)}
              disabled={shotsLeft <= 0}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                background: aim === dir ? 'var(--safelight-accent, #FF4B3A)' : 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-darkroom, #2A2A30)',
                color: '#FFF',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {dir}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={shoot}
            disabled={shotsLeft <= 0 || isShooting}
            style={{
              padding: '10px 24px',
              borderRadius: 24,
              background: '#00E676',
              border: 'none',
              color: '#000',
              fontWeight: 800,
              fontSize: 14,
              cursor: shotsLeft > 0 ? 'pointer' : 'default',
              opacity: shotsLeft > 0 ? 1 : 0.5,
            }}
          >
            SHOOT
          </button>

          {shotsLeft <= 0 && (
            <button
              onClick={resetGame}
              style={{
                padding: '10px 18px',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid var(--border-darkroom, #2A2A30)',
                color: '#FFF',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <RotateCcw size={14} /> Rematch
            </button>
          )}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div
          role="region"
          aria-live="polite"
          style={{
            marginTop: 12,
            fontSize: 16,
            fontWeight: 800,
            color: result.includes('GOAL') ? '#00E676' : '#FF4B3A',
          }}
        >
          {result}
        </div>
      )}

      {/* Optional Personal Facts (Rendered ONLY if filled in) */}
      {(hobbies.football?.club || hobbies.football?.favouritePlayer) && (
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border-darkroom, #2A2A30)', fontSize: 12, color: 'var(--muted-darkroom, #9A958E)' }}>
          {hobbies.football.club && <span>Club: {hobbies.football.club} </span>}
          {hobbies.football.favouritePlayer && <span>| Player: {hobbies.football.favouritePlayer}</span>}
        </div>
      )}
    </div>
  )
}
