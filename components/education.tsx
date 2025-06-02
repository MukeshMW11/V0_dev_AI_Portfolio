"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Calendar } from "lucide-react"
import SectionHeading from "./section-heading"

export default function Education() {
  const educationRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the education card
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animate the icon
      gsap.fromTo(
        ".education-icon",
        {
          opacity: 0,
          scale: 0,
          rotation: -45,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: 0.3,
        },
      )
    }, educationRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="education" ref={educationRef} className="py-20 px-6 bg-zinc-800/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Education" />

        <div className="mt-12 flex justify-center">
          <div
            ref={cardRef}
            className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-8 border border-zinc-800 max-w-2xl w-full hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <div className="education-icon bg-purple-500/20 p-4 rounded-full">
                <GraduationCap size={32} className="text-purple-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">Computer Engineering</h3>
                <p className="text-zinc-400 mb-4">Tribhuvan University - Kathmandu Engineering College</p>

                <div className="flex items-center text-zinc-300 mb-6">
                  <Calendar size={16} className="mr-2" />
                  <span>May 2021 - May 2025</span>
                </div>

                <p className="text-zinc-300">
                  Currently pursuing a degree in Computer Engineering, focusing on software development, algorithms,
                  data structures, and modern web technologies. Balancing academic studies with practical project work
                  to gain comprehensive knowledge in the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
