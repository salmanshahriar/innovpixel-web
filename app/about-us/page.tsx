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
    <div className="h-full p-12 flex justify-center gap-20 ">
      <div className="mb-12 font-display font-regular tracking-tight-medium font-bold text-left">
        <h1 className="text-7xl font-bold leading-tight mb-2 text-primary-white">WE CREATE</h1>
        <h1 className="text-7xl font-bold leading-tight mb-2 text-blue-600">
          DIGITAL  </h1>
          <h1 className="text-7xl font-bold leading-tight mb-2 text-primary-white">EXPERIENCES</h1>
       
       
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto min-h-[300px] overflow-visible rounded-lg bg-transparent"
      >


        <div
          ref={textRef}
          className="text-2xl font-thin leading-loose text-center select-none cursor-default"
        >
             <h2 className="text-2xl font-semibold uppercase tracking-widest text-primary-white mb-11">
          BRANDING ✦ LOGO ✦ IDENTITY ✦ SOCIAL MEDIA ✦ UI/UX
        </h2>
         <span className=" text-3xl font-semibold uppercase tracking-widest text-primary-white">
          We are experts in creating top quality graphic design and social media marketing to heighten your brand. InnovPixel is your go-to partner in designing memorable visual identities.

         </span>
        </div>
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        />
      </div>
    </div>
  )
}
