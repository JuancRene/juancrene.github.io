"use client"

import { useState, type FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactFormFormspree() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const formData = new FormData(e.currentTarget)

      // Replace this URL with your Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        e.currentTarget.reset()
        setFormStatus({
          success: true,
          message: "¡Gracias! Tu mensaje ha sido enviado correctamente.",
        })
      } else {
        const data = await response.json()
        throw new Error(data.error || "Hubo un error al enviar el formulario")
      }
    } catch (error) {
      console.error("Error sending form:", error)
      setFormStatus({
        success: false,
        message:
          "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o envía un correo directamente a juancruzrenearenas@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />
      <input type="hidden" name="_replyto" value="%email%" />

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

