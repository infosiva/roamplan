'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGate } from '@/lib/shared/useGate'
import RegisterGate from '@/lib/shared/RegisterGate'
import type { ContentOverrides } from '@/lib/content'

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

const TRAVEL_STYLES = [
  { id: 'solo', label: 'Solo', icon: '🧳' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'luxury', label: 'Luxury', icon: '✨' },
]

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

function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 60% at 50% 0%, rgba(14,165,233,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(20,184,166,0.12) 0%, transparent 50%)',
        }}
      />
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
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

function ItineraryPreview() {
  const [activeDay, setActiveDay] = useState(0)
  const day = TOKYO_ITINERARY[activeDay]

  useEffect(() => {
    const t = setInterval(() => setActiveDay(d => (d + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden border border-sky-500/20 bg-[#020c14]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
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

      <div className="px-4 py-3 border-t border-white/[0.05] flex items-center justify-between">
        <div className="text-[11px] text-white/30">3 days · 9 activities · ¥45k budget</div>
        <div className="text-[11px] text-sky-400 font-semibold cursor-pointer hover:text-sky-300 transition-colors">Customize →</div>
      </div>
    </div>
  )
}

const STEPS = [
  { num: '01', label: 'Pick destination' },
  { num: '02', label: 'AI plans itinerary' },
  { num: '03', label: 'Customize & share' },
  { num: '04', label: 'Travel happy' },
]

interface Props {
  overrides: ContentOverrides
}

export default function HeroClient({ overrides }: Props) {
  const [mounted, setMounted] = useState(false)
  const [destination, setDestination] = useState('')
  const [travelStyle, setTravelStyle] = useState('')
  const { count: gateCount, showGate, increment: gateIncrement, onRegistered, dismissGate } = useGate('roamplan', 3, 'plan')

  const headline = overrides.headline ?? 'Your next adventure,'
  const subheadline = overrides.subheadline ?? 'Tell the AI where you want to go. Get a complete day-by-day itinerary — morning coffee spots, hidden gems, evening rooftops — tailored to your style.'
  const cta = overrides.cta ?? 'Plan My Trip →'
  const tagline = overrides.tagline ?? 'AI-powered travel planning — free'

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') pingStats('/')
    function onSetDest(e: Event) {
      const dest = (e as CustomEvent<string>).detail
      setDestination(dest)
    }
    window.addEventListener('roamplan:setDestination', onSetDest)
    return () => window.removeEventListener('roamplan:setDestination', onSetDest)
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
    <>
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

      {/* ── NUMBERED STEPS ROW — above fold ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-6">
        <div className="flex items-center gap-0 overflow-x-auto pb-1 scrollbar-hide">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center gap-0 shrink-0">
              <motion.div
                initial={mounted ? { opacity: 0, y: -8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 px-3 py-1.5"
              >
                <span className="text-[10px] font-mono text-sky-500/60">{step.num}</span>
                <span className="text-[11px] font-medium text-white/50 whitespace-nowrap">{step.label}</span>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-gradient-to-r from-sky-500/30 to-sky-500/10 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <HeroBg />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            {/* Left: headline + search */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
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
                {tagline}
              </motion.div>

              <h1
                className="text-5xl md:text-6xl font-black leading-[1.05] mb-3"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}
              >
                {headline}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                  planned in seconds.
                </span>
              </h1>

              <p className="text-white/55 text-lg mb-5 max-w-lg leading-relaxed">{subheadline}</p>

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
                    {cta}
                  </button>
                </div>

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
                        transition: 'all 0.12s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </form>

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
              <div className="relative">
                <div
                  className="absolute -top-6 -left-6 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent)', filter: 'blur(40px)' }}
                />
                <ItineraryPreview />
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
    </>
  )
}
