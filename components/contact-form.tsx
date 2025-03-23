"use client"

import { useState, type FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    const form = e.currentTarget
    const formData = new FormData(form)

    // Create the email content
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !subject || !message) {
      setFormStatus({
        success: false,
        message: "Por favor, completa todos los campos.",
      })
      setIsSubmitting(false)
      return
    }

    // Create the email content
    const emailContent = `
      Nombre: ${name}
      Email: ${email}
      Asunto: ${subject}
      Mensaje: ${message}
    `

    try {
      // Use mailto link for static sites
      const mailtoLink = `mailto:juancruzrenearenas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`

      // Open the user's email client
      window.open(mailtoLink, "_blank")

      // Reset the form
      form.reset()

      setFormStatus({
        success: true,
        message: "¡Gracias! Se abrirá tu cliente de correo para enviar el mensaje.",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus({
        success: false,
        message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o envía un correo directamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-gray-400">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Tu nombre"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-gray-400">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Tu email"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm text-gray-400">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Asunto del mensaje"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-gray-400">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Tu mensaje"
          required
        ></textarea>
      </div>

      {formStatus.message && (
        <div
          className={`p-3 rounded-md ${formStatus.success ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}
        >
          {formStatus.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar Mensaje"
        )}
      </Button>
    </form>
  )
}

