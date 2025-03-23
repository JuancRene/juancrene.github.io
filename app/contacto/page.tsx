import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Github, Linkedin, MessageSquare, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Import the ContactForm component
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Contacto
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <ContactCard icon={<Phone size={24} />} title="Teléfono" info="+543436238873" link="tel:+543436238873" />

              <ContactCard
                icon={<Mail size={24} />}
                title="Email"
                info="juancruzrenearenas@gmail.com"
                link="mailto:juancruzrenearenas@gmail.com"
              />

              <ContactCard
                icon={<MapPin size={24} />}
                title="Ubicación"
                info="Paraná, Entre Ríos, Argentina"
                link="#"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Replace the form in the first column with our ContactForm component */}
              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Envíame un mensaje</h2>
                <ContactForm />
              </div>

              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Conéctate conmigo</h2>

                <p className="text-gray-300 mb-8">
                  Puedes encontrarme en las siguientes plataformas o contactarme directamente por WhatsApp o email.
                </p>

                <div className="space-y-4">
                  <SocialLink
                    icon={<Github size={20} />}
                    platform="GitHub"
                    username="JuancRene"
                    link="https://github.com/JuancRene"
                  />

                  <SocialLink
                    icon={<Linkedin size={20} />}
                    platform="LinkedIn"
                    username="Juan Cruz Rene Arenas"
                    link="https://www.linkedin.com/in/juan-cruz-rene-arenas-a1a690230/"
                  />

                  <SocialLink
                    icon={<MessageSquare size={20} />}
                    platform="WhatsApp"
                    username="+543436238873"
                    link="https://wa.me/543436238873"
                  />
                </div>

                <div className="mt-8 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <p className="text-emerald-400 text-sm">
                    Estoy disponible para proyectos freelance y oportunidades laborales. ¡No dudes en contactarme!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/">
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ContactCard({
  icon,
  title,
  info,
  link,
}: {
  icon: React.ReactNode
  title: string
  info: string
  link?: string
}) {
  const content = (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-emerald-500/50 transition-all h-full flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{info}</p>
    </div>
  )

  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}

function SocialLink({
  icon,
  platform,
  username,
  link,
}: {
  icon: React.ReactNode
  platform: string
  username: string
  link: string
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-300">{platform}</h3>
        <p className="text-emerald-400">{username}</p>
      </div>
    </Link>
  )
}

