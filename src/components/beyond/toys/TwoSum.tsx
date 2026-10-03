'use client'

import { hobbies } from '../../../data/hobbies'
import { ExternalLink } from 'lucide-react'

type Props = {
  soundEnabled: boolean
}

// Retained for unit test compatibility
export function generateValidTwoSum() {
  for (let attempt = 0; attempt < 2000; attempt++) {
    const target = Math.floor(Math.random() * 35) + 15
    const nums: number[] = []
    for (let i = 0; i < 8; i++) {
      nums.push(Math.floor(Math.random() * (target + 5)) + 1)
    }

    const pairs: [number, number][] = []
    for (let a = 0; a < 8; a++) {
      for (let b = a + 1; b < 8; b++) {
        if (nums[a] + nums[b] === target) {
          pairs.push([a, b])
        }
      }
    }

    if (pairs.length === 1) {
      return { nums, target }
    }
  }

  return { nums: [7, 18, 3, 11, 4, 9, 2, 19], target: 25 }
}

export default function TwoSum({ soundEnabled }: Props) {
  const profileUrl = hobbies.leetcode?.profileUrl || 'https://leetcode.com/u/Yatin07/'
  const cardImgUrl = 'https://leetcard.jacoblin.cool/Yatin07?theme=dark&font=JetBrains+Mono&ext=heatmap&border=0&radius=8'

  return (
    <div style={{ width: '100%', maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'color 0.4s ease' }}>
          LeetCode Stats
        </h4>
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', transition: 'color 0.4s ease' }}>
          Live profile metrics, solved problems & 52-week activity heatmap
        </p>
      </div>

      {/* LeetCode Live Card Embed Link */}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          background: '#0C0C0E',
          padding: 8,
          transition: 'transform 0.2s ease, border-color 0.4s ease',
          textDecoration: 'none',
        }}
      >
        <img
          src={cardImgUrl}
          alt="Yatin07 LeetCode Stats"
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
        />
      </a>

      {/* External Direct Profile Button */}
      <div style={{ marginTop: 20 }}>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 22px',
            borderRadius: 24,
            background: 'var(--accent)',
            color: 'var(--accent-text)',
            fontWeight: 700,
            fontSize: 13,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px var(--accent-transparent)',
            transition: 'background 0.4s ease, color 0.4s ease',
          }}
        >
          Open LeetCode Profile <ExternalLink size={14} />
        </a>
      </div>

    </div>
  )
}
