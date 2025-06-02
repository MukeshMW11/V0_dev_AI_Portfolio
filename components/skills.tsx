"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "./section-heading"

const skillCategories = [
  {
    name: "Frontend",
    skills: ["JavaScript", "React", "Next.js", "Vue", "Nuxt", "GSAP", "Tailwind"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Nest.js", "Flask", "Python"],
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "Mongoose", "Prisma"],
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "Git", "GitHub", "Vercel", "Render", "Nginx"],
  },
  {
    name: "Languages",
    skills: ["JavaScript", "Python", "C/C++"],
  },
]

export default function Skills() {
  const skillsRef = useRef<HTMLElement>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate each skill category
      categoryRefs.current.forEach((category, index) => {
        gsap.fromTo(
          category,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          },
        )

        // Animate skill items within each category
        const skillItems = category?.querySelectorAll(".skill-item")
        gsap.fromTo(
          skillItems,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.3,
          },
        )
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={skillsRef} className="py-20 px-6 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Skills" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              ref={(el) => (categoryRefs.current[index] = el)}
              className="bg-zinc-800/30 backdrop-blur-sm rounded-lg p-6 border border-zinc-800"
            >
              <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-item bg-zinc-700/50 text-zinc-200 px-3 py-2 rounded-md text-sm hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
