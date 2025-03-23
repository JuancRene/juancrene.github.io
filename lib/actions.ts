"use server"

import { z } from "zod"

// Esquema de validación para el formulario de contacto
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

type ContactFormData = z.infer<typeof ContactFormSchema>

export async function sendContactForm(formData: FormData) {
  try {
    // Extraer datos del formulario
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validar datos
    const result = ContactFormSchema.safeParse({
      name,
      email,
      subject,
      message,
    })

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Para despliegues estáticos, podemos simular el envío
    // En un entorno real, aquí enviarías el email usando un servicio como Nodemailer, SendGrid, etc.
    console.log("Form submission:", { name, email, subject, message })

    // Simulamos un pequeño retraso para mostrar el estado de carga
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Mensaje enviado correctamente. Te contactaré pronto.",
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error)
    return {
      success: false,
      message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
    }
  }
}

