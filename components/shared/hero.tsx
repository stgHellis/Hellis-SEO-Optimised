import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold tracking-tight text-gray-400">
        Generate SEO-Optimized Content with AI
      </h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-[600px]">
        Create high-quality, SEO-friendly content in seconds using advanced AI technology.
        Perfect for blogs, articles, and marketing copy.
      </p>
      <div className="flex gap-4 mt-8">
      <Button size="lg" asChild>
          <a href="/register">Get Started</a>
        </Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </div>
    </div>
  )
}