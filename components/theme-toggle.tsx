"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }

    localStorage.setItem("theme", newTheme)
  }

  const setThemeAndApply = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#333] group-hover:text-[#FFEB3B]" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white group-hover:text-[#FFEB3B]" />
          <span className="sr-only">Toggle theme</span>
          <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#FFEB3B] group-hover:w-full group-hover:left-0 transition-all duration-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/90 dark:bg-[#2a2a40]/90 backdrop-blur-md border border-[#FFB6C1]/30"
      >
        <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10" onClick={() => setThemeAndApply("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10" onClick={() => setThemeAndApply("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10" onClick={() => setThemeAndApply("system")}>
          <span className="mr-2">🌓</span>
          <span>System</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10" onClick={() => setThemeAndApply("light")}>
          <span className="mr-2">🏖️</span>
          <span>Sunshine Beach</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10" onClick={() => setThemeAndApply("dark")}>
          <span className="mr-2">🍬</span>
          <span>Neon Candy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

