'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Comment fonctionne la génération de contenu en masse ?",
    answer: "Notre système utilise une IA avancée pour générer plusieurs articles simultanément. Vous n'avez qu'à fournir les sujets et mots-clés, et notre algorithme crée du contenu unique et pertinent, optimisé pour le SEO."
  },
  {
    question: "L'intégration avec WordPress est-elle compliquée ?",
    answer: "Non, l'intégration est très simple. Il suffit de connecter votre site WordPress une fois, et vous pourrez ensuite publier directement depuis notre plateforme. Nous prenons en charge la mise en forme et les métadonnées automatiquement."
  },
  {
    question: "Comment Copymate optimise-t-il le contenu pour le SEO ?",
    answer: "Copymate analyse les tendances de recherche, la densité des mots-clés et la structure du contenu. Nous optimisons automatiquement les titres, les méta-descriptions et la structure des articles pour maximiser leur visibilité sur les moteurs de recherche."
  },
  {
    question: "Puis-je personnaliser le style et le ton des articles générés ?",
    answer: "Absolument ! Vous pouvez définir le ton (professionnel, décontracté, académique), la longueur et le style de vos articles. Notre système s'adapte à vos préférences tout en maintenant la qualité SEO."
  },
  {
    question: "Y a-t-il une limite au nombre d'articles que je peux générer ?",
    answer: "Non, il n'y a pas de limite stricte. Cependant, chaque forfait a un quota mensuel recommandé pour garantir la meilleure qualité possible. Vous pouvez générer des articles supplémentaires selon vos besoins."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-400">Questions Fréquentes</h2>
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                className="flex justify-between items-center w-full p-4 md:p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-sm md:text-lg pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 'use client'

// import { useState } from 'react'
// import { ChevronDown } from 'lucide-react'

// const faqs = [
//   {
//     question: "Comment fonctionne la génération de contenu en masse ?",
//     answer: "Notre système utilise une IA avancée pour générer plusieurs articles simultanément. Vous n'avez qu'à fournir les sujets et mots-clés, et notre algorithme crée du contenu unique et pertinent, optimisé pour le SEO."
//   },
//   {
//     question: "L'intégration avec WordPress est-elle compliquée ?",
//     answer: "Non, l'intégration est très simple. Il suffit de connecter votre site WordPress une fois, et vous pourrez ensuite publier directement depuis notre plateforme. Nous prenons en charge la mise en forme et les métadonnées automatiquement."
//   },
//   {
//     question: "Comment Copymate optimise-t-il le contenu pour le SEO ?",
//     answer: "Copymate analyse les tendances de recherche, la densité des mots-clés et la structure du contenu. Nous optimisons automatiquement les titres, les méta-descriptions et la structure des articles pour maximiser leur visibilité sur les moteurs de recherche."
//   },
//   {
//     question: "Puis-je personnaliser le style et le ton des articles générés ?",
//     answer: "Absolument ! Vous pouvez définir le ton (professionnel, décontracté, académique), la longueur et le style de vos articles. Notre système s'adapte à vos préférences tout en maintenant la qualité SEO."
//   },
//   {
//     question: "Y a-t-il une limite au nombre d'articles que je peux générer ?",
//     answer: "Non, il n'y a pas de limite stricte. Cependant, chaque forfait a un quota mensuel recommandé pour garantir la meilleure qualité possible. Vous pouvez générer des articles supplémentaires selon vos besoins."
//   }
// ]

// export function FAQ() {
//   const [openIndex, setOpenIndex] = useState<number | null>(null)

//   return (
//     <section className="py-24 bg-white">
//       <div className="container px-4 mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12">Questions Fréquentes</h2>
//         <div className="max-w-3xl mx-auto space-y-4">
//           {faqs.map((faq, index) => (
//             <div key={index} className="border rounded-lg">
//               <button
//                 className="flex justify-between items-center w-full p-6 text-left"
//                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
//               >
//                 <span className="font-semibold text-lg">{faq.question}</span>
//                 <ChevronDown 
//                   className={`w-5 h-5 transition-transform ${
//                     openIndex === index ? 'transform rotate-180' : ''
//                   }`}
//                 />
//               </button>
//               {openIndex === index && (
//                 <div className="px-6 pb-6">
//                   <p className="text-gray-600">{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }