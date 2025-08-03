"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github, Code, Package } from "lucide-react"

export default function CardsSection() {
  const [realtimeValue, setRealtimeValue] = useState(0)
  const [debounceValue, setDebounceValue] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [animationStage, setAnimationStage] = useState(0) // 0: normal, 1: stage1, 2: stage2

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    margin: "-30% 0px -30% 0px",
    once: false,
  })

  useEffect(() => {
    if (isInView) {
      // Start animation sequence
      setAnimationStage(1)
      
      // After 1.5 seconds, move to stage 2
      const timer = setTimeout(() => {
        setAnimationStage(2)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else {
      setAnimationStage(0)
    }
  }, [isInView])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setRealtimeValue(e.target.value.length)
    setTimeout(() => setDebounceValue(e.target.value.length), 500)
  }

  const getGridClasses = () => {
    switch (animationStage) {
      case 0:
        return "grid-cols-1 md:grid-cols-3"
      case 1:
        return "grid-cols-2"
      case 2:
        return "grid-cols-1"
      default:
        return "grid-cols-1 md:grid-cols-3"
    }
  }

  const getCard1Classes = () => {
    switch (animationStage) {
      case 0:
        return ""
      case 1:
        return "col-span-1"
      case 2:
        return "col-span-1"
      default:
        return ""
    }
  }

  const getCardsContainerClasses = () => {
    switch (animationStage) {
      case 0:
        return "contents"
      case 1:
        return "col-span-1 flex flex-col gap-4"
      case 2:
        return "contents"
      default:
        return "contents"
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-24 px-4 pb-20 md:px-8 lg:px-16"
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
        className={`grid gap-8 ${getGridClasses()}`}
      >
        {/* Card 1 */}
        <motion.div
          layout
          layoutId="card-1"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateY: 0
          }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className={`rounded-xl border-none bg-white p-6 shadow-lg ${getCard1Classes()}`}
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
        <div className={getCardsContainerClasses()}>
          {/* Card 2 */}
          <motion.div
            layout
            layoutId="card-2"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: animationStage === 1 ? 15 : 0,
              rotateX: animationStage === 1 ? 5 : 0
            }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="rounded-xl border-none bg-purple-600 p-6 shadow-lg"
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
            transition={{ duration: 0.8, ease: "easeInOut" }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: animationStage === 1 ? -15 : 0,
              rotateX: animationStage === 1 ? -5 : 0
            }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="rounded-xl border-none bg-orange-500 p-6 shadow-lg"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between p-0">
              <CardTitle className="text-2xl font-sans font-normal text-white">
                useDebounce()
              </CardTitle>
              <Button className="rounded-full bg-white px-4 py-2 text-lg font-sans font-normal text-orange-500 hover:bg-white/90">
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