"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import CssBackground from "./css-background"

// Dynamically import the WebGL background with no SSR
const WebGLBackground = dynamic(() => import("./webgl-background"), {
  ssr: false,
  loading: () => <CssBackground />,
})

// Fallback to a simpler canvas animation if needed
const AnimatedParticles = dynamic(() => import("./animated-particles"), {
  ssr: false,
  loading: () => <CssBackground />,
})

export default function ClientBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [useSimpleAnimation, setUseSimpleAnimation] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if device might struggle with WebGL
    const isLowPowerDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768

    setUseSimpleAnimation(isLowPowerDevice)

    // Listen for performance issues
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const fps = getFPS()
        if (fps < 30) {
          setUseSimpleAnimation(true)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Simple FPS counter
  const getFPS = () => {
    let fps = 60
    const times: number[] = []

    const refreshLoop = () => {
      window.requestAnimationFrame(() => {
        const now = performance.now()
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift()
        }
        times.push(now)
        fps = times.length
        refreshLoop()
      })
    }

    refreshLoop()
    return fps
  }

  // Use CSS background during SSR and initial mount
  if (!isMounted) {
    return <CssBackground />
  }

  // Use appropriate animation based on device capability
  return useSimpleAnimation ? <AnimatedParticles /> : <WebGLBackground />
}

