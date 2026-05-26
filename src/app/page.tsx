'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGate } from '@/lib/shared/useGate'
import RegisterGate from '@/lib/shared/RegisterGate'

// Fire-and-forget stats ping
function pingStats(path: string) {
  try {
    fetch('http://31.97.56.148:3099/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site: 'roamplan.app', path, userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '', timestamp: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {})
  } catch { /* ignore */ }
}

// Travel style options
const TRAVEL_STYLES = [
  { id: 'solo', label: 'Solo', icon: '🧳' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
]

// Sample Tokyo itinerary for hero preview
const TOKYO_ITINERARY = [
  {
    day: 'Day 1',
    theme: 'Arrival & Shibuya',
    slots: [
      { time: 'Morning', activity: 'Check-in Shinjuku hotel, ramen at Ichiran', icon: '🍜' },
      { time: 'Afternoon', activity: 'Shibuya Crossing, Harajuku Takeshita St', icon: '🛍️' },
      { time: 'Evening', activity: 'Izakaya dinner, Tokyo Tower night view', icon: '🗼' },
    ],
  },
  {
    day: 'Day 2',
    theme: 'Culture & Temples',
    slots: [
      { time: 'Morning', activity: 'Senso-ji Temple at sunrise, street food', icon: '⛩️' },
      { time: 'Afternoon', activity: 'teamLab Borderless digital art', icon: '🎨' },
      { time: 'Evening', activity: 'Omakase sushi in Ginza', icon: '🍣' },
    ],
  },
  {
    day: 'Day 3',
    theme: 'Akihabara & Departure',
    slots: [
      { time: 'Morning', activity: 'Tsukiji outer market breakfast', icon: '🐟' },
      { time: 'Afternoon', activity: 'Akihabara electronics, anime shops', icon: '🎮' },
      { time: 'Evening', activity: 'Shinjuku rooftop bar, bullet train south', icon: '🚅' },
    ],
  },
]

// Popular destination cards with gradient themes
const DESTINATIONS = [
  { name: 'Tokyo', sub: 'Japan', bg: 'from-rose-900/80 to-pink-950/90', accent: '#f43f5e', tags: 'Culture · Neon · Street food', days: '5–7 days' },
  { name: 'Bali', sub: 'Indonesia', bg: 'from-emerald-900/80 to-teal-950/90', accent: '#10b981', tags: 'Temples · Surf · Rice terraces', days: '7–10 days' },
  { name: 'Iceland', sub: 'Northern Europe', bg: 'from-blue-900/80 to-indigo-950/90', accent: '#6366f1', tags: 'Aurora · Glaciers · Fjords', days: '7–10 days' },
  { name: 'Kyoto', sub: 'Japan', bg: 'from-amber-900/80 to-orange-950/90', accent: '#f59e0b', tags: 'Geisha · Matcha · Bamboo', days: '3–5 days' },
  { name: 'Patagonia', sub: 'Argentina & Chile', bg: 'from-cyan-900/80 to-sky-950/90', accent: '#0ea5e9', tags: 'Trekking · Glaciers · Off-grid', days: '10–14 days' },
  { name: 'Marrakech', sub: 'Morocco', bg: 'from-orange-900/80 to-red-950/90', accent: '#f97316', tags: 'Souks · Riad · Spice markets', days: '4–6 days' },
]

// Animated hero background
function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky horizon gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 60% at 50% 0%, rgba(14,165,233,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(20,184,166,0.12) 0%, transparent 50%)',
        }}
      />
      {/* Animated sky orbs */}
      <motion.div
        className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent)', filter: 'blur(100px)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[0%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12), transparent)', filter: 'blur(80px)' }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity, delay: 3 }}
      />
      {/* Subtle map grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// Itinerary day preview card
function ItineraryPreview() {
  const [activeDay, setActiveDay] = useState(0)
  const day = TOKYO_ITINERARY[activeDay]

  useEffect(() => {
    const t = setInterval(() => setActiveDay(d => (d + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden border border-sky-500/20 bg-[#020c14]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg">🗼</span>
              <span className="font-bold text-white text-base" style={{ fontFamily: 'Syne, sans-serif' }}>3 Days in Tokyo</span>
            </div>
            <div className="text-[11px] text-sky-400/70">AI-generated · Nov 12–14 · Solo</div>
          </div>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">AI Plan</span>
        </div>
        {/* Day tabs */}
        <div className="flex gap-1.5">
          {TOKYO_ITINERARY.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className="text-[11px] font-medium px-3 py-1 rounded-full transition-all"
              style={{
                background: activeDay === i ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeDay === i ? '#38bdf8' : 'rgba(255,255,255,0.35)',
                border: activeDay === i ? '1px solid rgba(14,165,233,0.3)' : '1px solid transparent',
              }}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="p-4"
        >
          <div className="text-[11px] font-semibold text-sky-400/60 uppercase tracking-widest mb-3">{day.theme}</div>
          <div className="space-y-3">
            {day.slots.map((slot, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <span className="text-base">{slot.icon}</span>
                  {i < day.slots.length - 1 && <div className="w-px h-5 bg-white/10" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-0.5">{slot.time}</div>
                  <div className="text-xs text-white/75 leading-relaxed">{slot.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer bar */}
      <div className="px-4 py-3 border-t border-white/[0.05] flex items-center justify-between">
        <div className="text-[11px] text-white/30">3 days · 9 activities · ¥45k budget</div>
        <div className="text-[11px] text-sky-400 font-semibold cursor-pointer hover:text-sky-300 transition-colors">Customize →</div>
      </div>
    </div>
  )
}

// Floating chatbot
function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hey! I\'m your AI travel companion. Tell me where you want to go and I\'ll build your perfect itinerary ✈️' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = input
    setMsgs(m => [...m, { role: 'user', text: userMsg }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMsg }],
          system: 'You are RoamPlan, an enthusiastic AI travel companion. Help users plan trips with specific, local, actionable advice. Ask about destination, dates, budget, travel style. Be concise and excited about travel.',
        }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'bot', text: data.text || data.content || 'Let me plan that for you...' }])
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Having trouble connecting right now.' }])
    }
    setLoading(false)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: 24, right: 24, width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(14,165,233,0.45)', zIndex: 1000, fontSize: 22 }}
      >
        {open ? '✕' : '✈️'}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', bottom: 90, right: 24, width: 320, height: 420, background: 'rgba(2,12,20,0.97)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: 18, display: 'flex', flexDirection: 'column', zIndex: 1000, backdropFilter: 'blur(24px)' }}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(14,165,233,0.12)', fontSize: 13, fontWeight: 700, color: '#f0f9ff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✈️</span> RoamPlan AI
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(14,165,233,0.6)', fontWeight: 500 }}>Your travel companion</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'rgba(14,165,233,0.18)' : 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: 12, fontSize: 12, color: 'rgba(240,249,255,0.85)', maxWidth: '88%', lineHeight: '1.5' }}>{m.text}</div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: 12, display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => <span key={i} className="typing-dot" style={{ background: 'rgba(14,165,233,0.6)' }} />)}
                </div>
              )}
            </div>
            <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(14,165,233,0.12)', display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Where do you want to go?"
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 10, padding: '7px 10px', fontSize: 12, color: '#f0f9ff', outline: 'none' }}
              />
              <button
                onClick={send}
                style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, color: '#fff', cursor: 'pointer', fontWeight: 600 }}
              >→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// --- Main page ---
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [destination, setDestination] = useState('')
  const [travelStyle, setTravelStyle] = useState('')
  const { count: gateCount, showGate, increment: gateIncrement, onRegistered, dismissGate } = useGate('roamplan', 3, 'plan')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') pingStats('/')
  }, [])

  async function handlePlan(e: React.FormEvent) {
    e.preventDefault()
    if (!destination.trim()) return
    const allowed = await gateIncrement()
    if (!allowed) return
    const params = new URLSearchParams({ destination })
    if (travelStyle) params.set('style', travelStyle)
    window.location.href = `/api/plan?${params}`
  }

  return (
    <div className="min-h-screen text-white relative" style={{ background: 'var(--theme-base, #020c14)' }}>
      {showGate && (
        <RegisterGate
          freeUsed={gateCount}
          freeLimit={3}
          freeFeature="free trip plans"
          lockedFeature="unlimited itineraries + PDF export"
          accentColor="#0ea5e9"
          site="roamplan"
          onSuccess={onRegistered}
          onDismiss={dismissGate}
        />
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <HeroBg />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            {/* Left: headline + search */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Pill badge */}
              <motion.div
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-3 pill-glass"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                </span>
                AI-powered travel planning — free
              </motion.div>

              <h1
                className="text-5xl md:text-6xl font-black leading-[1.05] mb-3"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}
              >
                Your next adventure,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                  planned in seconds.
                </span>
              </h1>

              <p className="text-white/55 text-lg mb-5 max-w-lg leading-relaxed">
                Tell the AI where you want to go. Get a complete day-by-day itinerary — morning coffee spots, hidden gems, evening rooftops — tailored to your style.
              </p>

              {/* Destination search form */}
              <form onSubmit={handlePlan} className="mb-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400/60 text-base">📍</span>
                    <input
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      placeholder="Where to? Tokyo, Bali, Iceland..."
                      className="w-full bg-white/[0.06] border border-sky-500/20 rounded-xl pl-10 pr-4 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-sky-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-press px-6 py-4 rounded-xl text-sm font-bold text-white whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}
                  >
                    Plan My Trip →
                  </button>
                </div>

                {/* Travel style selector */}
                <div className="flex flex-wrap gap-2">
                  {TRAVEL_STYLES.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setTravelStyle(travelStyle === s.id ? '' : s.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: travelStyle === s.id ? 'rgba(14,165,233,0.18)' : 'rgba(255,255,255,0.05)',
                        color: travelStyle === s.id ? '#38bdf8' : 'rgba(255,255,255,0.45)',
                        border: travelStyle === s.id ? '1px solid rgba(14,165,233,0.35)' : '1px solid rgba(255,255,255,0.08)',
                        transform: 'scale(1)',
                        transition: 'all 0.12s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </form>

              {/* Social proof — real */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/35">
                <span>✈️ No sign-up needed</span>
                <span className="text-white/15">·</span>
                <span>🌍 180+ destinations</span>
                <span className="text-white/15">·</span>
                <span>⚡ Itinerary in &lt;30 seconds</span>
              </div>
            </motion.div>

            {/* Right: itinerary preview card */}
            <motion.div
              initial={mounted ? { opacity: 0, x: 24 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              {/* Map pin decoration */}
              <div className="relative">
                <div
                  className="absolute -top-6 -left-6 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent)', filter: 'blur(40px)' }}
                />
                <ItineraryPreview />
                {/* Floating badges */}
                <motion.div
                  className="absolute -bottom-4 -left-6 bg-[#061622] border border-sky-500/20 rounded-xl px-3 py-2 text-xs shadow-xl"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-white/50 text-[10px] mb-0.5">Today&apos;s plan</div>
                  <div className="font-semibold text-white">Senso-ji → teamLab</div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-[#061622] border border-teal-500/20 rounded-xl px-3 py-2 text-xs shadow-xl"
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="text-[10px] text-teal-400 font-semibold">AI suggested</div>
                  <div className="text-white/70">9 activities · 3 days</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE ITINERARY STRIP ── */}
      <section className="lg:hidden px-5 pb-10">
        <div className="text-center mb-5">
          <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest mb-1">See what AI builds</div>
          <div className="text-lg font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>3 Days in Tokyo — sample plan</div>
        </div>
        <ItineraryPreview />
      </section>

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
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>From idea to itinerary<br />in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(20,184,166,0.4), transparent)' }} />
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
        className="relative z-10 max-w-6xl mx-auto px-5 py-8 pb-10"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest mb-2">Inspiration</div>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em' }}>Where will you go next?</h2>
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
              onClick={() => { setDestination(dest.name); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className={`relative text-left rounded-2xl overflow-hidden bg-gradient-to-br ${dest.bg} border border-white/[0.08] hover:border-white/[0.16] transition-all cursor-pointer group`}
              style={{ minHeight: 160 }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${dest.accent}18, transparent 65%)` }}
              />
              {/* Pin icon top-right */}
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
    </div>
  )
}
