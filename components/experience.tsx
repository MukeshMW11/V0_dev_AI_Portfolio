"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import SectionHeading from "./section-heading"

const projects = [
  {
    title: "Netflix Clone",
    company: "Netflix",
    year: "2023",
    description: "Built a full stack Netflix Clone where users can interact, scroll and watch movies",
    github: "https://github.com/MukeshMW1/NEtflix-Clone-React-Js-and-Firebase",
    live: "",
    technologies: ["React", "Firebase", "JavaScript", "CSS"],
  },
  {
    title: "Prescripto - Full Stack Web App",
    company: "Prescripto",
    year: "2024",
    description:
      "Built a full scale web app using React, Express Js, and MongoDB. Allows users to login with their credentials and book appointments with doctors.",
    github: "https://github.com/MukeshMW1/Prescripto_Full_Stack_",
    live: "",
    technologies: ["React", "Express.js", "MongoDB", "Node.js"],
  },
  {
    title: "Zentry GSAP Clone",
    company: "Zentry",
    year: "2024",
    description:
      "A clone of the zentry website with cool GSAP animations. Responsive design with scroll animations and smooth scrolling.",
    github: "https://github.com/MukeshMW1/GSAP_ZENTRY_WEB",
    live: "https://zentry.com/",
    technologies: ["GSAP", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Smart Attendance ML",
    company: "Recognition",
    year: "2023",
    description:
      "Implemented ML algorithms to recognize faces using video cv2. Developed a UI with React to access features including facial recognition, database storage, and training.",
    github: "https://github.com/MukeshMW1/Smart-Attendance",
    live: "",
    technologies: ["Python", "OpenCV", "React", "Machine Learning"],
  },
]

export default function Experience() {
  const experienceRef = useRef<HTMLElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate each project card
      projectRefs.current.forEach((project, index) => {
        gsap.fromTo(
          project,
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
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          },
        )
      })
    }, experienceRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={experienceRef} className="py-20 px-6 bg-zinc-800/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Experience & Projects" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 border border-zinc-800 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {project.company} • {project.year}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    aria-label="GitHub repository"
                  >
                    <Github size={20} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                      aria-label="Live site"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-zinc-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
