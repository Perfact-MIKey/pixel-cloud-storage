"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PixelAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("How can I help you today?")
  const [isTyping, setIsTyping] = useState(false)

  const toggleAssistant = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Reset and start typing animation when opening
      setMessage("")
      setIsTyping(true)
    }
  }

  useEffect(() => {
    if (isTyping) {
      const fullMessage = "How can I help you today?"
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < fullMessage.length) {
          setMessage((prev) => prev + fullMessage[currentIndex])
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [isTyping])

  return (
    <div className="relative z-10">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white/90 dark:bg-[#2a2a40]/90 backdrop-blur-md rounded-xl shadow-lg border border-[#FFB6C1]/30 p-4 mb-2 animate-fade-in">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-medium text-[#333] dark:text-white">Pixel Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative mb-3">
            <div className="absolute -left-3 top-2 w-3 h-3 bg-white/90 dark:bg-[#2a2a40]/90 transform rotate-45 border-l border-t border-[#FFB6C1]/30"></div>
            <div className="bg-[#f0f0f0]/80 dark:bg-[#1a1a2e]/80 p-3 rounded-lg text-sm text-[#333] dark:text-white">
              {message}
              {isTyping && <span className="inline-block w-1.5 h-4 bg-[#FFB6C1] ml-0.5 animate-blink"></span>}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
            />
          </div>
        </div>
      )}

      <Button
        onClick={toggleAssistant}
        className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1]"
            : "bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1] hover:shadow-[0_0_15px_rgba(255,235,59,0.5)]"
        }`}
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <div
            className="w-6 h-6 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/pixel-cloud.png')" }}
          />
        </div>
      </Button>
    </div>
  )
}

