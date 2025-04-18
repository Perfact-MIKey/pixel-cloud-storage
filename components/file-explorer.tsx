"use client"

import { useState } from "react"
import { File, Folder, Image, Music, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FileExplorerProps {
  onEasterEgg: () => void
  easterEggCount: number
}

interface FileItem {
  id: string
  name: string
  type: "folder" | "image" | "document" | "music" | "video"
  size?: string
  modified: string
}

export default function FileExplorer({ onEasterEgg, easterEggCount }: FileExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "Photos", type: "folder", modified: "2 days ago" },
    { id: "2", name: "Documents", type: "folder", modified: "1 week ago" },
    { id: "3", name: "Music", type: "folder", modified: "3 days ago" },
    { id: "4", name: "vacation.png", type: "image", size: "2.4 MB", modified: "Today" },
    { id: "5", name: "report.pdf", type: "document", size: "1.2 MB", modified: "Yesterday" },
    { id: "6", name: "theme_song.mp3", type: "music", size: "4.7 MB", modified: "3 days ago" },
    { id: "7", name: "gameplay.mp4", type: "video", size: "24.8 MB", modified: "1 week ago" },
  ])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="w-10 h-10 text-[#FFEB3B]" />
      case "image":
        return <Image className="w-10 h-10 text-[#FFB6C1]" />
      case "document":
        return <File className="w-10 h-10 text-[#64B5F6]" />
      case "music":
        return <Music className="w-10 h-10 text-[#81C784]" />
      case "video":
        return <Video className="w-10 h-10 text-[#BA68C8]" />
      default:
        return <File className="w-10 h-10 text-gray-400" />
    }
  }

  // Easter egg sprite animation
  const renderEasterEgg = () => {
    if (easterEggCount >= 5) {
      return (
        <div className="fixed z-50 animate-bounce-horizontal">
          <div className="w-16 h-16 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/kirby-sprite.png')" }} />
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-xl p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-[#333] dark:text-white">My Files</h2>

      {renderEasterEgg()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <Card
            key={file.id}
            className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 hover:border-[#FFB6C1]/50 transition-all duration-300 p-4 rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEasterEgg()}>
                <div className="p-2 rounded-lg bg-gradient-to-br from-white to-[#f0f0f0] dark:from-[#2a2a40] dark:to-[#1a1a2e] shadow-md">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h3 className="font-medium text-[#333] dark:text-white">{file.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {file.size && <span>{file.size}</span>}
                    <span>{file.modified}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/90 dark:bg-[#2a2a40]/90 backdrop-blur-md border border-[#FFB6C1]/30"
                >
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10">Download</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10">Share</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#FFEB3B]/10">Rename</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500/10">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

