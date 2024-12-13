import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "9.99",
    description: "Perfect for individuals and small projects",
    features: [
      "10,000 words per month",
      "Basic SEO optimization",
      "5 projects",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "99.99",
    description: "Ideal for professionals and growing businesses",
    features: [
      "50,000 words per month",
      "Advanced SEO optimization",
      "Unlimited projects",
      "Priority support",
      "Custom templates",
      "Analytics dashboard",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "299.99",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited words",
      "Enterprise-grade SEO tools",
      "Custom AI training",
      "Dedicated account manager",
      "API access",
      "White-label options",
      "Advanced analytics",
    ],
  },
]

export function Pricing() {
  return (
    <section className="py-20 px-4">      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-400">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">
            Choose the perfect plan for your content needs
          </p>                      
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : '' } bg-slate-700 `}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full w-fit mb-4">
                    Most Popular
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}