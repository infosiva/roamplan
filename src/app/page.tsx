'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

// --- Animated ocean background ---
function AnimatedBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent)', filter: 'blur(120px)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[5%] w-[450px] h-[450px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.18), transparent)', filter: 'blur(100px)' }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-[35%] right-[25%] w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12), transparent)', filter: 'blur(80px)' }}
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
      />
    </div>
  )
}

// --- 3-step onboarding ---
const STEPS = [
  { num: '01', icon: '💬', title: 'Tell the AI', desc: 'Destination, dates, budget, travel style' },
  { num: '02', icon: '🤖', title: 'AI plans instantly', desc: 'Flights, hotels, activities — fully personalised' },
  { num: '03', icon: '✈️', title: 'Travel with confidence', desc: 'Download, share, or book directly from your plan' },
]

// --- Destination cards ---
const DESTINATIONS = [
  { name: 'Tokyo', emoji: '🗼', tags: 'Culture · Food · Tech' },
  { name: 'Bali', emoji: '🌴', tags: 'Beach · Wellness · Budget' },
  { name: 'Paris', emoji: '🗼', tags: 'Romance · Art · History' },
  { name: 'New York', emoji: '🗽', tags: 'City · Food · Shopping' },
  { name: 'Santorini', emoji: '🏛️', tags: 'Island · Luxury · Views' },
  { name: 'Safari Kenya', emoji: '🦁', tags: 'Wildlife · Adventure · Nature' },
]

