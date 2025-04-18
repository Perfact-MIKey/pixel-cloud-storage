"use client"

import { useEffect, useState, useRef } from "react"

interface CursorFollowerProps {
  intensity?: number // Controls the visual impact (1 is default, higher values = more intense)
}

export default function CursorFollower({ intensity = 1 }: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      opacity: number
      color: string
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
    }>
  >([])
  const [particleId, setParticleId] = useState(0)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // Enhanced animation with requestAnimationFrame for smoother performance
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Update cursor position with smoother easing
      setPosition((prev) => ({
        x: prev.x + (lastPosition.x - prev.x) * 0.2,
        y: prev.y + (lastPosition.y - prev.y) * 0.2,
      }))

      // Update particles with better physics
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            opacity: particle.opacity - 0.02,
            size: particle.size - 0.15,
            rotation: particle.rotation + particle.rotationSpeed,
          }))
          .filter((particle) => particle.opacity > 0 && particle.size > 0),
      )
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Calculate velocity based on mouse movement
      const newVelocity = {
        x: e.clientX - lastPosition.x,
        y: e.clientY - lastPosition.y,
      }

      setVelocity(newVelocity)
      setLastPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Add particles based on movement speed and intensity
      const speed = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y)
      const particleChance = Math.min(1, speed * 0.08 * intensity)

      if (Math.random() < particleChance || isClicking) {
        const colors = ["#FFEB3B", "#FFB6C1", "#64B5F6", "#81C784", "#BA68C8"]
        const shapes = isClicking ? ["star", "circle", "square", "triangle"] : ["circle"]
        const shape = shapes[Math.floor(Math.random() * shapes.length)]

        const newParticle = {
          id: particleId,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 12 * intensity + 5,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 3 * intensity,
          speedY: (Math.random() - 0.5) * 3 * intensity - (isClicking ? 2 : 0), // Add upward motion when clicking
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5,
        }

        setParticles((prev) => [...prev, newParticle])
        setParticleId((prev) => prev + 1)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Create a burst of particles on click
      const burstCount = 10 * intensity
      const colors = ["#FFEB3B", "#FFB6C1", "#64B5F6", "#81C784", "#BA68C8"]

      const newParticles = []
      for (let i = 0; i < burstCount; i++) {
        newParticles.push({
          id: particleId + i,
          x: lastPosition.x,
          y: lastPosition.y,
          size: Math.random() * 15 * intensity + 8,
          opacity: 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 6 * intensity,
          speedY: (Math.random() - 0.5) * 6 * intensity - 2, // Upward bias
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        })
      }
      setParticles((prev) => [...prev, ...newParticles])
      setParticleId((prev) => prev + burstCount)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [particleId, lastPosition, intensity, isClicking])

  if (!isVisible) return null

  // Calculate size based on velocity and intensity
  const cursorSize = Math.min(14, 8 + Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y) * 0.15 * intensity)
  const glowSize = cursorSize * 2.5
  const pulseSize = isClicking ? glowSize * 1.5 : glowSize

  return (
    <>
      {/* Main cursor follower */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.1s, height 0.1s",
        }}
      >
        <div
          className={`rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] opacity-40 blur-sm ${isClicking ? "animate-pulse" : ""}`}
          style={{
            width: `${pulseSize}px`,
            height: `${pulseSize}px`,
          }}
        />
        <div
          className="absolute rounded-full bg-white opacity-70"
          style={{
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            left: `${(glowSize - cursorSize) / 2}px`,
            top: `${(glowSize - cursorSize) / 2}px`,
          }}
        />
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40 mix-blend-screen"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            borderRadius: "50%",
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </>
  )
}

