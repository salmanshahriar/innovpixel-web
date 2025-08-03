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

  // Only two stages: 0 (default), 1 (expanded/animated cards)
  // 0–0.55: Stage 0, 0.55–1: Stage 1 (no stage 2/3, stays expanded)
  const animationStage = useTransform(scrollYProgress, [0, 0.55, 1], [0, 1, 1])

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
        {/* Card 1 */}
        <motion.div
          layout
          layoutId="card-1"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={{}}
          className={`rounded-xl border-none bg-white p-6 shadow-lg ${getCard1Classes(stage)}`}
        >
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-2xl font-sans font-normal text-black">
              <Github className="h-6 w-6" />
              Open Source
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 p-0">
            <p className="text-xl font-sans font-medium text-black">
              WANT TO CONTRIBUTE? <br /> CLICK THE CARD
            </p>
          </CardContent>
        </motion.div>

        {/* Cards 2 & 3 Container */}
        <div className={getCardsContainerClasses(stage)}>
          {/* Card 2 */}
          <motion.div
            layout
            layoutId="card-2"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={card2Anim(stage)}
            className="rounded-xl border-none bg-neutral-500 p-6 shadow-lg"
          >
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2 text-2xl font-sans font-normal text-white">
                <Code className="h-6 w-6" />
                npm i react-haiku
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 p-0">
              <div className="grid gap-2">
                <p className="text-xl font-sans font-medium text-white">43 Hooks</p>
                <p className="text-xl font-sans font-medium text-white">8 Utilities</p>
                <p className="text-xl font-sans font-medium text-white">
                  <Package className="inline-block h-5 w-5 align-middle" />
                  {" <7Kb Bundle"}
                </p>
              </div>
            </CardContent>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            layout
            layoutId="card-3"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={card3Anim(stage)}
            className="rounded-xl border-none bg-primary-blue p-6 shadow-lg"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between p-0">
              <CardTitle className="text-2xl font-sans font-normal text-white">
                useDebounce()
              </CardTitle>
              <Button className="rounded-full bg-white px-4 py-2 text-lg font-sans font-normal text-primary-blue hover:bg-white/90">
                Try it!
              </Button>
            </CardHeader>
            <CardContent className="mt-4 w-full p-0">
              <div className="grid gap-4">
                <div className="text-lg font-sans font-normal text-white">
                  Realtime Value: <span className="font-medium">{realtimeValue}</span>
                </div>
                <div className="text-lg font-sans font-normal text-white">
                  Debounce value: <span className="font-medium">{debounceValue}</span>
                </div>
                <Input
                  type="text"
                  placeholder="Type something!"
                  className="rounded-md border-none bg-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white focus:ring-offset-0"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}