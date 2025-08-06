"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollSmoother } from "@/lib/gsap"

import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import CardsSection from "@/components/home/cards-section"
import AboutUs from "@/app/about-us/page"
import Footer from "@/components/footer/page"
import Squares from "@/components/global/background"
import WhatWeDo from "@/components/home/what-we-do"

export default function Home() {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && !smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
      })
    }

    return () => {
      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [])



  return (
    <div id="smooth-wrapper" className="relative overflow-hidden min-h-screen">
      <div className="fixed inset-0 z-[-1]">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="#666"
          squareSize={40}
          hoverFillColor="#333"
        />
      </div>

      <Header />
      <div id="smooth-content" className="relative z-10">
        <HeroSection />
        <div className="fade-up">
          <CardsSection />
        </div>
        <AboutUs />
        <WhatWeDo />
        <Footer />
      </div>
    </div>
  )
}
