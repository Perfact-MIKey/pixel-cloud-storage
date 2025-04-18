"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  User,
  Shield,
  Palette,
  Bell,
  HardDrive,
  Share2,
  Sun,
  Moon,
  Upload,
  X,
  Image,
  File,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import CursorFollower from "@/components/cursor-follower"
import BackgroundAnimation from "@/components/background-animation"

export default function SettingsPage() {
  const [passwordStrength, setPasswordStrength] = useState(70)
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const avatars = ["/avatar-1.png", "/avatar-2.png", "/avatar-3.png", "/avatar-4.png", "/avatar-5.png", "/avatar-6.png"]

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "red"
    if (passwordStrength < 70) return "orange"
    return "green"
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          // Simulate upload delay
          setTimeout(() => {
            setUploadedImage(event.target?.result as string)
            setIsUploading(false)
            setShowCropper(true)
          }, 1000)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSaveCroppedImage = () => {
    // In a real app, you would send the cropped image to the server
    setShowCropper(false)
    // For demo purposes, we'll just use the uploaded image
    setSelectedAvatar(-1) // -1 indicates custom image
  }

  const handleCancelCrop = () => {
    setShowCropper(false)
    setUploadedImage(null)
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] dark:bg-[#1a1a2e] transition-colors duration-300">
      {/* Cursor follower */}
      <CursorFollower intensity={1.5} />

      {/* Background animation */}
      <BackgroundAnimation opacity={20} />

      {/* Pixel noise background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat z-0"
        style={{ backgroundImage: "url('/pixel-noise.png')" }}
      />

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-[#FFB6C1]/30 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5 text-[#333] dark:text-white" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-[#333] dark:text-white">Settings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 relative z-1">
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-lg p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <Palette className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <HardDrive className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Storage</span>
            </TabsTrigger>
            <TabsTrigger
              value="sharing"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sharing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">Personal Information</h2>

              <div className="mb-6">
                <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Avatar</h3>

                {/* Profile picture upload */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 shadow-md">
                      {selectedAvatar === -1 && uploadedImage ? (
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Custom avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-contain bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url('${avatars[selectedAvatar] || "/placeholder.svg?height=96&width=96"}')`,
                          }}
                        />
                      )}
                    </div>

                    <button
                      onClick={triggerFileInput}
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                    >
                      <Upload className="w-4 h-4 text-white" />
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2 text-[#333] dark:text-white">Upload a new avatar</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">JPG, PNG or GIF. Maximum size 2MB.</p>
                    <Button
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white"
                    >
                      {isUploading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                </div>

                {/* Image cropper modal */}
                {showCropper && uploadedImage && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#2a2a40] rounded-xl p-6 max-w-md w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-[#333] dark:text-white">Crop Image</h3>
                        <Button variant="ghost" size="icon" onClick={handleCancelCrop}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mb-4">
                        <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Drag to adjust the crop area. Your profile picture will be displayed as a square.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          className="border-[#FFB6C1] text-[#333] dark:text-white hover:bg-[#FFB6C1]/10"
                          onClick={handleCancelCrop}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white"
                          onClick={handleSaveCroppedImage}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mb-4">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedAvatar === index ? "ring-2 ring-[#FFEB3B] ring-offset-2 scale-110" : "hover:scale-105"
                      }`}
                      onClick={() => setSelectedAvatar(index)}
                    >
                      <div
                        className="w-full h-full rounded-lg bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${avatar || "/placeholder.svg?height=64&width=64"}')` }}
                      />
                    </div>
                  ))}
                </div>

                <Button className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white">
                  Generate Pixel Avatar
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">Display Name</label>
                  <input
                    type="text"
                    defaultValue="PixelUser"
                    className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">Email</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Pixel art enthusiast and cloud storage user."
                    className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Other tabs content remains the same */}
          <TabsContent value="security" className="mt-6">
            {/* Security tab content */}
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">Security Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Change Password</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                        onChange={(e) => {
                          // Simple password strength calculation
                          const length = e.target.value.length
                          setPasswordStrength(Math.min(100, length * 10))
                        }}
                      />

                      <div className="mt-2">
                        <div className="text-sm flex justify-between mb-1">
                          <span className="text-[#333] dark:text-white">Password Strength</span>
                          <span className="text-[#333] dark:text-white">{passwordStrength}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${passwordStrength}%`,
                              background: `linear-gradient(to right, 
                                #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF
                              )`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Two-Factor Authentication</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#333] dark:text-white">Enable 2FA for additional security</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Protect your account with an additional verification step
                      </p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            {/* Appearance tab content */}
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">Appearance Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Theme</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-white rounded-md mb-2 flex items-center justify-center">
                        <Sun className="h-8 w-8 text-[#FFEB3B]" />
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Light</p>
                    </div>

                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-[#1a1a2e] rounded-md mb-2 flex items-center justify-center">
                        <Moon className="h-8 w-8 text-[#FFEB3B]" />
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Dark</p>
                    </div>

                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-gradient-to-b from-[#87CEEB] to-[#E0FFFF] rounded-md mb-2 flex items-center justify-center">
                        <span className="text-2xl">🏖️</span>
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Sunshine Beach</p>
                    </div>

                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-gradient-to-b from-[#2a2a40] to-[#1a1a2e] rounded-md mb-2 flex items-center justify-center">
                        <span className="text-2xl">🍬</span>
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Neon Candy</p>
                    </div>

                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-gradient-to-b from-[#001F3F] to-[#0074D9] rounded-md mb-2 flex items-center justify-center">
                        <span className="text-2xl">🌙</span>
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Moonlight Blue</p>
                    </div>

                    <div className="border border-[#FFB6C1]/30 rounded-lg p-3 cursor-pointer hover:bg-[#FFEB3B]/10 transition-colors">
                      <div className="h-24 bg-gradient-to-b from-[#4A148C] to-[#7B1FA2] rounded-md mb-2 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-center text-[#333] dark:text-white">Galaxy Purple</p>
                    </div>
                  </div>
                </div>

                {/* Visual Tracking Toggle */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Visual Tracking</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#333] dark:text-white">Enable visual tracking effects</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Show visual effects when scanning files
                      </p>
                    </div>

                    <div className="relative">
                      <input type="checkbox" id="visual-tracking" className="sr-only peer" />
                      <label
                        htmlFor="visual-tracking"
                        className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#FFEB3B]/10 dark:bg-[#FFEB3B]/5 rounded-lg border border-[#FFEB3B]/20">
                    <p className="text-sm text-[#333] dark:text-white">
                      Visual tracking shows rainbow scanning rays around your files when enabled. This feature may
                      reduce performance on older devices.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">Notification Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Download Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                        Default Download Path
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue="C:/Users/PixelUser/Downloads"
                          className="flex-1 bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                          readOnly
                        />
                        <Button className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white">
                          Browse
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Files will be downloaded to this location by default
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                        Download Speed Limit
                      </label>
                      <div className="space-y-2">
                        <select className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50">
                          <option value="unlimited">Unlimited</option>
                          <option value="10">10 MB/s</option>
                          <option value="5">5 MB/s</option>
                          <option value="2">2 MB/s</option>
                          <option value="1">1 MB/s</option>
                          <option value="0.5">512 KB/s</option>
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Limit your download speed to avoid network congestion
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-[#333] dark:text-white">Ask before downloading</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Always confirm before downloading files
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="ask-download" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="ask-download"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Notification Preferences</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Download Complete</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Notify when files finish downloading</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="notify-download" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="notify-download"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Upload Complete</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Notify when files finish uploading</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="notify-upload" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="notify-upload"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Shared File Access</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify when someone accesses your shared files
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="notify-share" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="notify-share"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Storage Alerts</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Notify when storage is almost full</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="notify-storage" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="notify-storage"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">Storage Management</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Storage Usage</h3>

                  <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-[#333] dark:text-white">768 GB Free</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">of 1024 GB Total</p>
                      </div>
                      <Button className="mt-2 md:mt-0 bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white">
                        Upgrade Storage
                      </Button>
                    </div>

                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                        style={{ width: "25%" }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>256 GB used (25%)</span>
                      <span>768 GB free</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4">
                      <h4 className="text-md font-medium mb-2 text-[#333] dark:text-white">Storage Breakdown</h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#333] dark:text-white">Images</span>
                            <span className="text-[#333] dark:text-white">120 GB</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#FFB6C1]" style={{ width: "47%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#333] dark:text-white">Videos</span>
                            <span className="text-[#333] dark:text-white">80 GB</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#BA68C8]" style={{ width: "31%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#333] dark:text-white">Documents</span>
                            <span className="text-[#333] dark:text-white">40 GB</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#64B5F6]" style={{ width: "16%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#333] dark:text-white">Other</span>
                            <span className="text-[#333] dark:text-white">16 GB</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#FFEB3B]" style={{ width: "6%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4">
                      <h4 className="text-md font-medium mb-2 text-[#333] dark:text-white">Storage History</h4>

                      <div className="h-40 flex items-end gap-1">
                        {[35, 42, 38, 45, 40, 48, 55, 60, 58, 65, 70, 68].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-gradient-to-t from-[#FFEB3B] to-[#FFB6C1] rounded-t-sm"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {index === 0 ? "Jan" : index === 11 ? "Dec" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Storage usage over the past 12 months
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Storage Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Auto-delete Trash</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Automatically delete items in trash after 30 days
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="auto-delete" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="auto-delete"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Compress Uploads</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Automatically compress large files when uploading
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="compress-uploads" className="sr-only peer" />
                        <label
                          htmlFor="compress-uploads"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Low Storage Alert</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when storage is below 10%
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="storage-alert" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="storage-alert"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Empty Trash Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sharing" className="mt-6">
            <Card className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-[#333] dark:text-white">File Sharing</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Create Sharing Link</h3>

                  <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4 mb-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                        Select File to Share
                      </label>
                      <select className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50">
                        <option value="">-- Select a file --</option>
                        <option value="vacation.png">vacation.png</option>
                        <option value="report.pdf">report.pdf</option>
                        <option value="theme_song.mp3">theme_song.mp3</option>
                        <option value="gameplay.mp4">gameplay.mp4</option>
                        <option value="notes.txt">notes.txt</option>
                        <option value="profile.jpg">profile.jpg</option>
                        <option value="presentation.pptx">presentation.pptx</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                          Security Type
                        </label>
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="encrypted"
                              name="security"
                              className="h-4 w-4 text-[#FFEB3B] focus:ring-[#FFEB3B]/50"
                              defaultChecked
                            />
                            <label htmlFor="encrypted" className="ml-2 block text-sm text-[#333] dark:text-white">
                              6-digit encrypted
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="unencrypted"
                              name="security"
                              className="h-4 w-4 text-[#FFEB3B] focus:ring-[#FFEB3B]/50"
                            />
                            <label htmlFor="unencrypted" className="ml-2 block text-sm text-[#333] dark:text-white">
                              Unencrypted
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#333] dark:text-white">
                          Link Validity
                        </label>
                        <select
                          defaultValue="7"
                          className="w-full bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                        >
                          <option value="1">1 day</option>
                          <option value="7">7 days</option>
                          <option value="30">1 month</option>
                          <option value="0">Never expires</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white">
                      Generate Sharing Link
                    </Button>
                  </div>

                  <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4">
                    <h4 className="text-md font-medium mb-2 text-[#333] dark:text-white">Your Sharing Link</h4>

                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value="https://pixelcloud.com/s/a7b9c3d5e2"
                        className="flex-1 bg-white/50 dark:bg-[#1a1a2e]/50 border border-[#FFB6C1]/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFEB3B]/50"
                        readOnly
                      />
                      <Button className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white">
                        Copy
                      </Button>
                    </div>

                    <div className="flex gap-2 items-center mb-4">
                      <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                        Access code: <span className="font-mono font-bold text-[#333] dark:text-white">123456</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs border-[#FFB6C1] hover:bg-[#FFB6C1]/10"
                      >
                        Copy Code
                      </Button>
                    </div>

                    <div className="p-3 bg-[#FFEB3B]/10 dark:bg-[#FFEB3B]/5 rounded-lg border border-[#FFEB3B]/20">
                      <div className="flex items-start gap-2">
                        <div className="text-[#FFEB3B] mt-0.5">ℹ️</div>
                        <div className="text-sm text-[#333] dark:text-white">
                          This link will expire in <span className="font-bold">7 days</span>. The recipient will need
                          both the link and the access code to view your file.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Active Shared Files</h3>

                  <div className="bg-white/50 dark:bg-[#1a1a2e]/50 rounded-xl p-4 overflow-hidden">
                    <div className="overflow-x-auto -mx-4 px-4">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-[#FFB6C1]/20">
                            <th className="text-left py-2 px-4 text-sm font-medium text-[#333] dark:text-white">
                              File
                            </th>
                            <th className="text-left py-2 px-4 text-sm font-medium text-[#333] dark:text-white">
                              Created
                            </th>
                            <th className="text-left py-2 px-4 text-sm font-medium text-[#333] dark:text-white">
                              Expires
                            </th>
                            <th className="text-left py-2 px-4 text-sm font-medium text-[#333] dark:text-white">
                              Views
                            </th>
                            <th className="text-left py-2 px-4 text-sm font-medium text-[#333] dark:text-white">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#FFB6C1]/10">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-[#FFB6C1]/20 flex items-center justify-center">
                                  <Image className="w-4 h-4 text-[#FFB6C1]" />
                                </div>
                                <span className="text-sm text-[#333] dark:text-white">vacation.png</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">2 days ago</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">5 days left</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">12</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-[#FFB6C1] hover:bg-[#FFB6C1]/10"
                                >
                                  Copy Link
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-[#FFB6C1]/10">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-[#64B5F6]/20 flex items-center justify-center">
                                  <File className="w-4 h-4 text-[#64B5F6]" />
                                </div>
                                <span className="text-sm text-[#333] dark:text-white">report.pdf</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">1 week ago</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">Expired</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">8</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-[#FFB6C1] hover:bg-[#FFB6C1]/10"
                                >
                                  Renew
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-[#BA68C8]/20 flex items-center justify-center">
                                  <Video className="w-4 h-4 text-[#BA68C8]" />
                                </div>
                                <span className="text-sm text-[#333] dark:text-white">gameplay.mp4</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">3 days ago</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">27 days left</td>
                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">24</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-[#FFB6C1] hover:bg-[#FFB6C1]/10"
                                >
                                  Copy Link
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-xs border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-3 text-[#333] dark:text-white">Sharing Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Default to Encrypted Links</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Always create 6-digit encrypted links by default
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="default-encrypted" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="default-encrypted"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Track Link Views</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Keep track of how many times your links are viewed
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="track-views" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="track-views"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#333] dark:text-white">Allow Downloads</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Let people download your shared files
                        </p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="allow-downloads" className="sr-only peer" defaultChecked />
                        <label
                          htmlFor="allow-downloads"
                          className="flex items-center w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FFEB3B]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-gradient-to-r peer-checked:from-[#FFEB3B] peer-checked:to-[#FFB6C1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

