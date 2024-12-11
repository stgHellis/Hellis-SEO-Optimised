import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sparkles, Target, Zap, Globe } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Content',
    description: 'Generate unique content using advanced AI technology',
    icon: Sparkles,
  },
  {
    title: 'SEO Optimization',
    description: 'Automatically optimized for search engines',
    icon: Target,
  },
  {
    title: 'Lightning Fast',
    description: 'Generate content in seconds, not hours',
    icon: Zap,
  },
  {
    title: 'Multiple Languages',
    description: 'Support for multiple languages and regions',
    icon: Globe,
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-400">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-slate-700">
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}