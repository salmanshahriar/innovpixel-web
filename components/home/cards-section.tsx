"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Code, Package } from "lucide-react"

export default function CardsSection() {
  const [realtimeValue, setRealtimeValue] = useState(0)
  const [debounceValue, setDebounceValue] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Scroll control setup
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const animationStage = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1])

  // Grid and layout classes based on scroll
  const getGridClasses = (stage: number) =>
    stage === 1
      ? "grid-cols-2"
      : "grid-cols-1 md:grid-cols-3"

  const getCard1Classes = (stage: number) =>
    stage === 1 ? "col-span-1" : ""

  const getCardsContainerClasses = (stage: number) =>
    stage === 1
      ? "col-span-1 flex flex-col gap-4"
      : "contents"

  // Animations for cards (scroll-driven)
  const card2Anim = (stage: number) =>
    stage === 1
      ? { rotateY: 15, rotateX: 5 }
      : { rotateY: 0, rotateX: 0 }
  const card3Anim = (stage: number) =>
    stage === 1
      ? { rotateY: -15, rotateX: -5 }
      : { rotateY: 0, rotateX: 0 }

  // Framer Motion Variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 30 },
    animate: (custom: any) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: custom?.rotateY ?? 0,
      rotateX: custom?.rotateX ?? 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    exit: { opacity: 0, scale: 0.95, y: 30, transition: { duration: 0.3, ease: "easeInOut" } },
  }

  // Debounce logic
  React.useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => setDebounceValue(inputValue.length), 500)
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setRealtimeValue(e.target.value.length)
  }

  // Get current stage value from motion value
  const [stage, setStage] = useState(0)
  React.useEffect(() => {
    const unsubscribe = animationStage.on("change", (v: number) => setStage(Math.round(v)))
    return () => unsubscribe()
  }, [animationStage])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-24 px-4 pb-20 md:px-8 lg:px-16"
    >
  <motion.div
  layout
  transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
  className={`grid gap-8 ${getGridClasses(stage)}`}
>
  {/* Card 1 - We Craft */}
  <motion.div
    layout
    layoutId="card-1"
    variants={cardVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    custom={{}}
    className={`group cursor-pointer rounded-xl border-none bg-white p-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden relative ${getCard1Classes(stage)}`}
  >
    {/* Magazine-style layout */}
    <div className="relative h-full min-h-[280px] flex flex-col">
      {/* Main title - fixed position top-left */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-8xl font-black text-black leading-[0.8] tracking-tighter uppercase transform -rotate-1">
          We<br />
          <span className="text-6xl">Craft</span>
        </h1>
      </div>
      
      {/* Creative craft elements */}
      <div className="absolute top-6 right-8">
        <div className="w-14 h-14 border-4 border-black opacity-15 transform rotate-45"></div>
        <div className="absolute top-1 left-1 w-12 h-12 border-2 border-black opacity-25 transform -rotate-12"></div>
      </div>
      
   
      
      {/* Scattered creative dots */}
      {/* <div className="absolute top-1/2 right-12 w-2 h-2 bg-black opacity-30 rounded-full"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-black opacity-25 rounded-full"></div>
      <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-black opacity-20 rounded-full"></div> */}
      
      {/* Bottom accent */}
      {/* <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-black via-gray-600 to-black"></div> */}
    </div>
  </motion.div>

  {/* Cards 2 & 3 Container */}
  <div className={getCardsContainerClasses(stage)}>
    {/* Card 2 - We Visualize */}
    <motion.div
      layout
      layoutId="card-2"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={card2Anim(stage)}
      className="group cursor-pointer rounded-xl border-none bg-neutral-500 p-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden relative"
    >
      <div className="relative h-full min-h-[280px] flex flex-col">
        {/* Main title - fixed position top-left */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-8xl font-black text-primary-white leading-[0.8] tracking-tighter uppercase transform -rotate-1">
            We<br />
            <span className="text-6xl">Visualize</span>
          </h1>
        </div>
        
        {/* Visual design elements */}
       
        
        <div className="absolute top-6 right-6">
        <div className="w-12 h-12 bg-white opacity-20 transform rotate-45"></div>
        <div className="absolute -top-1 -left-1 w-14 h-14 border-2 border-white opacity-15 transform rotate-12"></div>
      </div>
        {/* <div className="absolute top-20 right-12">
          <div className="w-4 h-16 bg-white opacity-30 transform rotate-12"></div>
          <div className="absolute -left-1 top-4 w-6 h-8 bg-white opacity-20 transform -rotate-45"></div>
        </div>
        
        <div className="absolute bottom-16 right-8">
          <div className="w-10 h-2 bg-white opacity-50"></div>
          <div className="absolute -top-2 left-2 w-6 h-6 border-2 border-white opacity-40 transform rotate-45"></div>
        </div>
         */}
        {/* Floating visual elements */}
        {/* <div className="absolute top-1/3 right-20 w-2 h-8 bg-white opacity-35 transform rotate-30"></div>
        <div className="absolute bottom-1/4 right-16 w-8 h-2 bg-white opacity-25 transform -rotate-15"></div>
        
        {/* Side accent */}
        {/* <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-white via-gray-300 to-white opacity-20"></div> */} 
      </div>
    </motion.div>

    {/* Card 3 - We Better Do */}
    <motion.div
      layout
      layoutId="card-3"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={card3Anim(stage)}
      className="group cursor-pointer rounded-xl border-none bg-primary-blue p-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden relative"
    >
      <div className="relative h-full min-h-[280px] flex flex-col">
        {/* Main title - fixed position top-left */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-8xl font-black text-primary-white leading-[0.7] tracking-tighter uppercase transform -rotate-2">
            We<br />
            <span className="text-5xl">Better</span><br />
            <span className="text-6xl">Do</span>
          </h1>
        </div>
        
     

{/* <div className="absolute top-6 right-6">
          <div className="w-12 h-12 border-3 border-white opacity-40 rounded-full"></div>
          <div className="absolute top-3 left-3 w-6 h-6 bg-white opacity-60 rounded-full"></div>
        </div> */}
        
        <div className="absolute top-6 right-6">
          <div className="w-12 h-12 border-2 border-white opacity-40 transform rotate-45"></div>
          <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-20 transform -rotate-45"></div>
        </div>
        
        {/* Energy burst elements */}
        {/* <div className="absolute top-1/2 right-16 w-1 h-6 bg-white opacity-50 transform rotate-45"></div>
        <div className="absolute top-1/2 right-16 w-1 h-6 bg-white opacity-40 transform -rotate-45"></div>
       */}
        
        
      </div>
    </motion.div>
  </div>
</motion.div>
    </section>
  )
}