// --- Floating chatbot ---
function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! Tell me where you\'d like to go and I\'ll help plan your trip ✈️' },
  ])
  const [input, setInput] = useState('')

  async function send() {
    if (!input.trim()) return
    const userMsg = input
    setMsgs(m => [...m, { role: 'user', text: userMsg }])
    setInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMsg }],
          system: 'You are RoamPlan, an AI travel planner. Help users plan trips. Ask about destination, dates, budget, style. Give concise, actionable advice.',
        }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'bot', text: data.text || data.content || 'Let me plan that for you...' }])
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Having trouble connecting right now.' }])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: 24, right: 24, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#0891b2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(6,182,212,0.5)', zIndex: 1000, fontSize: 20 }}
      >
        {open ? '✕' : '💬'}
      </button>
      {open && (
        <div style={{ position: 'fixed', bottom: 88, right: 24, width: 320, height: 400, background: 'rgba(3,13,15,0.97)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 16, display: 'flex', flexDirection: 'column', zIndex: 1000, backdropFilter: 'blur(20px)' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(6,182,212,0.2)', fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>RoamPlan Assistant</div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: 10, fontSize: 12, color: 'rgba(248,250,252,0.85)', maxWidth: '85%' }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(6,182,212,0.2)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Where do you want to go?"
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#f8fafc', outline: 'none' }}
            />
            <button onClick={send} style={{ background: '#06b6d4', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#000', cursor: 'pointer', fontWeight: 600 }}>→</button>
          </div>
        </div>
      )}
    </>
  )
}

// --- Main page ---
export default function Home() {
  const [destination, setDestination] = useState('')
  const { count: gateCount, showGate, increment: gateIncrement, onRegistered, dismissGate } = useGate('roamplan', 2, 'plan')

  // ping stats on mount
  if (typeof window !== 'undefined') pingStats('/')

  async function handlePlan(e: React.FormEvent) {
    e.preventDefault()
    if (!destination.trim()) return
    const allowed = await gateIncrement()
    if (!allowed) return
    window.location.href = `/api/plan?destination=${encodeURIComponent(destination)}`
  }

  return (
    <div className="min-h-screen bg-[#030d0f] text-white relative">
      {showGate && (
        <RegisterGate
          freeUsed={gateCount}
          freeLimit={2}
          freeFeature="free trip plans"
          lockedFeature="unlimited itineraries + PDF export"
          accentColor="#0ea5e9"
          site="roamplan"
          onSuccess={onRegistered}
          onDismiss={dismissGate}
        />
      )}
      <AnimatedBg />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <span className="font-bold text-lg text-white">RoamPlan</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/about" className="text-sm text-white/60 hover:text-white transition-colors">About</a>
          <a href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left col */}
          <div className="flex-1 md:w-[55%]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-5">
              ✨ AI-Powered Trip Planning
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
              Plan your dream trip<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">in 30 seconds</span>
            </h1>
            <p className="text-white/60 text-base mb-7 max-w-md leading-relaxed">
              Tell the AI where you want to go, your budget and style — get a complete itinerary instantly.
            </p>
            <form onSubmit={handlePlan} className="flex flex-col sm:flex-row gap-3 max-w-md mb-5">
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl text-sm font-semibold text-black whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#06b6d4,#0891b2)' }}
              >
                Plan My Trip →
              </button>
            </form>
            <div className="flex flex-wrap gap-4 text-xs text-white/50 mb-3">
              <span className="flex items-center gap-1">✈️ <strong className="text-white">50k+</strong> trips planned</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">🌍 <strong className="text-white">190+</strong> countries</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">⭐ <strong className="text-white">4.9/5</strong> rating</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] text-white/25 uppercase tracking-wider">As seen in</span>
              {['CNN Travel', 'The Guardian', 'Thrillist', 'WIRED'].map(p => (
                <span key={p} className="text-[11px] font-semibold text-white/35 border border-white/10 rounded px-2 py-0.5">{p}</span>
              ))}
            </div>
          </div>

          {/* Right col — mock trip card */}
          <motion.div
            className="hidden md:block md:w-[45%]"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="h-36 w-full" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(8,145,178,0.15), rgba(20,184,166,0.2))' }}>
                <div className="h-full flex items-center justify-center text-5xl">🗼</div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white text-base">Paris, France</div>
                    <div className="text-white/40 text-xs">7 days · 2 travellers</div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">AI Generated</span>
                </div>
                <div className="space-y-2">
                  {[
                    { day: 'Day 1', place: 'Eiffel Tower', time: '10:00 AM' },
                    { day: 'Day 2', place: 'Louvre Museum', time: '9:00 AM' },
                    { day: 'Day 3', place: 'Versailles', time: '8:30 AM' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-cyan-400 font-medium w-10">{item.day}</span>
                        <span className="text-xs text-white/80">{item.place}</span>
                      </div>
                      <span className="text-xs text-white/30">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
      >
        <div className="text-center mb-10">
          <div className="text-xs text-cyan-400 font-medium mb-2 uppercase tracking-widest">How it works</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Plan in 3 simple steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-cyan-500/30 via-cyan-500/60 to-cyan-500/30" />
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mx-auto mb-4 relative z-10">
                {step.icon}
              </div>
              <div className="text-xs text-cyan-400/60 font-mono mb-1">{step.num}</div>
              <div className="font-semibold text-white mb-2">{step.title}</div>
              <div className="text-sm text-white/50">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Destination inspiration */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
      >
        <div className="text-center mb-10">
          <div className="text-xs text-cyan-400 font-medium mb-2 uppercase tracking-widest">Explore</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Popular destinations</h2>
          <p className="text-white/40 text-sm mt-2">Click any destination to start planning</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => { setDestination(dest.name); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="text-left p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/25 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="text-4xl mb-3">{dest.emoji}</div>
              <div className="font-semibold text-white text-sm mb-1">{dest.name}</div>
              <div className="text-xs text-white/40">{dest.tags}</div>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>✈️</span>
            <span className="font-semibold text-sm text-white">RoamPlan</span>
            <span className="text-white/30 text-xs">AI-powered travel planning</span>
          </div>
          <div className="flex gap-5 text-xs text-white/40">
            <a href="/privacy" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="/about" className="hover:text-white/70 transition-colors">About</a>
            <a href="/contact" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <FloatingChat />
    </div>
  )
}
