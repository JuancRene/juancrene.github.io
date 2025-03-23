"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 2000

    const posArray = new Float32Array(particleCount * 3)
    const scaleArray = new Float32Array(particleCount)

    // Fill with random positions
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 25 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i + 2] = radius * Math.cos(phi)

      // Random scale for each particle
      scaleArray[i / 3] = Math.random() * 2 + 0.5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Create shader material
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        
        void main() {
          // Create a circular particle
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          
          // Calculate color based on position
          float r = smoothstep(0.0, 30.0, abs(vPosition.x)) * 0.1;
          float g = smoothstep(0.0, 30.0, abs(vPosition.y)) * 0.6 + 0.2;
          float b = smoothstep(0.0, 30.0, abs(vPosition.z)) * 0.6 + 0.2;
          
          gl_FragColor = vec4(r, g, b, 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particleSystem)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particle system
      particleSystem.rotation.x = elapsedTime * 0.05
      particleSystem.rotation.y = elapsedTime * 0.03

      // Render
      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      // Subtle camera movement based on mouse position
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.01
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.01
      camera.lookAt(scene.position)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

