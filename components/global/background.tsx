"use client"

import React, { useRef, useEffect } from "react"

interface SquaresProps {
  speed?: number
  squareSize?: number
  directionChangeInterval?: number
  noiseBrightness?: number
  gridOpacity?: number
}

const primaryOrange = "#F6F6F6"

export default function Squares({
  speed = 0.02,
  squareSize = 2.5, // 50% smaller
  directionChangeInterval = 5000, // 5 seconds
  noiseBrightness = 50, // slightly brighter gray
  gridOpacity = 0.1, // reduced opacity
}: SquaresProps) {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)

  const position = useRef({ x: 0, y: 0 })
  const directionIndex = useRef(0)
  const lastDirectionChangeTime = useRef<number>(performance.now())

  const directions = [
    { x: 1, y: -1 }, // LB → RT
    { x: 1, y: 1 },  // RT → RB
    { x: -1, y: -1 },// RB → LT
    { x: -1, y: 1 }, // LT → LB
  ]

  const resizeCanvas = () => {
    [gridCanvasRef.current, noiseCanvasRef.current].forEach((canvas) => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    })
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  const drawNoise = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const gray = noiseBrightness + Math.floor(Math.random() * 31.68) // 20% faster flicker
      data[i] = gray
      data[i + 1] = gray
      data[i + 2] = gray
      data[i + 3] = 128
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const calculateAlpha = (x: number, y: number, cx: number, cy: number, w: number, h: number) => {
    const dx = (x - cx) / (w * 0.35)
    const dy = (y - cy) / (h * 0.45)
    const d = Math.sqrt(dx * dx + dy * dy)
    const inner = 0.6, outer = 1.0
    if (d <= inner) return gridOpacity
    if (d >= outer) return 0
    return gridOpacity * (1 - (d - inner) / (outer - inner))
  }

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, ox: number, oy: number) => {
    ctx.clearRect(0, 0, width, height)
    const cx = width / 2, cy = height / 2
    for (let x = -squareSize; x < width + squareSize; x += squareSize) {
      for (let y = -squareSize; y < height + squareSize; y += squareSize) {
        const gx = x + ox
        const gy = y + oy
        const alpha = calculateAlpha(gx, gy, cx, cy, width, height)
        if (alpha <= 0) continue
        ctx.strokeStyle = primaryOrange
        ctx.globalAlpha = alpha
        ctx.strokeRect(gx, gy, squareSize, squareSize)
      }
    }
    ctx.globalAlpha = 1
  }

  const update = () => {
    const gridCanvas = gridCanvasRef.current
    const noiseCanvas = noiseCanvasRef.current
    if (!gridCanvas || !noiseCanvas) return
    const gridCtx = gridCanvas.getContext("2d")
    const noiseCtx = noiseCanvas.getContext("2d")
    if (!gridCtx || !noiseCtx) return

    const w = gridCanvas.width
    const h = gridCanvas.height

    drawNoise(noiseCtx, w, h)
    drawGrid(gridCtx, w, h, position.current.x, position.current.y)

    const now = performance.now()
    if (now - lastDirectionChangeTime.current >= directionChangeInterval) {
      directionIndex.current = (directionIndex.current + 1) % directions.length
      lastDirectionChangeTime.current = now
    }

    const dir = directions[directionIndex.current]
    position.current.x += dir.x * speed
    position.current.y += dir.y * speed

    requestRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={noiseCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={gridCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </div>
  )
}
