'use client'
/* RoamPlan — Green-tint travel background: emerald gradients + gentle flight arcs */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Light green-tint base — matches --background: #f0fdf4 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#f0fdf4',
      }} />

      {/* Soft emerald bloom top-right */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '600px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(5,150,105,0.10) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Gentle teal lower-left */}
      <div style={{
        position: 'absolute', bottom: '-5%', left: '-5%',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(4,120,87,0.08) 0%, rgba(5,150,105,0.04) 50%, transparent 70%)',
        filter: 'blur(90px)',
      }} />

      {/* Emerald mid-pulse */}
      <div style={{
        position: 'absolute', top: '40%', left: '40%',
        width: '350px', height: '350px',
        background: 'radial-gradient(ellipse, rgba(5,150,105,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'ambientPulse 8s ease-in-out infinite',
      }} />

      {/* Animated flight arcs — emerald trails */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="emeraldTrail1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="emeraldTrail2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="emeraldTrail3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
            <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Arc 1 — mid sweep */}
        <path d="M -100 320 Q 450 60 1000 280" stroke="url(#emeraldTrail1)" strokeWidth="1.5" fill="none" strokeDasharray="8 14" opacity="0.5">
          <animate attributeName="stroke-dashoffset" from="0" to="-220" dur="9s" repeatCount="indefinite" />
        </path>
        {/* Arc 2 — lower sweep */}
        <path d="M -60 520 Q 520 240 1100 440" stroke="url(#emeraldTrail2)" strokeWidth="1" fill="none" strokeDasharray="6 16" opacity="0.35">
          <animate attributeName="stroke-dashoffset" from="0" to="-220" dur="13s" repeatCount="indefinite" />
        </path>
        {/* Arc 3 — upper sweep */}
        <path d="M 180 -10 Q 620 160 1050 90" stroke="url(#emeraldTrail3)" strokeWidth="1" fill="none" strokeDasharray="4 18" opacity="0.22">
          <animate attributeName="stroke-dashoffset" from="0" to="-220" dur="17s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Floating location pins */}
      {[
        { x: '14%',  y: '22%', delay: '0s',   size: 18, op: 0.28 },
        { x: '70%',  y: '16%', delay: '1.8s', size: 14, op: 0.22 },
        { x: '42%',  y: '58%', delay: '3.2s', size: 12, op: 0.18 },
        { x: '82%',  y: '48%', delay: '2.1s', size: 16, op: 0.24 },
        { x: '26%',  y: '72%', delay: '4.5s', size: 11, op: 0.15 },
      ].map((pin, i) => (
        <div key={i} style={{
          position: 'absolute', left: pin.x, top: pin.y,
          opacity: pin.op, fontSize: pin.size,
          animation: `float ${4 + i * 0.8}s ease-in-out infinite`,
          animationDelay: pin.delay,
        }}>📍</div>
      ))}

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.7; transform: scale(1) }
          50%       { opacity: 1;   transform: scale(1.15) }
        }
      `}</style>
    </div>
  )
}
