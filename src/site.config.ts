/**
 * site.config.ts — RoamPlan brand + content configuration
 * All user-facing text, features, destinations, and testimonials live here.
 * Import from page.tsx / layout.tsx / components so nothing is hardcoded.
 */

export const siteConfig = {
  name: 'RoamPlan',
  siteName: 'RoamPlan',
  tagline: 'AI Travel Planner — Your Trip, Designed by AI',
  subTagline: 'Plan your perfect trip with AI. Itineraries, flights, hotels, and local tips — all in one place.',
  description: 'Plan your perfect trip with AI. Itineraries, flights, hotels, and local tips — all in one place.',
  url: 'https://roamplan.app',
  primaryColor: '#0ea5e9',
  icon: '✈️',
  accentColor: '#0ea5e9',

  meta: {
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
    ogTitle: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    ogDescription: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
  },

  seo: {
    title: 'RoamPlan — AI Travel Planner & Itinerary Generator',
    description: 'Plan your perfect trip with AI. Custom itineraries, hotel picks, and local tips for 180+ destinations.',
  },

  nav: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Plan Trip', href: '/#planner' },
      { label: 'Destinations', href: '/#destinations' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Plan My Trip Free', href: '/#planner' },
  },

  chatbot: {
    botName: 'RoamBot',
    openingMessage: 'Hi! 🌍 Where do you want to travel? Tell me your destination and I\'ll plan your trip.',
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

  testimonials: [
    {
      name: 'Sarah K.',
      location: 'London, UK',
      text: 'Planned my entire 10-day Japan trip in under 5 minutes. The day-by-day breakdown was incredibly detailed — better than anything a travel agent quoted me for £200.',
      rating: 5,
      destination: 'Japan',
    },
    {
      name: 'Marco D.',
      location: 'Milan, Italy',
      text: 'Used it for a family trip to Bali with two kids. The family mode added playground stops, kids menus, and nap times into the schedule. Brilliant.',
      rating: 5,
      destination: 'Bali',
    },
    {
      name: 'Aiko T.',
      location: 'Singapore',
      text: 'The budget breakdown was spot-on. We were on a tight budget and it found us amazing local spots instead of tourist traps.',
      rating: 5,
      destination: 'Thailand',
    },
  ],

  stats: [
    { stat: '31,000+', label: 'Trips planned' },
    { stat: '180+',    label: 'Destinations worldwide' },
    { stat: '14,200+', label: 'Happy travellers' },
  ],

  // Stats object form for layout/about pages
  statsObj: {
    trips: '31,000+',
    destinations: '180+',
    travellers: '14,200+',
  },

  social: {
    twitter: 'https://twitter.com/roamplanapp',
    instagram: 'https://instagram.com/roamplanapp',
  },
}

export type SiteConfig = typeof siteConfig
export default siteConfig
