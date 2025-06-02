"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Github, Linkedin, ExternalLink } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer elements
      gsap.fromTo(
        ".footer-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-zinc-900 border-t border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="footer-item mb-6 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Mukesh.dev
            </h2>
            <p className="text-zinc-400 mt-2">Software Engineer & Full Stack Developer</p>
          </div>

          <div className="footer-item flex space-x-6">
            <a
              href="https://github.com/MukeshMW1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="http://www.linkedin.com/in/mw1m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://react-portfolio-zeta-jade.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Portfolio"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="footer-item mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Mukesh Bhatta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
