"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { X } from "lucide-react";

interface HeaderProps {
  smootherRef?: React.MutableRefObject<any | null>;
}

export default function Header({ smootherRef }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scroller = smootherRef?.current?.content() || window;

    const trigger = ScrollTrigger.create({
      scroller,
      start: 50,
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 50);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [smootherRef]);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-trigger')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT US", href: "#about" },
  ];

  return (
    <>
      {/* Dynamic spacer to prevent layout shift */}
      <div className={`transition-all duration-400 ease-in-out ${
        isScrolled ? "h-[80px]" : "h-[120px] md:h-[140px]"
      }`} />

      <motion.header
        className="fixed top-0 left-0 w-full z-50"
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            paddingTop: 24,
            paddingBottom: 24,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          },
          scrolled: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 32px rgba(0, 0, 0, 0.1)",
            paddingTop: 16,
            paddingBottom: 16,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          },
        }}
      >
        <div className="px-4 md:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between max-w-7xl mx-auto"
            initial={false}
            animate={{
              transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
          >
            {/* Logo */}
            <motion.div
              animate={{
                scale: isScrolled ? 0.95 : 1,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              <Link 
                href="/" 
                className="text-2xl md:text-3xl font-bold text-white hover:text-primary-blue transition-colors duration-300 focus:outline-none focus:text-primary-blue"
                aria-label="InnovPixel Home"
              >
                InnovPixel
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center space-x-12"
              animate={{
                opacity: isScrolled ? 0.95 : 1,
                y: isScrolled ? -1 : 0,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-base font-medium text-white/90 hover:text-white transition-colors duration-300 group focus:outline-none focus:text-white"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </motion.nav>

            {/* Desktop Actions */}
            <motion.div
              className="hidden lg:flex items-center space-x-4"
              animate={{
                scale: isScrolled ? 0.95 : 1,
                opacity: isScrolled ? 0.95 : 1,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            >
              <Button 
                className="rounded-full bg-primary-blue hover:bg-primary-blue/90 active:bg-primary-blue/80 px-8 py-2.5 text-base font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Contact Us"
              >
                CONTACT US
              </Button>
            </motion.div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="menu-trigger relative w-10 h-10 flex items-center justify-center text-white hover:text-primary-blue transition-colors duration-300 focus:outline-none focus:text-primary-blue"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <motion.div
                  className="flex flex-col justify-center items-center"
                  initial={false}
                  animate={menuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="block w-6 h-0.5 bg-current mb-1.5"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-6 h-0.5 bg-current mb-1.5"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-6 h-0.5 bg-current"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="mobile-menu fixed top-0 right-0 w-full max-w-sm h-screen bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 200,
                duration: 0.4 
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-lg font-semibold text-white">Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 flex flex-col p-6 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1 + 0.2,
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block text-xl font-medium text-white/90 hover:text-primary-blue transition-colors duration-300 py-2"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Contact Button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: 0.4,
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  className="pt-6"
                >
                  <Button 
                    onClick={closeMenu}
                    className="w-full rounded-full bg-primary-blue hover:bg-primary-blue/90 px-8 py-3 text-base font-medium text-white transition-all duration-300"
                  >
                    CONTACT US
                  </Button>
                </motion.div>
              </nav>
            </motion.div> 
          </>
        )}
      </AnimatePresence>
    </>
  );
}