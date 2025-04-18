"use client"

import { useState } from "react"
import { X, Download, File, Image, Music, Video, Check, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DownloadModalProps {
  onClose: () => void
  files: Array<{
    id: string
    name: string
    type: string
    size?: string
  }>
}

export default function DownloadModal({ onClose, files }: DownloadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadComplete, setDownloadComplete] = useState(false)

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const selectAll = () => {
    setSelectedFiles(files.map((file) => file.id))
  }

  const deselectAll = () => {
    setSelectedFiles([])
  }

  const handleDownload = () => {
    if (selectedFiles.length === 0) return

    setIsDownloading(true)

    // Simulate download progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setDownloadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setDownloadComplete(true)

        // Play 8-bit victory sound
        const audio = new Audio("/download-complete.mp3")
        audio.play().catch((e) => console.log("Audio play failed:", e))

        // Close modal after a delay
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    }, 150)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="w-8 h-8 text-[#FFB6C1]" />
      case "document":
        return <File className="w-8 h-8 text-[#64B5F6]" />
      case "music":
        return <Music className="w-8 h-8 text-[#81C784]" />
      case "video":
        return <Video className="w-8 h-8 text-[#BA68C8]" />
      default:
        return <File className="w-8 h-8 text-gray-400" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white/90 dark:bg-[#2a2a40]/90 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
          disabled={isDownloading}
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-bold mb-4 text-[#333] dark:text-white">Download Files</h2>

        {!isDownloading ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Select files to download</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs h-7 px-2" onClick={selectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 px-2" onClick={deselectAll}>
                  Deselect All
                </Button>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto mb-4 pr-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer transition-colors ${
                    selectedFiles.includes(file.id)
                      ? "bg-[#FFEB3B]/20 dark:bg-[#FFEB3B]/10"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="mr-3">
                    {selectedFiles.includes(file.id) ? (
                      <CheckCircle2 className="w-6 h-6 text-[#FFEB3B]" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                  </div>

                  <div className="mr-3">{getFileIcon(file.type)}</div>

                  <div className="flex-1">
                    <p className="text-[#333] dark:text-white font-medium">{file.name}</p>
                    {file.size && <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-[#FFB6C1] text-[#333] dark:text-white hover:bg-[#FFB6C1]/10"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white"
                disabled={selectedFiles.length === 0}
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download ({selectedFiles.length})
              </Button>
            </div>
          </>
        ) : (
          <div className="py-4">
            {downloadComplete ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] mx-auto flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#333] dark:text-white mb-2">Download Complete!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"} downloaded successfully
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-center">
                  <p className="text-[#333] dark:text-white mb-2">
                    Downloading {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"}...
                  </p>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${downloadProgress}%`,
                      background: `linear-gradient(to right, 
                        #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF
                      )`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{downloadProgress}%</span>
                  <span>
                    {Math.round((downloadProgress * selectedFiles.length) / 100)}/{selectedFiles.length} files
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

