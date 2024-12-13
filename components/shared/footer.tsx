import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl text-gray-400 font-bold mb-4">Hellis SEO</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs">
              AI-powered SEO content generation for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="text-lg text-gray-400 font-bold mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/features" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg text-gray-400 font-bold mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg text-gray-400 font-bold mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/privacy" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm sm:text-base text-gray-500 hover:text-gray-400 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-gray-500">
            2024 Hellis SEO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}