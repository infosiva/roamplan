'use client'

/**
 * UpgradeButton — calls the existing /api/checkout Stripe route and redirects
 * to the hosted checkout session. Route + env vars already existed server-side
 * with no frontend caller; this is the missing button.
 */

import { useState } from 'react'
import { usePromo } from '@/hooks/usePromo'

const ACCENT = '#059669'

export default function UpgradeButton() {
  const { isUnlocked } = usePromo()
  const [loading, setLoading] = useState(false)

  if (isUnlocked) return null

  async function startCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={startCheckout}
      disabled={loading}
      className="rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60 transition-opacity"
      style={{ background: ACCENT }}
    >
      {loading ? 'Redirecting…' : 'Upgrade to Pro'}
    </button>
  )
}
