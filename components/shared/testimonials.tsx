import Image from 'next/image'

const testimonials = [
  {
    content: "Copymate a révolutionné notre stratégie de contenu. Nous produisons maintenant 3 fois plus d'articles optimisés SEO en moitié moins de temps.",
    author: "Marie Dubois",
    role: "Responsable Marketing, TechStart",
    image: "/images/Focus4.png"
  },
  {
    content: "L'intégration WordPress est un vrai plus. Je peux générer et publier du contenu de qualité en quelques clics. Un gain de temps incroyable !",
    author: "Thomas Martin",
    role: "Blogueur Professionnel",
    image: "/images/Focus1.png"
  },
  {
    content: "Les suggestions SEO sont pertinentes et nous ont permis d'améliorer significativement notre visibilité sur Google. Un outil indispensable.",
    author: "Sophie Laurent",
    role: "CEO, Digital Solutions",
    image: "/images/Focus6.png"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-400">Ce que disent nos clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="py-20 px-4 bg-slate-700 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-400 text-sm md:text-base mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="relative w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{testimonial.author}</h4>
                  <p className="text-xs md:text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// import Image from 'next/image'

// const testimonials = [
//   {
//     content: "Copymate a révolutionné notre stratégie de contenu. Nous produisons maintenant 3 fois plus d'articles optimisés SEO en moitié moins de temps.",
//     author: "Marie Dubois",
//     role: "Responsable Marketing, TechStart",
//     image: "/testimonials/avatar1.jpg"
//   },
//   {
//     content: "L'intégration WordPress est un vrai plus. Je peux générer et publier du contenu de qualité en quelques clics. Un gain de temps incroyable !",
//     author: "Thomas Martin",
//     role: "Blogueur Professionnel",
//     image: "/testimonials/avatar2.jpg"
//   },
//   {
//     content: "Les suggestions SEO sont pertinentes et nous ont permis d'améliorer significativement notre visibilité sur Google. Un outil indispensable.",
//     author: "Sophie Laurent",
//     role: "CEO, Digital Solutions",
//     image: "/testimonials/avatar3.jpg"
//   }
// ]

// export function Testimonials() {
//   return (
//     <section className="py-24 bg-gray-50">
//       <div className="container px-4 mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12">Ce que disent nos clients</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div 
//               key={index} 
//               className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//             >
//               <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
//               <div className="flex items-center">
//                 <div className="relative w-12 h-12 mr-4">
//                   <Image
//                     src={testimonial.image}
//                     alt={testimonial.author}
//                     fill
//                     className="rounded-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{testimonial.author}</h4>
//                   <p className="text-sm text-gray-500">{testimonial.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }