import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-4 mt-4">
        <div className="flex justify-center items-center">
        <div className="w-1/4">
            <Link href="/" className="text-xl font-bold text-gray-400">
              Hellis SEO
            </Link>
          </div>
          <div className="flex space-x-4 justify-center w-2/4">
            <Link href="/feature" className="text-gray-400 hover:text-gray-300">
              Feature
            </Link>
            <Link href="/testimonials" className="text-gray-400 hover:text-gray-300">
              Testimonials
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-gray-300">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-gray-300">
              About Us
            </Link>
          </div>
          <div className="flex space-x-4 justify-end w-1/4">
          <Link href="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div> 
      </div>
    </nav>
  )
}

