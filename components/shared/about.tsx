export function About() {
    return (
      <section className="bg-slate-700 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-400">
                À propos de nous
              </h2>
              <p className="mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[700px] text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                Nous sommes passionnés par l'optimisation SEO et nous nous engageons à aider votre entreprise à atteindre son plein potentiel en ligne.
              </p>
            </div>
            
            <div className="grid w-full max-w-5xl gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 px-4 sm:px-6">
              <div className="space-y-4 bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-300">
                  Notre Mission
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                  Fournir des solutions SEO innovantes et efficaces qui permettent à nos clients de se démarquer dans le paysage numérique en constante évolution.
                </p>
              </div>
              
              <div className="space-y-4 bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-300">
                  Notre Expertise
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                  Avec des années d'expérience dans le domaine du SEO, nous combinons les meilleures pratiques et les dernières technologies pour optimiser votre présence en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }