"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768

    // Only show custom cursor on desktop
    if (!isMobile) {
      setHidden(false)

      const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseenter", onMouseEnter)
        document.addEventListener("mouseleave", onMouseLeave)
        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("mouseup", onMouseUp)
      }

      const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseenter", onMouseEnter)
        document.removeEventListener("mouseleave", onMouseLeave)
        document.removeEventListener("mousedown", onMouseDown)
        document.removeEventListener("mouseup", onMouseUp)
      }

      const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })

        const target = e.target as HTMLElement
        const isLink =
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") ||
          target.closest("button")

        setLinkHovered(!!isLink)
      }

      const onMouseEnter = () => {
        setHidden(false)
      }

      const onMouseLeave = () => {
        setHidden(true)
      }

      const onMouseDown = () => {
        setClicked(true)
      }

      const onMouseUp = () => {
        setClicked(false)
      }

      // Initialize GSAP animation for cursor
      gsap.set(".cursor", {
        xPercent: -50,
        yPercent: -50,
      })

      const xTo = gsap.quickTo(".cursor", "x", { duration: 0.4, ease: "power3" })
      const yTo = gsap.quickTo(".cursor", "y", { duration: 0.4, ease: "power3" })

      gsap.ticker.add(() => {
        xTo(position.x)
        yTo(position.y)
      })

      addEventListeners()
      return removeEventListeners
    }
  }, [position])

  if (hidden) return null

  return (
    <div
      className={`cursor fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
        clicked ? "scale-75" : linkHovered ? "scale-150" : "scale-100"
      } transition-transform duration-300`}
      style={{
        backgroundColor: "white",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  )
}
