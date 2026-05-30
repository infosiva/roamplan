'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TripStats {
  tripsPlanned: number
  destinations: string[]
  totalDays: number
  recentTrip: string
}


function loadStats(): TripStats {
  if (typeof window === 'undefined') return { tripsPlanned: 0, destinations: [], totalDays: 0, recentTrip: '—' }

  const raw = localStorage.getItem('roamplan_trips')
  let trips: { destination: string; days: number }[] = []
  try { trips = raw ? JSON.parse(raw) : [] } catch { trips = [] }

  const destinations = [...new Set(trips.map(t => t.destination))]
  const totalDays = trips.reduce((sum, t) => sum + (t.days || 0), 0)
  const recentTrip = trips.length > 0 ? trips[trips.length - 1].destination : '—'

  return { tripsPlanned: trips.length, destinations, totalDays, recentTrip }
}

const STAT_CARDS = [
  {
    label: 'Trips Planned',
    icon: '✈️',
    key: 'tripsPlanned' as const,
    format: (v: number | string[]) => String(v as number),
  },
  {
    label: 'Destinations',
    icon: '📍',
    key: 'destinations' as const,
    format: (v: number | string[]) => String((v as string[]).length),
  },
  {
    label: 'Days Planned',
    icon: '📅',
    key: 'totalDays' as const,
    format: (v: number | string[]) => String(v as number),
  },
  {
    label: 'Last Trip',
    icon: '🗺️',
    key: 'recentTrip' as const,
    format: (v: number | string[]) => v as unknown as string,
  },
]

export default function TripDashboard() {
  const [stats, setStats] = useState<TripStats | null>(null)

  useEffect(() => {
    setStats(loadStats())
    function onUpdate() { setStats(loadStats()) }
    window.addEventListener('roamplan:tripSaved', onUpdate)
    return () => window.removeEventListener('roamplan:tripSaved', onUpdate)
  }, [])

  if (!stats) return null

  const hasData = stats.tripsPlanned > 0

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-5 pb-4">
      {!hasData ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl border border-sky-500/15"
          style={{ background: 'rgba(14,165,233,0.04)' }}
        >
          <span className="text-base">✈️</span>
          <span className="text-sm text-white/40">Plan your first trip</span>
          <span className="text-sm text-sky-400 font-semibold">→</span>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STAT_CARDS.map((card, i) => {
            const raw = stats[card.key]
            const value = card.format(raw as number & string[])
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 py-3 px-4 rounded-2xl border border-white/[0.07] hover:border-sky-500/20 transition-all"
                style={{ background: 'rgba(6,22,34,0.7)', backdropFilter: 'blur(16px)' }}
              >
                <span className="text-xl shrink-0">{card.icon}</span>
                <div className="min-w-0">
                  <div className="text-base font-black text-sky-400 leading-none truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {value || '—'}
                  </div>
                  <div className="text-[11px] text-white/35 mt-0.5 truncate">{card.label}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Call this to persist a trip to localStorage and emit the update event. */
export function saveTripToStorage(destination: string, days: number) {
  if (typeof window === 'undefined') return
  const raw = localStorage.getItem('roamplan_trips')
  let trips: { destination: string; days: number }[] = []
  try { trips = raw ? JSON.parse(raw) : [] } catch { trips = [] }
  trips.push({ destination, days })
  localStorage.setItem('roamplan_trips', JSON.stringify(trips))
  window.dispatchEvent(new Event('roamplan:tripSaved'))
}
