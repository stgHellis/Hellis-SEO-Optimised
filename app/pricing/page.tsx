import { Navbar } from '@/components/shared/navbar';
import React from 'react';

const Pricing = () => {
  return (
    <div>
      <Navbar />
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative cursor-pointer rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.featured ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 ring-2 ring-indigo-500' : 'bg-white'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                  Most Popular
                </span>
              )}
              <div className="relative">
                <h3 className={`text-2xl font-bold ${plan.featured ? 'text-white' : 'text-gray-400'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-4 text-sm ${plan.featured ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                <div className={`mt-6 flex items-baseline ${plan.featured ? 'text-white' : 'text-gray-400'}`}>
                  {plan.price === 'Custom' ? (
                    <span className="text-4xl font-bold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
                      <span className="ml-1 text-sm font-semibold">/month</span>
                    </>
                  )}
                </div>
                <ul role="list" className={`mt-8 space-y-3 ${plan.featured ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-3">
                      <svg
                        className={`h-6 w-5 flex-none ${plan.featured ? 'text-indigo-200' : 'text-indigo-600'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 ${
                    plan.featured
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  Get started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const plans = [
  {
    name: 'Starter',
    price: '9.99',
    description: 'Perfect for individuals and small projects getting started with SEO.',
    featured: false,
    features: [
      'Basic keyword research',
      'Monthly SEO report',
      'Up to 3 pages optimization',
      'Basic technical audit',
      'Email support',
    ],
  },
  {
    name: 'Basic',
    price: '29',
    description: 'Great for small businesses looking to improve their online presence.',
    featured: false,
    features: [
      'Advanced keyword research',
      'Monthly SEO reports',
      'Up to 10 pages optimization',
      'Technical SEO audit',
      'Basic competitor analysis',
      'Priority email support',
    ],
  },
  {
    name: 'Professional',
    price: '99.99',
    description: 'Ideal for growing businesses and e-commerce sites.',
    featured: true,
    features: [
      'Comprehensive keyword strategy',
      'Weekly SEO reports',
      'Up to 25 pages optimization',
      'Advanced technical SEO audit',
      'Competitor tracking',
      'Content optimization',
      '24/7 priority support',
    ],
  },
  {
    name: 'Premium',
    price: '199.99',
    description: 'Perfect for larger businesses with complex SEO needs.',
    featured: false,
    features: [
      'Custom keyword strategy',
      'Daily SEO reports',
      'Up to 50 pages optimization',
      'Advanced technical solutions',
      'AI-powered suggestions',
      'Dedicated support manager',
      'Monthly strategy calls',
    ],
  },
  {
    name: 'Enterprise',
    price: '299.99',
    description: 'For large organizations requiring comprehensive SEO solutions.',
    featured: false,
    features: [
      'Enterprise-level strategy',
      'Real-time SEO monitoring',
      'Unlimited page optimization',
      'Custom integrations',
      'Advanced AI features',
      'Dedicated team',
      'Weekly strategy meetings',
      'Custom reporting',
    ],
  },
  {
    name: 'Ultra',
    price: 'Custom',
    description: 'Tailored solutions for organizations with specific high-volume needs.',
    featured: false,
    features: [
      'Fully customized strategy',
      'Custom SLA agreement',
      'Unlimited everything',
      'Custom API access',
      'White-label options',
      'Dedicated development team',
      'On-site support available',
      'Executive reporting',
    ],
  },
];

export default Pricing;
