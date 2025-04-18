"use client"

import { useState, useEffect } from "react"
import { X, Search, File, Image, Music, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchModalProps {
  onClose: () => void
  files: Array<{
    id: string
    name: string
    type: string
    size?: string
  }>
}

export default function SearchModal({ onClose, files }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: string
      name: string
      type: string
      size?: string
    }>
  >([])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    const filteredResults = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(filteredResults)
  }, [searchTerm, files])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="w-6 h-6 text-[#FFB6C1]" />
      case "document":
        return <File className="w-6 h-6 text-[#64B5F6]" />
      case "music":
        return <Music className="w-6 h-6 text-[#81C784]" />
      case "video":
        return <Video className="w-6 h-6 text-[#BA68C8]" />
      default:
        return <File className="w-6 h-6 text-gray-400" />
    }
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

        <h2 className="text-xl font-bold mb-4 text-[#333] dark:text-white">Search Files</h2>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
            placeholder="Search by file name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 rounded-lg bg-white/50 dark:bg-[#1a1a2e]/50 hover:bg-[#FFEB3B]/10 transition-colors cursor-pointer"
                >
                  <div className="mr-3">{getFileIcon(file.type)}</div>
                  <div className="flex-1">
                    <p className="text-[#333] dark:text-white font-medium">{file.name}</p>
                    {file.size && <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() !== "" ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No files found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Type to search for files</p>
              <p className="text-sm mt-2">Search by file name in your cloud storage</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-[#FFB6C1] text-[#333] dark:text-white hover:bg-[#FFB6C1]/10"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

