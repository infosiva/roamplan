import GammaHero from '@/components/GammaHero'
import SectionsClient from '@/components/SectionsClient'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import TripDashboard from '@/components/TripDashboard'

export default function Home() {
  return (
    <div className="min-h-screen relative" style={{ background: 'var(--theme-base, #f0fdf4)', color: 'var(--foreground, #0f172a)' }}>
      <GammaHero />
      <TripDashboard />
      <SectionsClient />
      <FloatingChatWrapper />
    </div>
  )
}
