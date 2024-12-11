export function About() {
    return (
    <section className="bg-slate-700 py-20 px-4 md:py-24 lg:py-32 justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-400">À propos de nous</h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Nous sommes passionnés par l'optimisation SEO et nous nous engageons à aider votre entreprise à atteindre son plein potentiel en ligne.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Notre Mission</h3>
                <p className="text-gray-400 dark:text-gray-400 text-muted-foreground">
                  Fournir des solutions SEO innovantes et efficaces qui permettent à nos clients de se démarquer dans le paysage numérique en constante évolution.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Notre Expertise</h3>
                <p className="text-gray-400 dark:text-gray-400 text-muted-foreground">
                  Avec des années d'expérience dans le domaine du SEO, nous combinons les meilleures pratiques et les dernières technologies pour optimiser votre présence en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }