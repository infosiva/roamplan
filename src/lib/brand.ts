import type { BrandConfig } from '@/components/SharedNavbar'

export const brand: BrandConfig = {
  name: 'RoamPlan',
  tagline: 'AI Travel Planner — Your Trip, Designed by AI',
  icon: '✈️',
  color: '#0ea5e9',
  url: 'https://roamplan.app',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Plan Trip', href: '/#planner' },
    { label: 'Destinations', href: '/#destinations' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/about' },
  ],
  cta: { label: 'Plan My Trip Free', href: '/#planner' },
}
