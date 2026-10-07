/**
 * site.config.ts — RoamPlan brand + content configuration
 * All user-facing text, features, destinations, and testimonials live here.
 * Import from page.tsx / layout.tsx / components so nothing is hardcoded.
 */

export const siteConfig = {
  name: 'RoamPlan',
  siteName: 'RoamPlan',
  tagline: 'Full itinerary in 60 seconds, not hours',
  subTagline: 'Wanderlog still needs manual input. RoamPlan generates day-by-day plans, hotel picks, and budget breakdowns from a single prompt.',
  description: 'Wanderlog still needs manual input. RoamPlan generates day-by-day plans, hotel picks, and budget breakdowns from a single prompt.',
  url: 'https://roamplan.app',
  primaryColor: '#0ea5e9',
  icon: '✈️',
  accentColor: '#0ea5e9',

  meta: {
    title: 'RoamPlan — Full AI Itinerary in 60 Seconds',
    description: 'Get a day-by-day itinerary, hotel picks, and budget breakdown for Any destination — generated instantly from one prompt.',
    ogTitle: 'RoamPlan — Full AI Itinerary in 60 Seconds',
    ogDescription: 'Get a day-by-day itinerary, hotel picks, and budget breakdown for Any destination — generated instantly from one prompt.',
  },

  seo: {
    title: 'RoamPlan — Full AI Itinerary in 60 Seconds',
    description: 'Get a day-by-day itinerary, hotel picks, and budget breakdown for Any destination — generated instantly from one prompt.',
  },

  nav: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Plan Trip', href: '/#planner' },
      { label: 'Destinations', href: '/#destinations' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Plan my trip now', href: '/#planner' },
  },

  chatbot: {
    botName: 'RoamBot',
    openingMessage: 'Where are you headed? Drop a destination and I\'ll build your full itinerary — days, hotels, budget.',
    apiEndpoint: '/api/chat',
    systemPrompt: `You are RoamBot, the AI travel assistant for RoamPlan — an AI-powered travel planner.
Help users plan trips, suggest destinations, explain itinerary items, give travel tips, visa info, and budgeting advice.
Be enthusiastic, concise, and practical. Help them get the most from their trip.`,
  },

  features: [
    {
      icon: '🗺️',
      title: 'Day-by-Day Itineraries',
      desc: 'AI builds a complete morning–afternoon–evening plan for every day of your trip.',
    },
    {
      icon: '🏨',
      title: 'Hotel Recommendations',
      desc: 'Curated accommodation picks matched to your budget and travel style.',
    },
    {
      icon: '🌤',
      title: 'Live Weather Forecast',
      desc: '3-day weather preview for your destination so you can pack right.',
    },
    {
      icon: '🧒',
      title: 'Family & Kids Mode',
      desc: 'Kid-friendly spots, playgrounds, family dining, and age-appropriate pacing.',
    },
    {
      icon: '💰',
      title: 'Budget Breakdown',
      desc: 'Estimated costs per activity so you never get surprised.',
    },
    {
      icon: '📄',
      title: 'Print to PDF',
      desc: 'Export your full itinerary as a print-ready PDF to use offline.',
    },
  ],

  destinations: [
    { city: 'Bali',      emoji: '🌴', tag: 'Tropical',  gradient: 'from-[#0c4a6e] via-[#0e7490] to-[#ea580c]' },
    { city: 'Paris',     emoji: '🗼', tag: 'Romance',   gradient: 'from-[#7c2d12] via-[#c2410c] to-[#b45309]' },
    { city: 'Tokyo',     emoji: '⛩️',  tag: 'Culture',   gradient: 'from-[#831843] via-[#be185d] to-[#c2410c]' },
    { city: 'New York',  emoji: '🗽', tag: 'Urban',     gradient: 'from-[#0c4a6e] via-[#1e40af] to-[#ea580c]' },
    { city: 'Santorini', emoji: '🏛️', tag: 'Scenic',    gradient: 'from-[#1e3a5f] via-[#0369a1] to-[#f97316]' },
    { city: 'Kyoto',     emoji: '🌸', tag: 'Heritage',  gradient: 'from-[#4a1d96] via-[#7e22ce] to-[#c2410c]' },
    { city: 'Maldives',  emoji: '🐠', tag: 'Luxury',    gradient: 'from-[#064e3b] via-[#0891b2] to-[#f97316]' },
    { city: 'Safari',    emoji: '🦁', tag: 'Adventure', gradient: 'from-[#451a03] via-[#92400e] to-[#1a2e1a]' },
  ],

  testimonials: [] as { name: string; location: string; text: string; rating: number; destination: string }[], // removed: unverified quotes

  stats: [] as { stat: string; label: string }[], // removed: unverifiable counts

  // Stats object form for layout/about pages
  statsObj: { trips: '', destinations: '', travellers: '' },

  social: {
    twitter: 'https://twitter.com/roamplanapp',
    instagram: 'https://instagram.com/roamplanapp',
  },
}

export type SiteConfig = typeof siteConfig
export default siteConfig
