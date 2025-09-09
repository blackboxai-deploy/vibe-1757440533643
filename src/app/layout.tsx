import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SKV Global AI Video Generator',
  description: 'Professional AI Video Creation Platform - Generate stunning videos with credit-based system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {/* SKV Global Navigation Header */}
          <header className="bg-gray-800 border-b border-gray-700 py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SKV</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">SKV Global</h1>
                      <p className="text-xs text-gray-400">AI Video Generator</p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-6">
                  <nav className="flex space-x-6">
                    <a href="#create" className="text-gray-300 hover:text-white transition-colors">
                      Create Video
                    </a>
                    <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                      My Videos
                    </a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                      Pricing
                    </a>
                  </nav>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-3 py-1 rounded-full border border-purple-500/30">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm font-semibold text-purple-300">Credits Available</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* SKV Global Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  <p>© 2024 SKV Global AI Video Generator. Professional AI Video Creation Platform.</p>
                </div>
                <div className="flex space-x-6">
                  <span className="text-gray-400 text-sm">Powered by Advanced AI</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">Secure Payment Processing</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}