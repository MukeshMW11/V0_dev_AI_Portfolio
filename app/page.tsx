"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import Cursor from "@/components/cursor"

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Initialize animations
    const ctx = gsap.context(() => {
      // Reveal sections on scroll
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="relative overflow-hidden bg-zinc-900 text-white">
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
      </SmoothScroll>
    </main>
  )
}
