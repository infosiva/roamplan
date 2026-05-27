'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingChatWrapper() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hey! I'm your AI travel companion. Tell me where you want to go and I'll build your perfect itinerary ✈️" },
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
                <div
                  key={i}
                  style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'rgba(14,165,233,0.18)' : 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: 12, fontSize: 12, color: 'rgba(240,249,255,0.85)', maxWidth: '88%', lineHeight: '1.5' }}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: 12, display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} className="typing-dot" style={{ background: 'rgba(14,165,233,0.6)' }} />
                  ))}
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
