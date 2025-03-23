"use client"

import { useEffect, useRef } from "react"

export default function SimpleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas al tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Crear partículas
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 200) + 150}, ${Math.floor(Math.random() * 200) + 150}, 0.5)`,
      })
    }

    // Función para dibujar líneas entre partículas cercanas
    function drawLines() {
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Bucle de animación
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Actualizar posición
        p.x += p.speedX
        p.y += p.speedY

        // Rebotar en los bordes
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Dibujar líneas
      drawLines()

      requestAnimationFrame(animate)
    }

    // Iniciar animación
    const animationId = requestAnimationFrame(animate)

    // Limpieza
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ opacity: 0.3 }} />
}

