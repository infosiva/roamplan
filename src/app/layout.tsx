import Script from 'next/script'
import type { Metadata } from 'next'
import './globals.css'
import SharedNavbar from '@/components/SharedNavbar'
import Footer from '../../components/Footer'
import DesignEffects from '@/components/DesignEffects'
import AnimatedBackground from '@/components/AnimatedBackground'
import ChatBot from '@/components/ChatBot'
import type { BrandConfig } from '@/components/SharedNavbar'
import CookieConsent from "../../components/CookieConsent";

export const brand: BrandConfig = {
  name: 'RoamPlan',
  tagline: 'AI travel planner — personalised day-by-day itineraries for any destination.',
  icon: '✈️',
  color: '#f97316',
  url: 'https://roamplan.app',
  navLinks: [{ label: 'Plan trip', href: '/' }, { label: 'Pricing', href: '#pricing' }],
  cta: { label: 'Plan free →', href: '#planner' },
}

export const metadata: Metadata = {
  title: 'RoamPlan — AI Travel Itinerary Planner',
  description: 'Generate personalised day-by-day travel itineraries in seconds. AI travel planner for any budget, duration and destination.',
  keywords: ['travel planner', 'AI itinerary', 'trip planner', 'travel itinerary', 'holiday planner'],
  openGraph: { title: 'RoamPlan — AI Travel Planner', description: 'Personalised travel itineraries in seconds.', type: 'website', locale: 'en_GB', siteName: 'RoamPlan' },
  twitter: { card: 'summary_large_image', title: 'RoamPlan', description: 'AI travel itinerary planner.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "SoftwareApplication",
          "name": "RoamPlan", "url": brand.url, "description": brand.tagline,
          "applicationCategory": "TravelApplication", "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
        })}} />
      
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --theme-primary: #ea580c;
            --theme-secondary: #f97316;
            --theme-base: #0c0702;
            --background: #0c0702;
            --surface-1: #1a0e05;
            --surface-2: #261508;
            --foreground: #fff7ed;
            --text-2: #fdba74;
            --border-default: rgba(234,88,12,0.15);
            --border-strong: rgba(234,88,12,0.3);
          }
          body { font-family: 'Inter', system-ui, sans-serif !important; }
          h1, h2, h3 { font-family: 'Syne', sans-serif !important; letter-spacing: -0.03em; }
          .glass { background: rgba(12,7,2,0.7) !important; border-color: rgba(234,88,12,0.12) !important; }
        ` }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <AnimatedBackground />
        <DesignEffects />
        <SharedNavbar brand={brand} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer siteName="RoamPlan" />
        <ChatBot />
      <CookieConsent />
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script src="http://31.97.56.148:3098/t.js" data-site="roamplan.app" defer></script>
            <Script async src="http://31.97.56.148:3100/script.js" data-website-id="b6e28310-c2f4-4fed-a4e3-46dd4a3f4625" strategy="afterInteractive" />
      </body>
    </html>
  )
}
