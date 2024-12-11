import { Button } from '@/components/ui/button'
import { Hero } from '@/components/shared/hero'
import { Features } from '@/components/shared/features'
import { Pricing } from '@/components/shared/pricing'
import { Testimonials } from '@/components/shared/testimonials'
import { About } from '@/components/shared/about'
import FAQ from '@/components/shared/faq'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <About />
      <FAQ />
    </main>
  )
}
