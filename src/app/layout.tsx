import Script from 'next/script'
import type { Metadata } from 'next'
import './globals.css'
import SharedNavbar from '@/components/SharedNavbar'
import Footer from '../../components/Footer'
import DesignEffects from '@/components/DesignEffects'
import AnimatedBackground from '@/components/AnimatedBackground'
import CookieConsent from "../../components/CookieConsent";
import BackToTop from '@/components/BackToTop'
import StickyFooterCTA from "../../components/StickyFooterCTA";
import AuthButton from '../../components/AuthButton'
import AffiliateStrip from '../../components/AffiliateStrip'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
  description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
  keywords: ['travel planner', 'AI itinerary', 'trip planner', 'travel itinerary', 'holiday planner', 'AI travel', 'itinerary builder', 'personalised travel', 'AI trip planner'],
  metadataBase: new URL('https://roamplan.app'),
  openGraph: {
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RoamPlan',
    url: 'https://roamplan.app',
    images: [{ url: 'https://roamplan.app/og.png', width: 1200, height: 630, alt: 'RoamPlan — AI Travel Planner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
    images: ['https://roamplan.app/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://roamplan.app' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "RoamPlan",
            "url": "https://roamplan.app",
            "description": "Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.",
            "logo": "https://roamplan.app/icon.png",
            "sameAs": [
              "https://twitter.com/roamplanapp",
              "https://instagram.com/roamplanapp",
            ],
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Travel Planning",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Itinerary Generator" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hotel Recommendations" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Budget Travel Planning" } },
              ],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does RoamPlan AI travel planner work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tell RoamPlan your destination, travel dates, interests and budget. Our AI generates a complete day-by-day itinerary with hotels, restaurants, activities and local tips in under 60 seconds.",
                },
              },
              {
                "@type": "Question",
                "name": "Is RoamPlan free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — RoamPlan is free to use with no sign-up required. Generate up to 3 itineraries per day for free. Pro plans unlock unlimited trips and PDF export.",
                },
              },
              {
                "@type": "Question",
                "name": "How many destinations does RoamPlan support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RoamPlan supports 180+ destinations worldwide — from major cities like Paris, Tokyo, and New York to off-the-beaten-path gems.",
                },
              },
              {
                "@type": "Question",
                "name": "Can RoamPlan plan family trips with kids?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — RoamPlan has a dedicated family mode that adds kid-friendly activities, playgrounds, family dining, and age-appropriate pacing to your itinerary.",
                },
              },
            ],
          },
        ])}} />
      
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --theme-primary: #0ea5e9;
            --theme-secondary: #38bdf8;
            --theme-base: #020c14;
            --background: #020c14;
            --surface-1: #061622;
            --surface-2: #0a1e2e;
            --foreground: #f0f9ff;
            --text-2: #7dd3fc;
            --border-default: rgba(14,165,233,0.15);
            --border-strong: rgba(14,165,233,0.3);
          }
          body { font-family: 'Inter', system-ui, sans-serif !important; }
          h1, h2, h3 { font-family: 'Syne', sans-serif !important; letter-spacing: -0.03em; }
          .glass { background: rgba(2,12,20,0.7) !important; border-color: rgba(14,165,233,0.12) !important; }
        ` }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <AnimatedBackground />
        <div className="grain" aria-hidden />
        <DesignEffects />
        <SharedNavbar brand={brand} />
        <div style={{ position:"fixed", top:"10px", right:"16px", zIndex:60 }}><AuthButton /></div>
        <main className="flex-1 pt-16">{children}</main>
        <AffiliateStrip />
        <Footer siteName="RoamPlan" />
      <BackToTop accentColor="#0ea5e9" />
      <CookieConsent />
      <StickyFooterCTA />
        <Script defer data-domain="roamplan.app" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        <Script defer data-site="roamplan.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
