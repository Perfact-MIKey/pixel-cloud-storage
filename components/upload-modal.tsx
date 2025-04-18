"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadModalProps {
  onClose: () => void
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (files.length > 0) {
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            playVictorySound()
            return 100
          }
          return prev + 5
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [files])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files)
      setFiles(fileArray)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setFiles(fileArray)
    }
  }

  const playVictorySound = () => {
    // In a real implementation, this would play an 8-bit victory sound
    console.log("Playing 8-bit victory sound!")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white/90 dark:bg-[#2a2a40]/90 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-bold mb-4 text-[#333] dark:text-white">Upload Files</h2>

        <div
          className={`border-2 border-dashed rounded-xl p-8 mb-4 text-center transition-colors ${
            isDragging
              ? "border-[#FFEB3B] bg-[#FFEB3B]/10"
              : "border-[#FFB6C1]/30 hover:border-[#FFB6C1] dark:border-[#FFB6C1]/20 dark:hover:border-[#FFB6C1]/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {files.length === 0 ? (
            <>
              <Upload className="mx-auto h-12 w-12 text-[#FFB6C1] mb-2" />
              <p className="text-[#333] dark:text-white mb-2">Drag and drop files here</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or</p>
              <label className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white rounded-lg px-4 py-2 cursor-pointer inline-block">
                <Upload className="inline-block mr-2 h-4 w-4" />
                Browse Files
                <input type="file" multiple className="hidden" onChange={handleFileSelect} />
              </label>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <File className="h-8 w-8 text-[#FFB6C1]" />
                <div className="text-left">
                  <p className="text-[#333] dark:text-white font-medium">
                    {files.length === 1 ? files[0].name : `${files.length} files selected`}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {files.length === 1
                      ? `${(files[0].size / (1024 * 1024)).toFixed(2)} MB`
                      : `${files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024).toFixed(2)} MB total`}
                  </p>
                </div>
              </div>

              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, 
                      #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF
                    )`,
                  }}
                />
              </div>
              <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">{progress}%</p>
            </div>
          )}
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
            disabled={files.length === 0}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}

