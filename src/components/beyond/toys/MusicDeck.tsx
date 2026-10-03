'use client'

import { useState, useEffect } from 'react'
import { hobbies } from '../../../data/hobbies'
import { Disc, Music } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

const PADS = [
  { id: 1, key: '1', name: 'KICK', color: '#FF4B3A' },
  { id: 2, key: '2', name: 'SNARE', color: '#00E5FF' },
  { id: 3, key: '3', name: 'HAT', color: '#FFB703' },
  { id: 4, key: '4', name: 'CLAP', color: '#00E676' },
]

export default function MusicDeck({ soundEnabled }: Props) {
  const [activePad, setActivePad] = useState<number | null>(null)
  const [isPlayingRecord, setIsPlayingRecord] = useState<boolean>(true)

  // Web Audio Synth Sampler
  const triggerPadSound = (padId: number) => {
    setActivePad(padId)
    setTimeout(() => setActivePad(null), 150)

    if (!soundEnabled) return

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = ctx.currentTime

      if (padId === 1) {
        // KICK: Sine frequency drop
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.setValueAtTime(130, now)
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.15)
        gain.gain.setValueAtTime(0.8, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.15)
      } else if (padId === 2) {
        // SNARE: Noise + Triangle punch
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(180, now)
        gain.gain.setValueAtTime(0.5, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.1)
      } else if (padId === 3) {
        // HAT: High Frequency Burst
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(8000, now)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
      } else if (padId === 4) {
        // CLAP: Multiple short noise clicks
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(1200, now)
        gain.gain.setValueAtTime(0.4, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.08)
      }
    } catch {}
  }

  // Keyboard 1-4 triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        triggerPadSound(parseInt(e.key, 10))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [soundEnabled])

  return (
    <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Vinyl Record Player Animation */}
      <div
        style={{
          position: 'relative',
          height: 160,
          background: 'rgba(10, 10, 12, 0.6)',
          borderRadius: 20,
          border: '1px solid var(--border-darkroom, #2A2A30)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #333 15%, #111 16%, #111 40%, #222 41%, #050505 100%)',
            border: '3px solid #444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(0,0,0,0.8)',
            animation: isPlayingRecord ? 'spin 4s linear infinite' : 'none',
          }}
        >
          <Disc size={36} color="var(--safelight-accent, #FF4B3A)" />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* 4-Pad Drum Sampler */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono, monospace)', color: 'var(--muted-darkroom, #9A958E)', marginBottom: 12 }}>
          TAP PADS OR PRESS KEYS [1 - 4] TO PLAY
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PADS.map((pad) => {
            const isActive = activePad === pad.id
            return (
              <button
                key={pad.id}
                onClick={() => triggerPadSound(pad.id)}
                style={{
                  height: 64,
                  borderRadius: 14,
                  background: isActive ? pad.color : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${isActive ? pad.color : 'var(--border-darkroom, #2A2A30)'}`,
                  color: isActive ? '#000' : '#FFF',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? `0 0 20px ${pad.color}` : 'none',
                  transform: isActive ? 'scale(0.96)' : 'scale(1)',
                  transition: 'all 0.1s ease',
                }}
              >
                <span>{pad.name}</span>
                <span style={{ fontSize: 10, opacity: 0.6, fontFamily: 'var(--font-mono, monospace)' }}>[{pad.key}]</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Optional Spotify Embed (Rendered ONLY if filled in) */}
      {hobbies.music?.spotifyEmbedUrl && (
        <div style={{ marginTop: 20 }}>
          <iframe
            src={hobbies.music.spotifyEmbedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            style={{ borderRadius: 12 }}
            title="Spotify Playlist Embed"
          />
        </div>
      )}
    </div>
  )
}
