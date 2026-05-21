import React from 'react'

interface DeadlockDiagramProps {
  caption?: string
}

export function DeadlockDiagram({ caption = 'fig 1 · the shape of a deadlock' }: DeadlockDiagramProps) {
  return (
    <div style={{
      margin: '20px 0', padding: '24px 24px 16px 24px',
      background: 'linear-gradient(180deg, rgba(95,206,219,.08), rgba(95,206,219,.02))',
      border: '1px solid rgba(95,206,219,.25)',
      borderRadius: 16,
    }}>
      <div style={{
        fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
        color: 'var(--ink-faint)', marginBottom: 14,
      }}>{caption}</div>
      <svg viewBox="0 0 600 220" width="100%" height="220">
        <defs>
          <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#D45A75" />
          </marker>
          <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#1d6975" />
          </marker>
        </defs>
        <g>
          <rect x="40" y="30" width="180" height="150" rx="14"
            fill="#FFFFFF" stroke="#FF8FA3" strokeWidth="1.5" />
          <text x="130" y="60" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="14" fontWeight="600" fill="#7a1f33">
            Transaction A
          </text>
          <line x1="55" y1="74" x2="205" y2="74" stroke="#FF8FA3" strokeWidth=".8" strokeDasharray="4 3" />
          <text x="60" y="100" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
            1. holds{'  '}
            <tspan fill="#1d6975" fontWeight="700">orders[7]</tspan>
          </text>
          <text x="60" y="124" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
            2. wants{' '}
            <tspan fill="#D45A75" fontWeight="700">invoices[7]</tspan>
          </text>
          <text x="60" y="156" fontFamily="var(--font-hand)" fontSize="14" fill="#D45A75">
            waiting…
          </text>
        </g>
        <g>
          <rect x="380" y="30" width="180" height="150" rx="14"
            fill="#FFFFFF" stroke="#5FCEDB" strokeWidth="1.5" />
          <text x="470" y="60" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="14" fontWeight="600" fill="#1d6975">
            Transaction B
          </text>
          <line x1="395" y1="74" x2="545" y2="74" stroke="#5FCEDB" strokeWidth=".8" strokeDasharray="4 3" />
          <text x="400" y="100" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
            1. holds{'  '}
            <tspan fill="#D45A75" fontWeight="700">invoices[7]</tspan>
          </text>
          <text x="400" y="124" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
            2. wants{' '}
            <tspan fill="#1d6975" fontWeight="700">orders[7]</tspan>
          </text>
          <text x="400" y="156" fontFamily="var(--font-hand)" fontSize="14" fill="#1d6975">
            waiting…
          </text>
        </g>
        <path d="M 220 80 Q 300 40 380 80"
          stroke="#D45A75" strokeWidth="2" fill="none"
          markerEnd="url(#arrowR)" />
        <path d="M 380 150 Q 300 190 220 150"
          stroke="#1d6975" strokeWidth="2" fill="none"
          markerEnd="url(#arrowB)" />
        <text x="300" y="40" textAnchor="middle"
          fontFamily="var(--font-hand)" fontSize="14" fill="#D45A75">
          A waits for B&apos;s invoice lock
        </text>
        <text x="300" y="210" textAnchor="middle"
          fontFamily="var(--font-hand)" fontSize="14" fill="#1d6975">
          B waits for A&apos;s order lock
        </text>
      </svg>
      <div style={{
        marginTop: 4, fontSize: 12, color: 'var(--ink-soft)', textAlign: 'center',
        fontStyle: 'italic',
      }}>
        Each transaction holds what the other needs. Neither can move.
      </div>
    </div>
  )
}
