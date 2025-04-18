"use client"

import { useState } from "react"
import { Upload, Download, Search, Settings, User, Lightbulb, Cloud, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import FileExplorer from "@/components/file-explorer"
import PixelAssistant from "@/components/pixel-assistant"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import UploadModal from "@/components/upload-modal"
import StorageUsage from "@/components/storage-usage"
import CursorFollower from "@/components/cursor-follower"
import DownloadModal from "@/components/download-modal"
import BackgroundAnimation from "@/components/background-animation"
import SearchModal from "@/components/search-modal"
import MembershipModal from "@/components/membership-modal"
import CheckinModal from "@/components/checkin-modal"

export default function HomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [easterEggCount, setEasterEggCount] = useState(0)
  const [visualTrackingEnabled, setVisualTrackingEnabled] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showMembershipModal, setShowMembershipModal] = useState(false)
  const [showCheckinModal, setShowCheckinModal] = useState(false)
  const router = useRouter()

  const triggerEasterEgg = () => {
    setEasterEggCount((prev) => prev + 1)
  }

  // Navigate to login page when clicking the PixelCloud icon
  const navigateToLogin = () => {
    router.push("/login")
  }

  // Sample files for download modal
  const downloadableFiles = [
    { id: "1", name: "vacation.png", type: "image", size: "2.4 MB" },
    { id: "2", name: "report.pdf", type: "document", size: "1.2 MB" },
    { id: "3", name: "theme_song.mp3", type: "music", size: "4.7 MB" },
    { id: "4", name: "gameplay.mp4", type: "video", size: "24.8 MB" },
    { id: "5", name: "notes.txt", type: "document", size: "0.1 MB" },
    { id: "6", name: "profile.jpg", type: "image", size: "1.8 MB" },
    { id: "7", name: "presentation.pptx", type: "document", size: "5.3 MB" },
  ]

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-[#1a1a2e] transition-colors duration-300 overflow-hidden relative">
      {/* Cursor follower */}
      <CursorFollower intensity={1.5} />

      {/* Background animation */}
      <BackgroundAnimation opacity={20} />

      {/* Pixel noise background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat z-0"
        style={{ backgroundImage: "url('/pixel-noise.png')" }}
      />

      {/* Visual tracking effect */}
      {visualTrackingEnabled && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0000] via-[#00FF00] to-[#0000FF] opacity-50 animate-scan-horizontal" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#FF0000] via-[#00FF00] to-[#0000FF] opacity-50 animate-scan-vertical" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0000FF] via-[#00FF00] to-[#FF0000] opacity-50 animate-scan-horizontal-reverse" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0000FF] via-[#00FF00] to-[#FF0000] opacity-50 animate-scan-vertical-reverse" />
        </div>
      )}

      {/* Top navigation bar with glass effect */}
      <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-[#FFB6C1]/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToLogin}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center pixel-shadow hover:opacity-90 transition-opacity">
              <Cloud className="w-6 h-6 text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#333] dark:text-white hover:text-[#FFEB3B] dark:hover:text-[#FFEB3B] transition-colors">
              PixelCloud
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative group" onClick={() => setShowSearchModal(true)}>
              <Search className="w-5 h-5 text-[#333] dark:text-white group-hover:text-[#FFEB3B] transition-colors" />
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#FFEB3B] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Button>
            <Button variant="ghost" size="icon" className="relative group" onClick={() => setShowMembershipModal(true)}>
              <Lightbulb className="w-5 h-5 text-[#333] dark:text-white group-hover:text-[#FFEB3B] transition-colors" />
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#FFEB3B] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative group"
              onClick={() => (window.location.href = "/settings")}
            >
              <Settings className="w-5 h-5 text-[#333] dark:text-white group-hover:text-[#FFEB3B] transition-colors" />
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#FFEB3B] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative group" onClick={navigateToLogin}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center hover:opacity-90 transition-opacity">
                <User className="w-5 h-5 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 relative z-0">
        {/* Action buttons, storage usage, and visual tracking toggle */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6 mt-4">
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 pixel-shadow"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <Button
              variant="outline"
              className="border-[#FFB6C1] text-[#333] dark:text-white hover:bg-[#FFB6C1]/10 rounded-xl px-6 py-2"
              onClick={() => setShowDownloadModal(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Visual Tracking Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVisualTrackingEnabled((prev) => !prev)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  visualTrackingEnabled
                    ? "bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1]"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span className="sr-only">Toggle visual tracking</span>
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                    visualTrackingEnabled ? "left-8" : "left-1"
                  }`}
                />
                <Eye
                  className={`absolute top-1.5 h-4 w-4 transition-opacity ${
                    visualTrackingEnabled ? "right-1.5 text-white opacity-100" : "right-1.5 text-gray-400 opacity-50"
                  }`}
                />
              </button>
              <span className="text-xs text-[#333] dark:text-white">Visual Tracking</span>
            </div>

            {/* Storage usage component */}
            <StorageUsage usedSpace={256} totalSpace={1024} />
          </div>
        </div>

        {/* File explorer */}
        <FileExplorer onEasterEgg={triggerEasterEgg} easterEggCount={easterEggCount} />

        {/* Pixel Assistant */}
        <div className="fixed bottom-6 right-6">
          <PixelAssistant />
        </div>
      </main>

      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
      {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} files={downloadableFiles} />}
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} files={downloadableFiles} />}
      {showMembershipModal && (
        <MembershipModal
          onClose={() => setShowMembershipModal(false)}
          onCheckin={() => {
            setShowMembershipModal(false)
            setShowCheckinModal(true)
          }}
        />
      )}
      {showCheckinModal && <CheckinModal onClose={() => setShowCheckinModal(false)} />}
    </div>
  )
}

