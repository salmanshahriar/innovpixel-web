"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
           <Link 
                href="/" 
                className="text-2xl md:text-3xl font-bold text-white hover:text-primary-blue transition-colors duration-300 focus:outline-none focus:text-primary-blue"
                aria-label="InnovPixel Home"
              >
                <img
            
                  src="./innovpixel-logo.png"
                  alt="InnovPixel Logo"
                  className="inline-block w-32 cursor-pointer"
                /> 
              </Link>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Sitemap</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-white/60 hover:text-white text-sm transition-colors">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-white/60 hover:text-white text-sm transition-colors">
                    WORK
                  </Link>
                </li>
                <li>
                  <Link href="#blog" className="text-white/60 hover:text-white text-sm transition-colors">
                    BLOG
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://instagram.com/innovpixel/"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    INSTAGRAM
                  </Link>
                </li>
                 <li>
                  <Link
                    href="https://linkedin.com/company/innovpixel"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    LINKEDIN
                  </Link>
                </li>
                <li>
                  <Link href="https://www.behance.net/innovpixel/" className="text-white/60 hover:text-white text-sm transition-colors">
                    BEHANCE
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="https://facebook.com/innovpixel"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    FACEBOOK
                  </Link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 py-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs z-[10000]">2025 © InnovPixel All Rights Reserved</p>

         
        </div>
      </div>
    </footer>
  )
}