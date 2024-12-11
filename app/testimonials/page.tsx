import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
            What our clients say
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-500">
            Discover how we've helped businesses improve their online presence and achieve their SEO goals.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute right-4 top-4 text-5xl font-serif text-indigo-200 opacity-40">"</div>
              <div className="relative">
                <p className="text-gray-500 line-clamp-4 min-h-[100px]">
                  {testimonial.content}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      fill
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-400">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm font-medium text-indigo-600">{testimonial.company}</p>
                  </div>
                </div>
                {testimonial.stats && (
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    {testimonial.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Solutions',
    content: 'The SEO optimization tools provided have been instrumental in improving our online visibility. We\'ve seen a 150% increase in organic traffic within just 3 months.',
    imageUrl: '/images/Focus4.png',
    stats: [
      { value: '150%', label: 'Traffic Increase' },
      { value: '3x', label: 'Conversion Rate' }
    ]
  },
  {
    name: 'Michael Chen',
    role: 'E-commerce Manager',
    company: 'Global Retail Inc',
    content: 'Outstanding results! The keyword analysis and content optimization features helped us target the right audience and significantly boost our conversion rates.',
    imageUrl: '/images/Focus1.png',
    stats: [
      { value: '200%', label: 'Revenue Growth' },
      { value: '45%', label: 'Bounce Rate Drop' }
    ]
  },
  {
    name: 'Emma Davis',
    role: 'Digital Strategist',
    company: 'Creative Agency Co',
    content: 'The technical SEO audits and recommendations were exactly what we needed. Our site\'s performance has improved dramatically, and we\'re now ranking for key terms.',
    imageUrl: '/images/Focus6.png',
    stats: [
      { value: 'Top 3', label: 'Search Rankings' },
      { value: '85%', label: 'Organic Traffic' }
    ]
  },
  {
    name: 'Alex Thompson',
    role: 'CEO',
    company: 'Startup Innovate',
    content: 'Implementing their SEO strategies transformed our online presence. The detailed analytics and regular reports helped us make data-driven decisions that really paid off.',
    imageUrl: '/images/Focus2.png',
    stats: [
      { value: '400%', label: 'ROI' },
      { value: '10x', label: 'Lead Generation' }
    ]
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Digital',
    company: 'Tech Solutions Pro',
    content: 'The AI-powered content suggestions have been a game-changer for our content strategy. We\'re now creating more relevant and engaging content that our audience loves.',
    imageUrl: '/images/Focus3.png',
    stats: [
      { value: '75%', label: 'Engagement Rate' },
      { value: '5x', label: 'Social Shares' }
    ]
  },
  {
    name: 'James Wilson',
    role: 'Marketing Manager',
    company: 'Growth Dynamics',
    content: 'Their enterprise-level SEO solutions perfectly matched our complex needs. The dedicated support team was always there to help us optimize our global web presence.',
    imageUrl: '/images/Focus5.png',
    stats: [
      { value: '90%', label: 'Market Coverage' },
      { value: '60%', label: 'Cost Reduction' }
    ]
  }
];

export default Testimonials;
