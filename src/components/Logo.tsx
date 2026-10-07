export function Logo({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <span className="flex items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110" style={{ width: size, height: size, background: `linear-gradient(135deg, ${color}, #22d3ee)`, flexShrink: 0 }} aria-hidden>
      <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" fill="none" />
        <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" fill="white" />
      </svg>
    </span>
  )
}
