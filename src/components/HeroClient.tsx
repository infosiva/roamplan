'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGate } from '@/lib/shared/useGate'
import RegisterGate from '@/lib/shared/RegisterGate'
import type { ContentOverrides } from '@/lib/content'
import { saveTripToStorage } from './TripDashboard'

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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId: number
    let tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e: MouseEvent) => {
      tx = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 18
      ty = ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 12
    }
    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `translate(${cx}px, ${cy}px) scale(1.06)`
      rafId = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Parallax blob layer */}
      <div ref={ref} className="absolute inset-0 will-change-transform" style={{ transformOrigin: 'center' }}>
        <div
          className="absolute top-[-20%] left-[5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.22), transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.18), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-[40%] left-[55%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.10), transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>
      {/* Subtle grain overlay — cinematic texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
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

interface ItineraryDay {
  day: number
  theme: string
  morning?: { activity: string; location?: string; duration?: string; cost?: string }
  afternoon?: { activity: string; location?: string; duration?: string; cost?: string }
  evening?: { activity: string; location?: string; duration?: string; cost?: string }
  tips?: string
}

interface ItineraryData {
  destination: string
  duration: number
  overview?: string
  budget_estimate?: string
  days: ItineraryDay[]
  practical_tips?: string[]
}

const SLOT_ICONS: Record<string, string> = { morning: '🌅', afternoon: '🌞', evening: '🌙' }

function ItineraryAccordion({ data, destination }: { data: ItineraryData; destination: string }) {
  const [openDay, setOpenDay] = useState(0)

  const totalActivities = (data.days || []).reduce((n, d) => {
    return n + ['morning', 'afternoon', 'evening'].filter(s => d[s as keyof ItineraryDay]).length
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 rounded-2xl border border-sky-500/20 overflow-hidden"
      style={{ background: 'rgba(2,12,20,0.85)', backdropFilter: 'blur(20px)' }}
    >
      {/* Quick stats bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] flex-wrap"
        style={{ background: 'rgba(14,165,233,0.06)' }}
      >
        <span className="text-xs text-white/60 font-medium">📅 {data.duration} days</span>
        <span className="text-white/20 text-xs">·</span>
        <span className="text-xs text-white/60 font-medium">🏛 {totalActivities} activities</span>
        <span className="text-white/20 text-xs">·</span>
        {data.budget_estimate && (
          <>
            <span className="text-xs text-white/60 font-medium">💰 Est. {data.budget_estimate}</span>
            <span className="text-white/20 text-xs">·</span>
          </>
        )}
        <span className="text-xs text-teal-400 font-semibold">✈️ {destination}</span>
      </div>

      {/* Overview */}
      {data.overview && (
        <div className="px-4 py-3 border-b border-white/[0.05]">
          <p className="text-xs text-white/50 leading-relaxed">{data.overview}</p>
        </div>
      )}

      {/* Accordion days */}
      <div className="divide-y divide-white/[0.05]">
        {(data.days || []).map((day, idx) => {
          const isOpen = openDay === idx
          const slots = (['morning', 'afternoon', 'evening'] as const).filter(s => day[s])
          const slotCount = slots.length

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Day header */}
              <button
                onClick={() => setOpenDay(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: 'rgba(14,165,233,0.15)', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.2)' }}
                  >
                    {day.day}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Day {day.day} — {day.theme}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(20,184,166,0.1)', color: '#2dd4bf', border: '1px solid rgba(20,184,166,0.2)' }}
                  >
                    {slotCount} slots
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/30 text-xs"
                  >
                    ▼
                  </motion.span>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 space-y-2">
                      {slots.map((slot, si) => {
                        const s = day[slot]
                        if (!s) return null
                        return (
                          <div
                            key={slot}
                            className="flex items-start gap-3 py-2 px-3 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                          >
                            <span className="text-base shrink-0 mt-0.5">{SLOT_ICONS[slot]}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{slot}</span>
                                {s.duration && (
                                  <span className="text-[10px] text-sky-400/60">{s.duration}</span>
                                )}
                                {s.cost && (
                                  <span className="text-[10px] text-teal-400/70 ml-auto shrink-0">{s.cost}</span>
                                )}
                              </div>
                              <div className="text-xs text-white/80 font-medium leading-snug">{s.activity}</div>
                              {s.location && (
                                <div className="text-[11px] text-white/35 mt-0.5">📍 {s.location}</div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      {day.tips && (
                        <div className="flex items-start gap-2 pt-1">
                          <span className="text-[11px] text-amber-400/60 shrink-0">💡</span>
                          <p className="text-[11px] text-white/35 italic">{day.tips}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
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
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null)
  const [error, setError] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const { count: gateCount, showGate, increment: gateIncrement, onRegistered, dismissGate } = useGate('roamplan', 10, 'plan')

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

    setLoading(true)
    setError('')
    setItinerary(null)

    try {
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          duration: 3,
          budget: 'moderate',
          travel_style: travelStyle || 'balanced',
          interests: [],
          travel_with: travelStyle === 'family' ? 'Family with Kids' : 'Solo',
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const plan = data.itinerary as ItineraryData
      setItinerary(plan)
      saveTripToStorage(destination, plan.duration ?? 3)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showGate && (
        <RegisterGate
          freeUsed={gateCount}
          freeLimit={10}
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
      <section className="relative overflow-hidden">
        <HeroBg />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            {/* Left: headline + search */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-4"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(186,230,253,0.85)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                </span>
                {tagline}
              </motion.div>

              <h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.0] mb-4"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}
              >
                {headline}<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #38bdf8 0%, #22d3ee 50%, #2dd4bf 100%)' }}
                >
                  planned in seconds.
                </span>
              </h1>

              <p className="text-white/50 text-[15px] mb-5 max-w-lg leading-relaxed">{subheadline}</p>

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
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className="px-6 py-4 rounded-xl text-sm font-bold text-white whitespace-nowrap disabled:opacity-60 transition-opacity"
                    style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Planning...
                      </span>
                    ) : cta}
                  </motion.button>
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

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium tracking-wide text-white/35 uppercase">
                <span className="flex items-center gap-1.5">✈️ No sign-up needed</span>
                <span className="text-white/10">·</span>
                <span className="flex items-center gap-1.5">🌍 180+ destinations</span>
                <span className="text-white/10">·</span>
                <span className="flex items-center gap-1.5">⚡ &lt;30 seconds</span>
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

          {/* ── ITINERARY RESULT ── */}
          <div ref={resultRef}>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 px-4 py-3 rounded-xl border border-red-500/20 text-sm text-red-400"
                  style={{ background: 'rgba(239,68,68,0.06)' }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {itinerary && (
              <ItineraryAccordion data={itinerary} destination={destination} />
            )}
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
