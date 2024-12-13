import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/shared/navbar'

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-6 lg:px-8 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] text-center w-full max-w-7xl mx-auto py-8 md:py-12 lg:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-400">
            Generate SEO-Optimized Content with AI
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-[90%] md:max-w-[80%] lg:max-w-[600px]">
            Create high-quality, SEO-friendly content in seconds using advanced AI technology.
            Perfect for blogs, articles, and marketing copy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="/register">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}