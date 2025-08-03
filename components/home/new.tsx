"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Code, Package } from "lucide-react"

export default function CardsSection() {
  const [animationStage, setAnimationStage] = useState(0) // 0: normal, 1: stage1, 2: stage2

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    margin: "-30% 0px -30% 0px",
    once: false,
  })

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Map scroll progress to animation stages
  const stage = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 2])

  useEffect(() => {
    const unsubscribe = stage.onChange((value) => {
      setAnimationStage(Math.round(value))
    })
    return () => unsubscribe()
  }, [stage])

  useEffect(() => {
    if (!isInView) {
      setAnimationStage(0)
    }
  }, [isInView])

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

  // Common transition settings
  const cardTransition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1], // Smoother easing
    type: "spring",
    stiffness: 100,
    damping: 20,
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-24 px-4 pb-20 md:px-8 lg:px-16 mb-96"
    >
      <motion.div
        layout
        transition={{ layout: cardTransition }}
        className={`grid gap-8 ${getGridClasses()}`}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Card 1 */}
        <motion.div
          layout
          layoutId="card-1"
          transition={cardTransition}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateY: 0,
          }}
          style={{
            borderRadius: "12px", // Consistent rounded corners
            backfaceVisibility: "hidden", // Prevent text rendering issues
            willChange: "transform, opacity",
          }}
          className={`bg-white p-6 shadow-lg ${getCard1Classes()}`}
        >
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-2xl font-sans font-normal text-black">
              We craft
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 p-0">
            <p className="text-xl font-sans font-medium text-black">
              Create innovative solutions with precision and care.
            </p>
          </CardContent>
        </motion.div>

        {/* Cards 2 & 3 Container */}
        <div className={getCardsContainerClasses()}>
          {/* Card 2 */}
          <motion.div
            layout
            layoutId="card-2"
            transition={cardTransition}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: animationStage === 1 ? 15 : 0,
              rotateX: animationStage === 1 ? 5 : 0,
            }}
            style={{
              borderRadius: "12px",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
            className="bg-purple-600 p-6 shadow-lg"
          >
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2 text-2xl font-sans font-normal text-white">
                We visualize
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 p-0">
              <div className="grid gap-2">
                <p className="text-lg text-white">
                  Transform ideas into stunning visual experiences.
                </p>
              </div>
            </CardContent>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            layout
            layoutId="card-3"
            transition={cardTransition}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: animationStage === 1 ? -15 : 0,
              rotateX: animationStage === 1 ? -5 : 0,
            }}
            style={{
              borderRadius: "12px",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
            className="bg-orange-500 p-6 shadow-lg"
          >
            <CardHeader className="flex w-full flex-row items-center justify-between p-0">
              <CardTitle className="text-2xl font-sans font-normal text-white">
                We better DO!
              </CardTitle>
              <Button className="rounded-full bg-white px-4 py-2 text-lg font-sans font-normal text-orange-500 hover:bg-white/90">
                InnovPixel
              </Button>
            </CardHeader>
            <CardContent className="mt-4 w-full p-0">
              <div className="grid gap-4">
                <p className="text-lg text-white">
                  Deliver impactful results with bold actions.
                </p>
              </div>
            </CardContent>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}