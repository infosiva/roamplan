'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export interface NavLink { label: string; href: string; external?: boolean }
export interface BrandConfig {
  name: string; tagline: string; icon: string; color: string; url: string
  navLinks?: NavLink[]; cta?: { label: string; href: string }
}

export default function SharedNavbar({ brand }: { brand: BrandConfig }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = brand.navLinks ?? []
  const cta = brand.cta ?? { label: 'Try Free', href: '/' }

  return (
    <nav style={{ '--accent': brand.color } as React.CSSProperties}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#07060f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </span>
          <span className="font-black text-[17px] tracking-tight" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
            Roam<span style={{ color: '#059669' }}>Plan</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              target={l.external ? '_blank' : undefined}
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all">
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={cta.href}
            className="px-4 py-2 text-sm font-semibold rounded-full text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: brand.color }}>
            {cta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#07060f]/95 backdrop-blur-xl border-b border-white/[0.06] animate-[slideDown_0.2s_ease]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all">
                {l.label}
              </Link>
            ))}
            <Link href={cta.href} onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 text-sm font-semibold rounded-full text-white text-center transition-all"
              style={{ background: brand.color }}>
              {cta.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
