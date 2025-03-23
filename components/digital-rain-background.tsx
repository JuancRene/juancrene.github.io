"use client"

import { useEffect, useRef } from "react"

export default function DigitalRainBackground() {
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

    // Characters to display (binary, hex, and some special characters)
    const chars = "01</>{}[]#:;JSHTMLCSSREACTNEXTjs"

    // Column setup
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Drops - one per column, with random starting y position
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Colors for the rain (using your brand colors)
    const colors = [
      "#10b981", // emerald-500
      "#06b6d4", // cyan-500
      "#14b8a6", // teal-500
    ]

    // Animation loop
    function draw() {
      // Black background with opacity to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = `${fontSize}px monospace`

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Choose a color based on position (creates a gradient effect)
        const colorIndex = Math.floor((drops[i] / canvas.height) * colors.length)
        const color = colors[Math.min(colorIndex, colors.length - 1)]

        // Set varying opacity based on position
        const opacity = Math.min(1, Math.max(0.1, drops[i] / canvas.height))
        ctx.fillStyle =
          color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i])

        // Move the drop down
        drops[i] += fontSize * (Math.random() * 0.5 + 0.5)

        // Reset drop to top with random offset when it reaches bottom
        if (drops[i] > canvas.height) {
          drops[i] = Math.random() * -100
        }
      }

      requestAnimationFrame(draw)
    }

    // Start animation
    const animationId = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />
}

