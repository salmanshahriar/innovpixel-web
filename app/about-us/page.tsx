"use client"

import React, { useEffect, useRef, useState } from "react"
import Matter from "matter-js"

export default function FallingTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const cleanupRef = useRef<() => void | null>(null)
  const [effectStarted, setEffectStarted] = useState(false)

  // Scroll trigger logic
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      if (rect.top <= 80 && !effectStarted) {
        setEffectStarted(true)
      } else if (rect.top > 100 && effectStarted) {
        setEffectStarted(false)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [effectStarted])

  // Matter.js animation logic
  useEffect(() => {
    if (!containerRef.current || !textRef.current || !canvasRef.current) return

    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    const wordsEls = textRef.current.querySelectorAll<HTMLElement>("span.word")

    if (!effectStarted) {
      // Smooth fade out of canvas
      canvasRef.current.style.transition = "opacity 0.6s ease"
      canvasRef.current.style.opacity = "0"

      setTimeout(() => {
        wordsEls.forEach((el) => {
          el.style.transition = "all 0.5s ease"
          el.style.left = ""
          el.style.top = ""
          el.style.transform = ""
          el.style.position = ""
          el.style.zIndex = ""
        })
        canvasRef.current!.innerHTML = ""
        canvasRef.current!.style.pointerEvents = "none"
      }, 600)

      return
    }

    // Start effect
    canvasRef.current.style.opacity = "1"
    canvasRef.current.style.pointerEvents = "none"
    canvasRef.current.style.transition = "opacity 0.3s ease"

    const { Engine, Render, Runner, World, Bodies, Body } = Matter

    const container = containerRef.current
    const canvas = canvasRef.current

    const width = container.offsetWidth
    const height = container.offsetHeight

    const rect = {
      top: container.offsetTop,
      left: container.offsetLeft,
      width,
      height,
    }

    const engine = Engine.create()
    engine.world.gravity.y = 10

    const render = Render.create({
      element: canvas,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    })

    const boundaries = [
      Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true, render: { visible: false } }),
    ]

    const wordBodies = Array.from(wordsEls).map((el) => {
      const r = el.getBoundingClientRect()
      const x = r.left + window.scrollX - rect.left + r.width / 2
      const y = r.top + window.scrollY - rect.top + r.height / 2

      const body = Bodies.rectangle(x, y, r.width, r.height, {
        restitution: 1,
        frictionAir: 0.1,
        render: { fillStyle: "transparent" },
      })

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 })
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1)

      el.style.position = "absolute"
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.transform = "translate(-50%, -50%)"
      el.style.zIndex = "10"

      return { el, body }
    })

    World.add(engine.world, [...boundaries, ...wordBodies.map(wb => wb.body)])

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    let animationFrameId: number
    const update = () => {
      wordBodies.forEach(({ el, body }) => {
        el.style.left = `${body.position.x}px`
        el.style.top = `${body.position.y}px`
        el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      animationFrameId = requestAnimationFrame(update)
    }
    update()

    cleanupRef.current = () => {
      cancelAnimationFrame(animationFrameId)
      Render.stop(render)
      Runner.stop(runner)
      World.clear(engine.world, false)
      Engine.clear(engine)
      if (canvas.contains(render.canvas)) {
        canvas.removeChild(render.canvas)
      }
      wordsEls.forEach((el) => {
        el.style.position = ""
        el.style.left = ""
        el.style.top = ""
        el.style.transform = ""
        el.style.zIndex = ""
      })
      canvas.style.opacity = "0"
      canvas.style.pointerEvents = "none"
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [effectStarted])

  return (
    <div className="h-full p-12">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold leading-tight mb-2 text-primary-white">WE CREATE</h1>
        <h1 className="text-6xl font-bold leading-tight mb-2 text-blue-600">
          DIGITAL <span className="text-primary-white">EXPERIENCES</span>
        </h1>
        <h2 className="text-lg font-semibold uppercase tracking-widest mt-8 text-primary-white">
          BRANDING ✦ LOGO ✦ IDENTITY ✦ SOCIAL MEDIA ✦ UI/UX
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative px-20 mx-auto min-h-[1000px] overflow-visible rounded-lg p-6 bg-transparent"
      >
        <div
          ref={textRef}
          className="text-5xl font-thin leading-[1.4] text-center select-none cursor-default"
        >
          {"We are experts in creating top quality graphic design and social media marketing to heighten your brand. InnovPixel is your go-to partner in designing memorable visual identities."
            .split(" ")
            .map((word, i) => (
              <span key={i} className="word whitespace-nowrap">
                {word}&nbsp;
              </span>
            ))}
        </div>
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        />
      </div>
    </div>
  )
}
