'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-400">
              Hellis SEO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
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
            <div className="flex space-x-4 ml-4">
              <Link href="/login">
                <Button variant="outline" className="text-lg text-gray-900 border-gray-400 hover:text-green-700 hover:border-gray-300">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="text-lg text-gray-900 border-gray-400 hover:text-green-700 hover:border-gray-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-gray-300 focus:outline-none rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 right-0 bg-gray-800 shadow-lg transition-transform duration-200 ease-in-out transform ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className="px-4 py-3 space-y-3">
          <Link
            href="/feature"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Feature
          </Link>
          <Link
            href="/testimonials"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            href="/pricing"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <div className="space-y-2 pt-3 border-t border-gray-700">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700">
                Login
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
