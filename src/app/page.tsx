import HeroSection from '@/components/HeroSection'
import SectionsClient from '@/components/SectionsClient'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'

export default function Home() {
  return (
    <div className="min-h-screen text-white relative" style={{ background: 'var(--theme-base, #020c14)' }}>
      <HeroSection />
      <SectionsClient />
      <FloatingChatWrapper />
    </div>
  )
}
