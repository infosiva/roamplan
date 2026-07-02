'use client'
// Gamma-style fullscreen prompt hero for roamplan.
// User types natural language → AI parses destination/duration/budget → generates itinerary.

import { useState } from 'react'
import GammaPromptCard from './GammaPromptCard'

type ItineraryDay = {
  day: number; theme: string; morning: { activity: string; description: string; duration: string }
  afternoon: { activity: string; description: string; duration: string }
  evening: { activity: string; description: string; duration: string }
}

type Itinerary = {
  destination: string; duration: number; overview: string
  budget_estimate: string; days: ItineraryDay[]
}

const SUGGESTIONS = [
  '5 days in Tokyo, solo, mid-range budget, culture + food',
  'Weekend trip to Paris for two, romantic, luxury',
  '10 days backpacking Southeast Asia, budget traveller',
  'Family trip to Bali, 7 days, kids ages 5 and 8',
  '2 weeks in Portugal, digital nomad, mix of work + explore',
]

export default function GammaHero() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [error, setError] = useState('')

  async function handlePrompt(prompt: string) {
    setError('')
    setItinerary(null)

    // Parse prompt into structured fields via AI
    const parseRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        systemPrompt: `Extract travel intent from user message. Return ONLY valid JSON:
{"destination":"city, country","duration":N,"budget":"budget|mid-range|luxury","travel_style":"cultural|adventure|relaxation|mixed","interests":["food","culture"],"travel_with":"Solo"}
If unclear, use sensible defaults. duration default 5, budget default "mid-range".`,
      }),
    })

    let parsed: Record<string, unknown> = {
      destination: prompt, duration: 5, budget: 'mid-range',
      travel_style: 'mixed', interests: ['sightseeing', 'food'], travel_with: 'Solo',
    }

    if (parseRes.ok) {
      try {
        const text = await parseRes.text()
        const json = text.match(/\{[\s\S]*\}/)
        if (json) parsed = { ...parsed, ...JSON.parse(json[0]) }
      } catch { /* use defaults */ }
    }

    // Generate full itinerary with parsed fields
    const genRes = await fetch('/api/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })

    if (!genRes.ok) {
      setError('Generation failed — try again')
      return
    }

    const data = await genRes.json()
    if (data.itinerary) setItinerary(data.itinerary)
    else if (data.error) setError(data.error)
  }

  return (
    <GammaPromptCard
      label="RoamPlan"
      labelBadge="AI"
      placeholder="Plan a 7-day trip to Japan in spring, solo traveller, mid-range budget, love food and temples..."
      onSubmit={handlePrompt}
      bgImage="/hero-bg.png"
      bgGradient="linear-gradient(135deg, #052e16 0%, #0f2a1a 50%, #0a1628 100%)"
      accentColor="#059669"
      suggestions={SUGGESTIONS}
      outputSlot={
        error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">{error}</div>
        ) : itinerary ? (
          <ItineraryOutput itinerary={itinerary} />
        ) : null
      }
    />
  )
}

function ItineraryOutput({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'rgba(255,255,255,0.96)' }}>
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">{itinerary.destination}</h2>
        <p className="text-gray-500 text-sm mt-1">{itinerary.duration} days · {itinerary.budget_estimate}</p>
        <p className="text-gray-700 mt-3 text-sm leading-relaxed">{itinerary.overview}</p>
      </div>
      <div className="divide-y divide-gray-50">
        {(itinerary.days || []).slice(0, 3).map(day => (
          <div key={day.day} className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{day.day}</span>
              <span className="font-semibold text-gray-800 text-sm">{day.theme}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
              <div><span className="font-medium text-gray-400 block mb-1">Morning</span>{day.morning?.activity}</div>
              <div><span className="font-medium text-gray-400 block mb-1">Afternoon</span>{day.afternoon?.activity}</div>
              <div><span className="font-medium text-gray-400 block mb-1">Evening</span>{day.evening?.activity}</div>
            </div>
          </div>
        ))}
        {itinerary.days?.length > 3 && (
          <div className="p-4 text-center text-sm text-emerald-600">
            + {itinerary.days.length - 3} more days — <a href="/plan" className="underline">view full plan</a>
          </div>
        )}
      </div>
    </div>
  )
}
