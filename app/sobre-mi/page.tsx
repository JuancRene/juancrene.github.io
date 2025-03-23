"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronRight, GraduationCap, Code, Languages } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import OptimizedImage from "@/components/optimized-image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
          <motion.div
            animate={{
              x: ["0%", "100%", "50%", "0%"],
              y: ["0%", "50%", "100%", "0%"],
              scale: [1, 1.2, 1, 0.8, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 30,
              ease: "linear",
            }}
            className="absolute left-1/4 top-1/4 w-[30rem] h-[30rem] rounded-full bg-emerald-500/40 blur-3xl"
          />
          <motion.div
            animate={{
              x: ["100%", "0%", "-100%", "0%", "100%"],
              y: ["0%", "100%", "0%", "-100%", "0%"],
              scale: [1, 0.8, 1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 40,
              ease: "linear",
            }}
            className="absolute right-1/4 bottom-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/40 blur-3xl"
          />
          <motion.div
            animate={{
              x: ["-50%", "50%", "-50%"],
              y: ["50%", "-50%", "50%"],
              scale: [1, 1.5, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 35,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 w-[30rem] h-[30rem] rounded-full bg-emerald-400/30 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Sobre Mí
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="md:col-span-1">
                <div className="relative w-full aspect-square max-w-xs mx-auto md:mx-0">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-20"></div>
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-emerald-500/20">
                    <OptimizedImage
                      src="/images/juan-profile.png"
                      alt="Juan Cruz Rene Arenas"
                      fill
                      className="object-cover"
                      fallbackSrc="/placeholder.svg?height=400&width=400"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Juan Cruz Rene Arenas</h2>
                <p className="text-gray-300 mb-6">
                  ¡Hola! Soy Juan, un desarrollador de software de Paraná, Entre Ríos. Actualmente estoy cursando la
                  Tecnicatura en Programación en la UTN, donde cada día aprendo algo nuevo que me apasiona.
                </p>
                <p className="text-gray-300 mb-6">
                  Me encanta resolver problemas a través del código. Desde que descubrí la programación, me ha fascinado
                  cómo podemos crear soluciones que realmente impactan en el día a día de las personas y las empresas.
                  Este año tuve la oportunidad de desarrollar un sistema de gestión completo para una empresa, lo que
                  fue todo un desafío y una experiencia increíble.
                </p>
                <p className="text-gray-300 mb-6">
                  Cuando no estoy programando o estudiando, me gusta compartir lo que sé con otros. Por eso también
                  trabajo como profesor enseñando programación a niños y jóvenes. Ver cómo se iluminan sus caras cuando
                  logran que su código funcione es una de las mejores sensaciones.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Educación</h3>
                      <p className="text-gray-300">
                        Universidad Tecnológica Nacional - Tecnicatura Universitaria en Programación (2022-actualidad)
                      </p>
                      <p className="text-gray-400 mt-2">
                        En la UTN he aprendido desde lo básico hasta conceptos avanzados de programación. C# y .NET,
                        Java, bases de datos, desarrollo web... cada materia me ha dado herramientas que uso a diario en
                        mis proyectos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1">
                      <Code size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Habilidades Técnicas</h3>
                      <p className="text-gray-300">
                        Me especializo en desarrollo web frontend y backend, y bases de datos. Me gusta tanto crear
                        interfaces atractivas como implementar la lógica detrás de ellas, y disfruto especialmente
                        cuando puedo trabajar en proyectos que abarcan ambas áreas.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "HTML",
                          "CSS",
                          "JavaScript",
                          "C#",
                          "Java",
                          "SQL",
                          "TypeScript",
                          "React",
                          "Next.js",
                          "NodeJS",
                          "Python",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-gray-800 text-sm font-medium text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1">
                      <Languages size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Idiomas</h3>
                      <ul className="text-gray-300 space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Español (Nativo)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Inglés
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/experiencia">
                    <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                      Ver mi experiencia <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

