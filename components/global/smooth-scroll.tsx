"use client"

import { useEffect } from "react"

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollSmoother").then(({ ScrollSmoother }) => {
        gsap.registerPlugin(ScrollSmoother)

        try {
          const smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
          })

          return () => {
            smoother.kill()
          }
        } catch (error) {
          console.error("Failed to initialize ScrollSmoother:", error)
        }
      }).catch((error) => {
        console.error("Failed to import ScrollSmoother:", error)
      })
    }).catch((error) => {
      console.error("Failed to import GSAP:", error)
    })
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}