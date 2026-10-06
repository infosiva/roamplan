'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DESTINATIONS = [
  { name: 'Tokyo', sub: 'Japan', bg: 'from-rose-900/80 to-pink-950/90', accent: '#f43f5e', tags: 'Culture · Neon · Street food', days: '5–7 days' },
  { name: 'Bali', sub: 'Indonesia', bg: 'from-emerald-900/80 to-teal-950/90', accent: '#10b981', tags: 'Temples · Surf · Rice terraces', days: '7–10 days' },
  { name: 'Iceland', sub: 'Northern Europe', bg: 'from-blue-900/80 to-indigo-950/90', accent: '#6366f1', tags: 'Aurora · Glaciers · Fjords', days: '7–10 days' },
  { name: 'Kyoto', sub: 'Japan', bg: 'from-amber-900/80 to-orange-950/90', accent: '#f59e0b', tags: 'Geisha · Matcha · Bamboo', days: '3–5 days' },
  { name: 'Patagonia', sub: 'Argentina & Chile', bg: 'from-cyan-900/80 to-sky-950/90', accent: '#0ea5e9', tags: 'Trekking · Glaciers · Off-grid', days: '10–14 days' },
  { name: 'Marrakech', sub: 'Morocco', bg: 'from-orange-900/80 to-red-950/90', accent: '#f97316', tags: 'Souks · Riad · Spice markets', days: '4–6 days' },
]

export default function SectionsClient() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  function scrollToTop(dest: string) {
    // Emit a custom event so HeroClient can pick up the destination
    window.dispatchEvent(new CustomEvent('roamplan:setDestination', { detail: dest }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HOW IT WORKS (compact strip) ── */}
      <motion.section
        initial={mounted ? { opacity: 0, y: 12 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-5 py-4"
        aria-label="How it works"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { icon: '📍', title: 'Drop your destination', desc: 'Any city or region, plus dates and style.' },
            { icon: '🤖', title: 'AI builds your day plan', desc: 'Coffee, sights, dinner, curated for you.' },
            { icon: '🗺️', title: 'Explore, tweak, share', desc: 'Swap activities, download or share.' },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.07]"
              style={{ background: 'rgba(6,22,34,0.6)', backdropFilter: 'blur(16px)' }}
            >
              <div
                className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                {step.icon}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-white text-sm leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{i + 1}. {step.title}</div>
                <div className="text-xs text-white/50 leading-snug">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── DESTINATION INSPIRATION (chip row, scrolls inside itself) ── */}
      <motion.section
        initial={mounted ? { opacity: 0, y: 12 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-5 pt-2 pb-8"
        aria-label="Destination inspiration"
      >
        <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest mb-2">Where will you go next?</div>
        <div className="flex gap-2 overflow-x-auto pb-1 snap-x" style={{ scrollbarWidth: 'none' }}>
          {DESTINATIONS.map((dest, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToTop(dest.name)}
              className={`snap-start shrink-0 text-left rounded-xl bg-gradient-to-br ${dest.bg} border border-white/[0.08] hover:border-white/[0.2] transition-colors cursor-pointer px-4 py-2 min-h-[44px]`}
            >
              <div className="font-black text-white text-sm leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>{dest.name}</div>
              <div className="text-[11px] leading-tight" style={{ color: dest.accent }}>{dest.days}</div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </>
  )
}
