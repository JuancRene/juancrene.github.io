"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import OptimizedImage from "./optimized-image"

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
        <motion.div
          initial={{ x: "-100%", y: "-100%" }}
          animate={{
            x: "100%",
            y: "100%",
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            },
          }}
          className="absolute -left-64 -top-64 w-[30rem] h-[30rem] rounded-full bg-emerald-500/40 blur-3xl"
        />
        <motion.div
          initial={{ x: "100%", y: "-50%" }}
          animate={{
            x: "-100%",
            y: "50%",
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 25,
              ease: "linear",
            },
          }}
          className="absolute -right-64 top-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/40 blur-3xl"
        />
        <motion.div
          initial={{ x: "0%", y: "100%" }}
          animate={{
            x: "50%",
            y: "-100%",
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 30,
              ease: "linear",
            },
          }}
          className="absolute left-1/3 -bottom-64 w-[30rem] h-[30rem] rounded-full bg-emerald-400/30 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-2/5"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-20"></div>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-emerald-500/20">
                <OptimizedImage
                  src="/images/juan-profile.png"
                  alt="Juan Cruz Rene Arenas"
                  fill
                  className="object-cover"
                  priority
                  fallbackSrc="/placeholder.svg?height=400&width=400"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-3/5"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Mí</span>
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                ¡Hola! Soy Juan, un desarrollador de software de Paraná, Entre Ríos. Actualmente estoy estudiando en la
                UTN mientras trabajo en proyectos que me apasionan.
              </p>
              <p>
                Me especializo en desarrollo web, tanto frontend como backend, y bases de datos. Este año tuve la
                oportunidad de desarrollar un sistema de gestión completo para una empresa, lo que fue un gran desafío y
                una experiencia increíble.
              </p>
              <p>
                Además de programar, me gusta enseñar lo que sé a otros. Por eso también trabajo como profesor de
                programación para niños y jóvenes, algo que me llena de satisfacción.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "HTML",
                "CSS",
                "C#",
                "Java",
                "SQL",
                "JavaScript",
                "React",
                "Next.js",
                "TypeScript",
                "NodeJS",
                "Python",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/sobre-mi"
                className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Conoce más sobre mí <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

