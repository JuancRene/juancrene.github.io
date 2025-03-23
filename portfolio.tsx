"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Menu, X, Mail } from "lucide-react"
import SimpleBackground from "@/components/simple-background"

// Import sections
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })

      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fondo animado */}
      <SimpleBackground />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
          >
            &lt;JR&gt;
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: "inicio", label: "inicio" },
              { id: "sobre-mi", label: "sobre mi" },
              { id: "servicios", label: "servicios" },
              { id: "experiencia", label: "experiencia" },
              { id: "conocimientos", label: "conocimientos" },
              { id: "contacto", label: "contacto" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm uppercase tracking-wider hover:text-emerald-400 transition-colors ${
                  activeSection === item.id ? "text-emerald-400 font-medium" : "text-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 border-t border-gray-800">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {[
                { id: "inicio", label: "inicio" },
                { id: "sobre-mi", label: "sobre mi" },
                { id: "servicios", label: "servicios" },
                { id: "experiencia", label: "experiencia" },
                { id: "conocimientos", label: "conocimientos" },
                { id: "contacto", label: "contacto" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm uppercase tracking-wider py-2 text-left ${
                    activeSection === item.id ? "text-emerald-400 font-medium" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Sections */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 md:mb-0"
            >
              &lt;JR&gt;
            </button>

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Juan Cruz Rene. Todos los derechos reservados.
            </p>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="https://github.com/JuancRene"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/juan-cruz-rene-arenas-a1a690230/"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:juancruzrenearenas@gmail.com"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

