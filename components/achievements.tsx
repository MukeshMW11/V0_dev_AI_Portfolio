"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, TrendingUp, Users } from "lucide-react"
import SectionHeading from "./section-heading"

const achievements = [
  {
    title: "User Engagement Boost",
    description: "Created better animated UI to make it more engaging.",
    icon: <TrendingUp size={24} className="text-purple-400" />,
  },
  {
    title: "Optimized Performance",
    description: "Reduced loading time by 40% through efficient coding.",
    icon: <Award size={24} className="text-purple-400" />,
  },
  {
    title: "Team Leadership Success",
    description: "Led a team of 4 developers in successful project delivery.",
    icon: <Users size={24} className="text-purple-400" />,
  },
]

export default function Achievements() {
  const achievementsRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate each achievement item
      itemRefs.current.forEach((item, index) => {
        gsap.fromTo(
          item,
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
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          },
        )

        // Animate the icon
        const icon = item?.querySelector(".achievement-icon")
        gsap.fromTo(
          icon,
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
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2 + 0.3,
          },
        )
      })
    }, achievementsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" ref={achievementsRef} className="py-20 px-6 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Key Achievements" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="bg-zinc-800/30 backdrop-blur-sm rounded-lg p-6 border border-zinc-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="achievement-icon bg-purple-500/20 p-4 rounded-full inline-flex mb-4">
                {achievement.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                {achievement.title}
              </h3>

              <p className="text-zinc-300">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
