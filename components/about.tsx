"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "./section-heading"

export default function About() {
  const aboutRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animate the image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div ref={textRef} className="space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed">
              I am a Software Engineer with expertise in full-stack web development, specializing in React.js, Next.js,
              Node.js, and Python. An AI/ML enthusiast, I am passionate about leveraging emerging technologies to create
              innovative solutions.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              I focus on building responsive, scalable applications that deliver seamless user experiences and thrive in
              collaborative environments to produce high-quality, efficient results.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Currently pursuing my degree in Computer Engineering at Tribhuvan University, I balance my academic
              studies with practical project work to continuously expand my skills and knowledge in the field.
            </p>
          </div>

          <div ref={imageRef} className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">MB</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
