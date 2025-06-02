"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subHeadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(SplitText)

      const ctx = gsap.context(() => {
        // Animate the heading with text split
        if (headingRef.current) {
          const split = new SplitText(headingRef.current, { type: "chars, words" })

          gsap.from(split.chars, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "back.out",
            delay: 0.3,
          })
        }

        // Animate the subheading
        gsap.fromTo(subHeadingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2 })

        // Animate social icons and CTA button
        gsap.fromTo(
          ".hero-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            delay: 1.5,
            ease: "power3.out",
          },
        )

        // Animate the scroll indicator
        gsap.fromTo(
          ".scroll-indicator",
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 2,
            ease: "power3.out",
            yoyo: true,
            repeat: -1,
          },
        )
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  const handleScrollDown = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: "#about",
      ease: "power3.inOut",
    })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto text-center z-10">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent"
        >
          Mukesh Bhatta
        </h1>

        <p ref={subHeadingRef} className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
          Software Engineer specializing in full-stack web development with React, Next.js, and Node.js
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="https://github.com/MukeshMW1"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-item flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>

          <a
            href="http://www.linkedin.com/in/mw1m"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-item flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>

          <Button
            className="hero-item bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none"
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: "#contact",
                ease: "power3.inOut",
              })
            }}
          >
            Contact Me
          </Button>
        </div>

        <div
          className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleScrollDown}
        >
          <ArrowDown className="animate-bounce" size={24} />
          <span className="text-sm text-zinc-400 block mt-2">Scroll Down</span>
        </div>
      </div>
    </section>
  )
}
