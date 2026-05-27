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
      {/* ── HOW IT WORKS ── */}
      <motion.section
        initial={mounted ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-5 py-10"
      >
        <div className="text-center mb-7">
          <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest mb-3">How it works</div>
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
            From idea to itinerary<br />in 3 steps
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div
            className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(20,184,166,0.4), transparent)' }}
          />
          {[
            { num: '01', icon: '📍', title: 'Drop your destination', desc: 'Type any city, country or region. Add dates and how you like to travel.' },
            { num: '02', icon: '🤖', title: 'AI builds your day plan', desc: 'Morning coffee, afternoon attractions, evening restaurants — curated for your style.' },
            { num: '03', icon: '🗺️', title: 'Explore, tweak, share', desc: 'Swap activities, add restaurants, download your plan or share it with travel mates.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={mounted ? { opacity: 0, y: 16 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center p-5 rounded-2xl border border-white/[0.07] hover:border-sky-500/20 transition-colors"
              style={{ background: 'rgba(6,22,34,0.6)', backdropFilter: 'blur(16px)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 relative z-10"
                style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                {step.icon}
              </div>
              <div className="text-xs text-sky-400/50 font-mono mb-2">{step.num}</div>
              <div className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{step.title}</div>
              <div className="text-sm text-white/45 leading-relaxed">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── DESTINATION INSPIRATION ── */}
      <motion.section
        initial={mounted ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-5 py-8 pb-16"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest mb-2">Inspiration</div>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>
              Where will you go next?
            </h2>
          </div>
          <div className="text-xs text-white/30 hidden md:block">Click to start planning</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <motion.button
              key={i}
              initial={mounted ? { opacity: 0, scale: 0.96 } : false}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              onClick={() => scrollToTop(dest.name)}
              className={`relative text-left rounded-2xl overflow-hidden bg-gradient-to-br ${dest.bg} border border-white/[0.08] hover:border-white/[0.16] transition-all cursor-pointer group`}
              style={{ minHeight: 160 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${dest.accent}18, transparent 65%)` }}
              />
              <div
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `${dest.accent}20`, border: `1px solid ${dest.accent}30` }}
              >
                📍
              </div>
              <div className="relative z-10 p-4 pt-5">
                <div className="font-black text-white text-xl mb-0.5" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>{dest.name}</div>
                <div className="text-white/40 text-xs mb-3">{dest.sub}</div>
                <div className="text-[11px] text-white/50 leading-relaxed mb-3">{dest.tags}</div>
                <div
                  className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${dest.accent}18`, color: dest.accent, border: `1px solid ${dest.accent}30` }}
                >
                  {dest.days}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </>
  )
}
