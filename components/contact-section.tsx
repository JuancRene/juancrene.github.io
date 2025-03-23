"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import the ContactForm component
import ContactForm from "@/components/contact-form"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({})
  const { showToast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})

    try {
      const formData = new FormData(event.currentTarget)

      // For static exports, we'll simulate the form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      showToast({
        title: "Mensaje enviado",
        description: "Mensaje enviado correctamente. Te contactaré pronto.",
        variant: "default",
      })

      // Reset the form
      event.currentTarget.reset()
    } catch (error) {
      showToast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctame</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos! Estoy disponible para nuevas oportunidades y colaboraciones.
          </p>
        </div>

        {/* Replace the form with our ContactForm component */}
        <div className="max-w-3xl mx-auto">
          <ContactForm />

          <div className="mt-12 flex justify-center space-x-6">
            <SocialLink icon={<Github className="h-5 w-5" />} label="GitHub" href="https://github.com/JuancRene" />
            <SocialLink
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/juan-cruz-rene-arenas-a1a690230/"
            />
            <SocialLink
              icon={<MessageSquare className="h-5 w-5" />}
              label="WhatsApp"
              href="https://wa.me/543436238873"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-2">O contáctame directamente:</p>
            <a
              href="mailto:juancruzrenearenas@gmail.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              juancruzrenearenas@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-400 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white transition-all"
      aria-label={label}
    >
      {icon}
    </Link>
  )
}

