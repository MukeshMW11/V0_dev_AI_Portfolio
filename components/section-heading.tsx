"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SectionHeadingProps {
  title: string
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animate the line
      gsap.fromTo(
        ".heading-line",
        {
          width: 0,
        },
        {
          width: "100%",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: 0.3,
        },
      )
    }, headingRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={headingRef} className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent inline-block">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-24 h-1 heading-line bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </div>
  )
}
