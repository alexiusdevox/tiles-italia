'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'

const menuItems = [
  { name: 'Home', href: '#' },
  { name: 'Prodotti', href: '#' },
  { name: 'Servizi', href: '#' },
  { name: 'Chi siamo', href: '#' },
  { name: 'Contatti', href: '#' },
]

export default function NavMenuDown() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full bg-secondary text-black overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6 md:justify-end">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="block py-2 hover:underline transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end h-16">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="ml-2 h-6 w-6" />
                <span className="sr-only">
                  {isOpen ? 'Close menu' : 'Open menu'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}