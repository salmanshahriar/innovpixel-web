"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function FallingTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const cleanupRef = useRef<() => void | null>(null)
  const [effectStarted, setEffectStarted] = useState(false)

  // ScrollTrigger logic
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%",
        end: "top bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => setEffectStarted(true),
        onLeaveBack: () => setEffectStarted(false),
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20 mb-36">
      <div className="mb-8 lg:mb-12 font-display font-regular tracking-tight-medium font-bold text-left w-full lg:w-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-primary-white">
          WE CREATE
        </h1>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-blue-600">
          DIGITAL
        </h1>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-primary-white">
          EXPERIENCES
        </h1>
      </div>

      <div
        ref={containerRef}
        className="relative min-h-[300px] overflow-visible rounded-lg bg-transparent w-full lg:w-auto flex-1"
      >
        <div
          ref={textRef}
          className="text-base md:text-lg uppercase tracking-widest text-primary-white font-thin leading-loose select-none cursor-default"
        >
          
          {/* Services - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 justify-items-start mb-8 lg:mb-11">
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ BRANDING 
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ LOGO DESIGN
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ IDENTITY DESIGN
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 justify-items-start mb-8 lg:mb-11">
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ UI/UX DESIGN
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ AD DESIGN
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ SOCIAL-MEDIA DESIGN
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 justify-items-start">
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ PRODUCT DESIGN
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ MOTION GRAPHICS
            </h2>
            <h2 className="font-semibold uppercase tracking-widest text-primary-white text-xs sm:text-sm lg:text-base">
              ✦ VIDEO EDITING
            </h2>
          </div>
        </div>
        
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        />
      </div>
    </div>
  )
}