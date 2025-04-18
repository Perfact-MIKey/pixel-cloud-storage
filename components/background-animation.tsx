"use client"

import { useEffect, useRef } from "react"

interface BackgroundAnimationProps {
  opacity?: number // Control the opacity of the animation (0-100)
}

export default function BackgroundAnimation({ opacity = 30 }: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create pixel particles
    const particles: Array<{
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      life: number
      maxLife: number
    }> = []

    const colors = ["#FFEB3B", "#FFB6C1", "#64B5F6", "#81C784", "#BA68C8"]

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        ctx.globalAlpha = 1 - p.life / p.maxLife
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)

        // Update position
        p.x += p.speedX
        p.y += p.speedY
        p.life++

        // Reset particle if it's dead or out of bounds
        if (p.life >= p.maxLife || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            life: 0,
            maxLife: Math.random() * 200 + 100,
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: `${opacity}%` }} />
  )
}

