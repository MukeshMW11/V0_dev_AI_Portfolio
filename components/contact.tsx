"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SectionHeading from "./section-heading"

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate the form
      gsap.fromTo(
        formRef.current,
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
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animate form elements
      gsap.fromTo(
        ".form-element",
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
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: 0.3,
        },
      )
    }, contactRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" ref={contactRef} className="py-20 px-6 bg-zinc-800/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Contact Me" />

        <div className="mt-12 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-zinc-300 mb-6">
              I'm always open to new opportunities and collaborations. Feel free to reach out if you have any questions
              or just want to say hello!
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Mail size={20} className="text-purple-400" />
              </div>
              <a
                href="mailto:mukeshbhattampb111@gmail.com"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                mukeshbhattampb111@gmail.com
              </a>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
              <h4 className="text-lg font-semibold text-white mb-3">Let's Connect</h4>
              <p className="text-zinc-400 mb-4">
                Follow me on social media or check out my portfolio for more projects and updates.
              </p>

              <div className="flex gap-4">
                <a
                  href="http://www.linkedin.com/in/mw1m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/MukeshMW1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://react-portfolio-zeta-jade.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-6 border border-zinc-800"
            >
              <div className="mb-4 form-element">
                <label htmlFor="name" className="block text-zinc-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:border-purple-500 text-white"
                />
              </div>

              <div className="mb-4 form-element">
                <label htmlFor="email" className="block text-zinc-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:border-purple-500 text-white"
                />
              </div>

              <div className="mb-6 form-element">
                <label htmlFor="message" className="block text-zinc-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="bg-zinc-800 border-zinc-700 focus:border-purple-500 text-white min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="form-element w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : isSubmitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </Button>

              {isSubmitted && (
                <p className="mt-4 text-green-400 text-center">
                  Thank you for your message! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
