import Script from 'next/script'
import type { Metadata } from 'next'
import './globals.css'
import SharedNavbar from '@/components/SharedNavbar'
import ChatBot from '@/components/ChatBot'
import FeedbackWidget from '@/components/FeedbackWidget'
import Footer from '../../components/Footer'
import DesignEffects from '@/components/DesignEffects'
import AnimatedBackground from '@/components/AnimatedBackground'
import CookieConsent from "../../components/CookieConsent"
import BackToTop from '@/components/BackToTop'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import AuthButton from '../../components/AuthButton'
import AffiliateStrip from '../../components/AffiliateStrip'
import { brand } from '@/lib/brand'
import { getSiteFlags } from '@/lib/flags'
import { loadSiteTheme, buildThemeStyleTag, buildGa4Snippet, isWidgetHidden } from '@/lib/theme-loader'

import { MotionProvider } from "@infosiva/shared-ui/modern";
export const metadata: Metadata = {
  title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
  description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for any destination.',
  keywords: ['travel planner', 'AI itinerary', 'trip planner', 'travel itinerary', 'holiday planner', 'AI travel', 'itinerary builder', 'personalised travel', 'AI trip planner'],
  metadataBase: new URL('https://roamplan.app'),
  openGraph: {
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for any destination.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RoamPlan',
    url: 'https://roamplan.app',
    images: [{ url: 'https://roamplan.app/og.png', width: 1200, height: 630, alt: 'RoamPlan — AI Travel Planner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for any destination.',
    images: ['https://roamplan.app/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://roamplan.app' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [flags, theme] = await Promise.all([
    getSiteFlags('roamplan'),
    loadSiteTheme('roamplan'),
  ])

  const themeCSS = buildThemeStyleTag(theme, {
    background: '#ecfeff',
    primary: '#0e7490',
    secondary: '#22d3ee',
  })

  const ga4 = buildGa4Snippet(theme)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "RoamPlan",
            "url": "https://roamplan.app",
            "description": "Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for any destination.",
            "logo": "https://roamplan.app/icon.png",
            "sameAs": ["https://twitter.com/roamplanapp", "https://instagram.com/roamplanapp"],
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
              { "@type": "Question", "name": "How does RoamPlan AI travel planner work?", "acceptedAnswer": { "@type": "Answer", "text": "Tell RoamPlan your destination, travel dates, interests and budget. Our AI generates a complete day-by-day itinerary with hotels, restaurants, activities and local tips in under 60 seconds." } },
              { "@type": "Question", "name": "Is RoamPlan free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — RoamPlan is free to use with no sign-up required. Generate up to 3 itineraries per day for free. Pro plans unlock unlimited trips and PDF export." } },
              { "@type": "Question", "name": "How many destinations does RoamPlan support?", "acceptedAnswer": { "@type": "Answer", "text": "RoamPlan can plan trips to destinations worldwide — from major cities like Paris, Tokyo, and New York to off-the-beaten-path gems." } },
              { "@type": "Question", "name": "Can RoamPlan plan family trips with kids?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — RoamPlan has a dedicated family mode that adds kid-friendly activities, playgrounds, family dining, and age-appropriate pacing to your itinerary." } },
            ],
          },
        ])}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --theme-primary: #0e7490;
            --theme-secondary: #22d3ee;
            --theme-base: #ecfeff;
            --background: #ecfeff;
            --surface-1: #ffffff;
            --surface-2: #cffafe;
            --foreground: #0f172a;
            --text-2: #475569;
            --border-default: rgba(14,116,144,0.15);
            --border-strong: rgba(14,116,144,0.30);
          }
          body { font-family: 'Inter', system-ui, sans-serif !important; }
          h1, h2, h3 { font-family: 'Syne', sans-serif !important; letter-spacing: -0.03em; }
          .glass { background: rgba(255,255,255,0.80) !important; border-color: rgba(14,116,144,0.12) !important; }
          ${themeCSS}
        ` }} />
        {ga4 && <script async src={`https://www.googletagmanager.com/gtag/js?id=${theme?.analytics?.ga4Id}`} />}
        {ga4 && <script dangerouslySetInnerHTML={{ __html: ga4 }} />}
      </head>
      <body className="flex flex-col min-h-screen">
        <AnimatedBackground />
        <div className="grain" aria-hidden />
        <DesignEffects />
        <SharedNavbar brand={brand} />
        <div className="fixed top-2.5 right-[72px] md:right-4 z-[60]"><AuthButton /></div>
        <main className="flex-1 pt-16"><MotionProvider>{children}</MotionProvider></main>
        <AffiliateStrip />
        <Footer siteName="RoamPlan" />
        {flags.chatbot && !isWidgetHidden(theme, 'chatbot') && <ChatBot />}
        {!isWidgetHidden(theme, 'backToTop') && <BackToTop accentColor="#0e7490" />}
        {!isWidgetHidden(theme, 'cookieConsent') && <CookieConsent />}
        <Script defer data-domain="roamplan.app" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        <FeedbackWidget siteName="RoamPlan" accentColor="#0e7490" position="left" />
        <FloatingChatWrapper />
      </body>
    </html>
  )
}
