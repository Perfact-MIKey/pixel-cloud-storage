"use client"

import { useState } from "react"
import { X, Calendar, Gift, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CheckinModalProps {
  onClose: () => void
}

export default function CheckinModal({ onClose }: CheckinModalProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(7)
  const daysInMonth = 30
  const checkedDays = Array(currentStreak)
    .fill(true)
    .concat(Array(daysInMonth - currentStreak).fill(false))

  const handleCheckin = () => {
    setIsCheckedIn(true)
    setCurrentStreak(currentStreak + 1)

    // Simulate confetti effect
    setTimeout(() => {
      const confettiElements = document.querySelectorAll(".confetti")
      confettiElements.forEach((el) => {
        el.classList.add("animate-confetti")
      })
    }, 100)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white/90 dark:bg-[#2a2a40]/90 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti elements */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="confetti absolute w-2 h-2 rounded-full opacity-0"
            style={{
              backgroundColor: ["#FFEB3B", "#FFB6C1", "#64B5F6", "#81C784", "#BA68C8"][Math.floor(Math.random() * 5)],
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.5 + Math.random() * 1}s`,
            }}
          />
        ))}

        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#333] dark:text-white">Daily Check-in</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Current streak: <span className="font-medium text-[#FFEB3B]">{currentStreak} days</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: daysInMonth }).map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                  index < currentStreak
                    ? "bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] text-white"
                    : index === currentStreak && isCheckedIn
                      ? "bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] text-white animate-pulse"
                      : index === currentStreak
                        ? "border-2 border-dashed border-[#FFEB3B] text-[#333] dark:text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                {index < currentStreak || (index === currentStreak && isCheckedIn) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#FFEB3B]/10 dark:bg-[#FFEB3B]/5 rounded-lg p-4 border border-[#FFEB3B]/20 mb-4">
            <div className="flex items-start">
              <Gift className="h-5 w-5 text-[#FFEB3B] mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#333] dark:text-white font-medium">Reward Progress</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Check in for 15 consecutive days to receive 3 days of membership bonus!
                </p>
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1]"
                    style={{ width: `${(currentStreak / 15) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{currentStreak}/15 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white w-full py-6 text-lg"
            onClick={handleCheckin}
            disabled={isCheckedIn}
          >
            {isCheckedIn ? "Checked in today!" : "Check in now"}
          </Button>
        </div>
      </div>
    </div>
  )
}

