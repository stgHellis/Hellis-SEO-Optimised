import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Hero section */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">About Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Your Digital Success
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are passionate about helping businesses succeed in the digital world through effective SEO strategies and cutting-edge optimization techniques.
            </p>
          </div>

          {/* Mission section */}
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Mission</h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission is to democratize SEO by making professional optimization tools and strategies accessible to businesses of all sizes. We believe that every business deserves to be discovered online.
            </p>
          </div>

          {/* Values section */}
          <div className="mx-auto mt-16 max-w-7xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Values</h3>
            <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <div className="absolute left-1 top-1 h-5 w-5 text-indigo-600">
                      {value.icon}
                    </div>
                    {value.name}
                  </dt>
                  <dd className="inline ml-1">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Team section */}
          <div className="mx-auto mt-16 max-w-7xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Team</h3>
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {team.map((person) => (
                <div key={person.name} className="flex flex-col items-start">
                  <div className="relative h-56 w-full overflow-hidden rounded-lg">
                    <Image
                      src={person.imageUrl}
                      alt={person.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-gray-900">{person.name}</h4>
                  <p className="text-sm text-gray-600">{person.role}</p>
                  <p className="mt-2 text-sm text-gray-500">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const values = [
  {
    name: 'Innovation',
    description: 'We constantly evolve our tools and strategies to stay ahead of SEO trends.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    name: 'Transparency',
    description: 'We believe in clear communication and measurable results.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: 'Excellence',
    description: 'We strive for excellence in everything we do.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    bio: 'With over 15 years of experience in digital marketing and SEO.',
    imageUrl: '/team/person1.jpg',
  },
  {
    name: 'Lisa Chen',
    role: 'Head of SEO Strategy',
    bio: 'Expert in technical SEO and content optimization.',
    imageUrl: '/team/person2.jpg',
  },
  {
    name: 'Mark Johnson',
    role: 'Technical Lead',
    bio: 'Specializes in SEO tools development and automation.',
    imageUrl: '/team/person3.jpg',
  },
];

export default About;
