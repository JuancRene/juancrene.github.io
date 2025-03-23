"use client"

import { useEffect, useRef } from "react"

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, radius: canvas.width * 0.4, color: "rgba(16, 185, 129, 0.2)" }, // emerald
      { x: canvas.width * 0.9, y: canvas.height * 0.2, radius: canvas.width * 0.5, color: "rgba(6, 182, 212, 0.2)" }, // cyan
      { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: canvas.width * 0.6, color: "rgba(20, 184, 166, 0.2)" }, // teal
    ]

    // Animation variables
    const speeds = gradientPoints.map(() => ({
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
      radius: (Math.random() - 0.5) * 0.2,
    }))

    // Animation loop
    function animate() {
      // Clear canvas with a very dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw gradient points
      for (let i = 0; i < gradientPoints.length; i++) {
        const point = gradientPoints[i]
        const speed = speeds[i]

        // Update position and radius
        point.x += speed.x
        point.y += speed.y
        point.radius += speed.radius

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) speed.x *= -1
        if (point.y < 0 || point.y > canvas.height) speed.y *= -1

        // Keep radius in bounds
        if (point.radius < canvas.width * 0.2 || point.radius > canvas.width * 0.7) {
          speed.radius *= -1
        }

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

