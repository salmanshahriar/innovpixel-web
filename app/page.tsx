"use client"

import { useEffect, useRef } from "react"
import { ScrollSmoother } from "@/lib/gsap"

import Header from "@/components/global/navbar"
import HeroSection from "@/components/home/hero-section"
import CardsSection from "@/components/home/cards-section"
import WeCreateDigital from "@/components/home/we-create-digital"
import { Footer } from "@/components/global/footer"
import Background from "@/components/global/background"
import SectionWhite from "@/components/home/section-white"
import SectionGray from "@/components/home/section-gray"
import  SectionBlue  from "@/components/home/section-blue"
// import WhatWeDo from "@/components/home/what-we-do"

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
    <div id="smooth-wrapper" className="relative overflow-hidden min-h-screen bg-black/35">
      <div className="fixed inset-0 z-[-1] opacity-10">
        <Background
          direction="diagonal"
          speed={0.5}
          borderColor="#999"
          squareSize={100}
          hoverFillColor="#333"
        />
      </div>

      {/* Sticky Blurred Glass Effect at Bottom with Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 z-[50] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 32px rgba(0, 0, 0, 0.1)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      <Header />
      <div id="smooth-content" className="relative z-10">
        <HeroSection />
        <div className="fade-up">
          <CardsSection />
        </div>
        <WeCreateDigital />
        {/* <SectionWhite /> */}
        {/* <SectionGray /> */}
        <SectionBlue />
        {/* <WhatWeDo /> */}
        <Footer />
      </div>
    </div>
  )
}