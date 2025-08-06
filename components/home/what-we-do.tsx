"use client"

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { gsap } from "gsap"

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const [value, setValue] = useState<number>(defaultValue)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQueryLists = queries.map((q) => window.matchMedia(q))
    const getValue = () => {
      const index = mediaQueryLists.findIndex((mql) => mql.matches)
      return values[index] ?? defaultValue
    }

    const handler = () => setValue(getValue())
    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler))
    setValue(getValue())

    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler)
      )
  }, [queries, values, defaultValue])

  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = img.onerror = () => resolve()
        })
    )
  )
}

interface Item {
  id: string
  img: string
  url: string
  height: number
}

interface GridItem extends Item {
  x: number
  y: number
  w: number
  h: number
}

const Masonry: React.FC = () => {
  const items: Item[] = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1035/600/700?grayscale",
      url: "https://example.com/four",
      height: 450,
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1040/600/850?grayscale",
      url: "https://example.com/five",
      height: 300,
    },
  ]

  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  )

  const [containerRef, { width }] = useMeasure<HTMLDivElement>()
  const [imagesReady, setImagesReady] = useState(false)
  const hasMounted = useRef(false)

  const animateFrom: "top" | "bottom" | "left" | "right" | "center" = "bottom"
  const duration = 0.6
  const stagger = 0.05
  const blurToFocus = true
  const scaleOnHover = true
  const hoverScale = 0.95
  const colorShiftOnHover = false
  const ease = "power3.out"
  const gap = 16

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    switch (animateFrom) {
      case "top":
        return { x: item.x, y: -200 }
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 }
      case "left":
        return { x: -200, y: item.y }
      case "right":
        return { x: window.innerWidth + 200, y: item.y }
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return []
    const colHeights = new Array(columns).fill(0)
    const columnWidth = (width - gap * (columns - 1)) / columns

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const height = child.height
      const x = (columnWidth + gap) * col
      const y = colHeights[col]
      colHeights[col] += height + gap
      return { ...child, x, y, w: columnWidth, h: height }
    })
  }, [columns, items, width, gap])

  useLayoutEffect(() => {
    if (!imagesReady) return

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h }

      if (!hasMounted.current) {
        const initPos = getInitialPosition(item)
        const initState = {
          opacity: 0,
          x: initPos.x,
          y: initPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        }

        gsap.fromTo(selector, initState, {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        })
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        })
      }
    })

    hasMounted.current = true
  }, [grid, imagesReady])

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const selector = `[data-key="${item.id}"]`
    if (scaleOnHover) {
      gsap.to(selector, { scale: hoverScale, duration: 0.3, ease: "power2.out" })
    }
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector(".color-overlay") as HTMLElement
      if (overlay) {
        gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
      }
    }
  }

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const selector = `[data-key="${item.id}"]`
    if (scaleOnHover) {
      gsap.to(selector, { scale: 1, duration: 0.3, ease: "power2.out" })
    }
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector(".color-overlay") as HTMLElement
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3 })
      }
    }
  }

  return (
    <div className="w-full px-10 mx-auto max-w-screen-2xl pb-20">
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: grid.length
            ? Math.max(...grid.map((i) => i.y + i.h))
            : 0,
        }}
      >
        {grid.map((item) => (
          <div
            key={item.id}
            data-key={item.id}
            onClick={() => window.open(item.url, "_blank")}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
            style={{
              position: "absolute",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transformOrigin: "center center",
            }}
          >
            <img
              src={item.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                display: "block",
              }}
            />
            {colorShiftOnHover && (
              <div
                className="color-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                  opacity: 0,
                  pointerEvents: "none",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Masonry
