"use client"

import type React from "react"

import { useState } from "react"
import { Cloud, User, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import CursorFollower from "@/components/cursor-follower"
import BackgroundAnimation from "@/components/background-animation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [fireworkId, setFireworkId] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process - shorter delay for better UX
    setTimeout(() => {
      setIsLoading(false)
      setIsTransitioning(true)

      // Navigate to home immediately after showing transition effect
      router.push("/")
    }, 800) // Reduced from 1500ms for faster response
  }

  const handleInputFocus = () => {
    setShowFireworks(true)

    // Create fireworks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const newFirework = {
          id: fireworkId + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.5,
          color: ["#FFEB3B", "#FFB6C1", "#64B5F6", "#81C784", "#BA68C8"][Math.floor(Math.random() * 5)],
        }

        setFireworks((prev) => [...prev, newFirework])
      }, i * 200)
    }

    setFireworkId((prev) => prev + 5)

    // Hide fireworks after a while
    setTimeout(() => {
      setShowFireworks(false)
      setFireworks([])
    }, 2000)
  }

  return (
    <div
      className={`min-h-screen bg-[#FFF8DC] dark:bg-[#1a1a2e] flex flex-col items-center justify-center p-4 relative overflow-hidden ${isTransitioning ? "login-transition" : ""}`}
    >
      {/* Background animation */}
      <BackgroundAnimation opacity={30} />

      {/* Cursor follower */}
      <CursorFollower intensity={1.5} />

      {/* Pixel noise background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat"
        style={{ backgroundImage: "url('/pixel-noise.png')" }}
      />

      {/* Fireworks */}
      {showFireworks &&
        fireworks.map((firework) => (
          <div
            key={firework.id}
            className="absolute animate-firework"
            style={{
              left: `${firework.x}px`,
              top: `${firework.y}px`,
            }}
          >
            <div className="w-4 h-4 rounded-full animate-ping" style={{ backgroundColor: firework.color }} />
          </div>
        ))}

      {/* Login card */}
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1] mb-4 pixel-shadow">
            <Cloud className="w-8 h-8 text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#333] dark:text-white mb-2">PixelCloud</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to access your cloud storage</p>
        </div>

        <div className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-md rounded-xl border border-[#FFB6C1]/30 p-6 shadow-xl pixel-shadow">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50 transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#FFB6C1]/30 text-[#FFEB3B] focus:ring-[#FFEB3B]/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#333] dark:text-white">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm text-[#FFEB3B] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-[#FFEB3B] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2025 PixelCloud. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

