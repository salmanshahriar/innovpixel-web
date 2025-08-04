"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";

interface HeaderProps {
  smootherRef?: React.MutableRefObject<any | null>;
}

export default function Header({ smootherRef }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Use the smooth content container as scroller, or fallback to window
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* Spacer for layout shift */}
      <div className={isScrolled ? "h-[80px]" : "h-[160px]"} />

      <motion.header
        className="fixed top-0 left-0 w-full z-50"
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: {
            backgroundColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            paddingTop: 48,
            paddingBottom: 48,
            transition: { duration: 0.4, ease: "easeInOut" },
          },
          scrolled: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            paddingTop: 16,
            paddingBottom: 16,
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      >
        <motion.div
          className="flex items-center justify-between max-w-screen-xl mx-auto w-full"
          initial={false}
          animate={{
            paddingLeft: isScrolled ? 0 : 80,
            paddingRight: isScrolled ? 0 : 80,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          {/* Logo */}
          <motion.div
            animate={{
              scale: isScrolled ? 0.95 : 1,
              opacity: isScrolled ? 0.9 : 1,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            <Link href="#" className="text-3xl font-bold text-primary-white">
              InnovPixel
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            animate={{
              opacity: isScrolled ? 0.95 : 1,
              y: isScrolled ? -2 : 0,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            <Link
              href="#"
              className="text-lg font-medium text-primary-white hover:text-primary-blue"
            >
              WORK
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-primary-white hover:text-primary-blue"
            >
              ABOUT US
            </Link>
          </motion.nav>

          {/* MENU Button (Mobile only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary-blue hover:text-white active:text-white text-lg font-medium"
            >
              MENU
            </button>
          </div>

          {/* Contact Button (only desktop) */}
          <motion.div
            animate={{
              scale: isScrolled ? 0.95 : 1,
              opacity: isScrolled ? 0.95 : 1,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            className="hidden sm:block md:block"
          >
            <Button className="rounded-full bg-primary-blue px-6 py-2 text-lg font-medium text-primary-white hover:bg-primary-blue/90">
              CONTACT US
            </Button>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }}
          >
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-primary-blue hover:text-white active:text-white"
            >
              WORK
            </Link>
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-primary-blue hover:text-white active:text-white"
            >
              ABOUT US
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-primary-blue hover:text-white active:text-white"
            >
              CONTACT US
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
