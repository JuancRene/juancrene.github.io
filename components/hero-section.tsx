"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import EmailLink from "./email-link"

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black z-10"></div>
        {/* Use a div with background image for better static export compatibility */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url("/images/hero-background.png")' }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,150,0.1),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-emerald-400 text-lg md:text-xl font-medium mb-4">¡BIENVENIDO!</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Soy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Juan Cruz Rene
            </span>
            ,
            <br />
            Desarrollador de Software
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Especializado en desarrollo web frontend, backend y bases de datos. Creando soluciones digitales con pasión
            y precisión.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/proyectos"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center"
            >
              Ver mis proyectos <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <EmailLink buttonStyle className="px-6 py-3 rounded-full">
              Contáctame
            </EmailLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

