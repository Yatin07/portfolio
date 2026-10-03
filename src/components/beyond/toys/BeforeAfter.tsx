'use client'

import { useState } from 'react'
import { hobbies } from '../../../data/hobbies'
import { Sliders } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

const STOCKS = [
  { id: 'portra', name: 'Portra 400', filter: 'contrast(115%) saturate(125%) sepia(15%)' },
  { id: 'trix', name: 'Tri-X 400', filter: 'grayscale(100%) contrast(140%) brightness(95%)' },
  { id: 'cinestill', name: 'CineStill 800T', filter: 'contrast(125%) saturate(140%) hue-rotate(15deg)' },
]

export default function BeforeAfter({ soundEnabled }: Props) {
  const [sliderPos, setSliderPos] = useState<number>(50) // 0 - 100 percentage
  const [activeStock, setActiveStock] = useState<string>('portra')

  const beforeImg = hobbies.editing?.beforeImage || '/frames/ezgif-frame-120.jpg'
  const afterImg = hobbies.editing?.afterImage || '/frames/ezgif-frame-120.jpg'
  const selectedStock = STOCKS.find((s) => s.id === activeStock) || STOCKS[0]

  return (
    <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Film Stock Preset Buttons */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        {STOCKS.map((stock) => (
          <button
            key={stock.id}
            onClick={() => setActiveStock(stock.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              background: activeStock === stock.id ? 'var(--safelight-accent, #FF4B3A)' : 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-darkroom, #2A2A30)',
              color: '#FFF',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {stock.name}
          </button>
        ))}
      </div>

      {/* Split Image Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: 16,
          overflow: 'hidden',
          border: '2px solid var(--border-darkroom, #2A2A30)',
          marginBottom: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          userSelect: 'none',
        }}
      >
        {/* AFTER Image (Background Layer) */}
        <img
          src={afterImg}
          alt="After color grade"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: selectedStock.filter,
          }}
        />

        {/* BEFORE Image (Clipped Overlay Layer) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${sliderPos}%`,
            overflow: 'hidden',
            borderRight: '2px solid #FFF',
          }}
        >
          <img
            src={beforeImg}
            alt="Before color grade"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              maxWidth: 'none',
              objectFit: 'cover',
              filter: 'grayscale(80%) contrast(85%)',
            }}
          />
        </div>

        {/* Labels Overlay */}
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: 12, fontSize: 11, fontWeight: 700, color: '#FFF' }}>
          RAW
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: 12, fontSize: 11, fontWeight: 700, color: '#00E676' }}>
          GRADED ({selectedStock.name})
        </div>
      </div>

      {/* Scrubbable Range Slider */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-darkroom, #9A958E)', marginBottom: 6, fontFamily: 'var(--font-mono, monospace)' }}>
          <span>BEFORE (RAW)</span>
          <span>SPLIT: {sliderPos}%</span>
          <span>AFTER ({selectedStock.name})</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--safelight-accent, #FF4B3A)', cursor: 'ew-resize' }}
          aria-label="Before and after split slider"
        />
      </div>

      {/* Optional Software Facts (Rendered ONLY if filled in) */}
      {hobbies.editing?.software && (
        <div style={{ marginTop: 14, fontSize: 12, color: 'var(--muted-darkroom, #9A958E)' }}>
          Software: {hobbies.editing.software}
        </div>
      )}
    </div>
  )
}
