"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CardsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const card1Ref = useRef<HTMLDivElement | null>(null)
  const card2Ref = useRef<HTMLDivElement | null>(null)
  const card3Ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return // 🔒 disable GSAP hover on small screens

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current]

    cards.forEach((card, index) => {
      if (!card) return

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.08,
          z: 50,
          duration: 0.6,
          ease: "power3.out",
        })

        const otherCards = cards.filter((_, i) => i !== index)
        gsap.to(otherCards, {
          scale: 0.92,
          z: -20,
          duration: 0.6,
          ease: "power3.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(cards, {
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: "power3.out",
        })
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.05
        const deltaY = (e.clientY - centerY) * 0.05

        gsap.to(card, {
          x: deltaX,
          y: deltaY,
          rotationX: deltaY * 0.3,
          rotationY: -deltaX * 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const resetPosition = () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power3.out",
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", () => {
        handleMouseLeave()
        resetPosition()
      })
      card.addEventListener("mousemove", handleMouseMove)

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
        card.removeEventListener("mousemove", handleMouseMove)
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 md:-mt-24 px-4 pb-36 md:px-8 lg:px-16 "
    >
      <div
        ref={gridRef}
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className="cursor-pointer rounded-xl bg-white shadow-lg overflow-hidden relative min-h-[400px]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="relative h-full flex flex-col p-6">
            <div className="z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black leading-[0.9] tracking-tight uppercase -rotate-1">
                We<br />
                <span className="text-4xl sm:text-5xl">Craft</span>
              </h1>
            </div>
            <div className="absolute top-6 right-8">
              <div className="w-12 h-12 border-4 border-black opacity-15 rotate-45"></div>
              <div className="absolute top-1 left-1 w-10 h-10 border-2 border-black opacity-25 -rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className="cursor-pointer rounded-xl bg-neutral-500 shadow-lg overflow-hidden relative min-h-[400px]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="relative h-full flex flex-col p-6">
            <div className="z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.9] tracking-tight uppercase -rotate-1">
                We<br />
                <span className="text-4xl sm:text-5xl">Visualize</span>
              </h1>
            </div>
            <div className="absolute top-6 right-6">
              <div className="w-10 h-10 bg-white opacity-20 rotate-45"></div>
              <div className="absolute -top-1 -left-1 w-12 h-12 border-2 border-white opacity-15 rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          ref={card3Ref}
          className="cursor-pointer rounded-xl bg-blue-600 shadow-lg overflow-hidden relative min-h-[400px]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="relative h-full flex flex-col p-6">
            <div className="z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.8] tracking-tight uppercase -rotate-2">
                We<br />
                <span className="text-3xl sm:text-4xl">Better</span>
                <br />
                <span className="text-4xl sm:text-5xl">Do</span>
              </h1>
            </div>
            <div className="absolute top-6 right-6">
              <div className="w-10 h-10 border-2 border-white opacity-40 rotate-45"></div>
              <div className="absolute top-2 left-2 w-6 h-6 bg-white opacity-20 -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
