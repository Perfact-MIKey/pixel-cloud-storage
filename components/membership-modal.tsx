"use client"

import { useState } from "react"
import { X, Check, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MembershipModalProps {
  onClose: () => void
  onCheckin: () => void
}

export default function MembershipModal({ onClose, onCheckin }: MembershipModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white/90 dark:bg-[#2a2a40]/90 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] flex items-center justify-center mr-4">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#333] dark:text-white">Membership Status</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Current: <span className="font-medium text-[#FFEB3B]">Free, Junior Member</span>
            </p>
          </div>
          <Button
            className="ml-auto bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white"
            onClick={onCheckin}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Member Check-in
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-[#333] dark:text-white mb-2">Junior member benefits:</p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm">
            <li>1TB storage capacity</li>
            <li>AI assistant usage: 60 times/month</li>
            <li>Basic file sharing</li>
          </ul>
        </div>

        <Tabs defaultValue="intermediate" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger
              value="intermediate"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
              onClick={() => setSelectedPlan("intermediate")}
            >
              Intermediate
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
              onClick={() => setSelectedPlan("premium")}
            >
              Premium
            </TabsTrigger>
            <TabsTrigger
              value="super"
              className="data-[state=active]:bg-[#FFEB3B]/20 data-[state=active]:text-[#333] dark:data-[state=active]:text-white"
              onClick={() => setSelectedPlan("super")}
            >
              Super
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="intermediate"
            className="border border-[#FFB6C1]/20 rounded-xl p-4 bg-white/50 dark:bg-[#1a1a2e]/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#333] dark:text-white">Intermediate Member</h3>
              <div className="text-xl font-bold text-[#FFEB3B]">$9/month</div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">Storage capacity increased by 500GB</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">AI assistant usage increased to 100 times/month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">
                  Added daily check-in function, continuous check-in for 15 days plus 3 days of intermediate member
                  bonus
                </span>
              </li>
            </ul>
          </TabsContent>

          <TabsContent
            value="premium"
            className="border border-[#FFB6C1]/20 rounded-xl p-4 bg-white/50 dark:bg-[#1a1a2e]/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#333] dark:text-white">Premium Member</h3>
              <div className="text-xl font-bold text-[#FFEB3B]">$15/month</div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">Storage capacity increased by 1TB</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">AI assistant usage increased to 200 times/month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">
                  Daily check-in function added, with 3 days of premium membership bonus for 15 consecutive check-in
                  days
                </span>
              </li>
            </ul>
          </TabsContent>

          <TabsContent
            value="super"
            className="border border-[#FFB6C1]/20 rounded-xl p-4 bg-white/50 dark:bg-[#1a1a2e]/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#333] dark:text-white">Super Member</h3>
              <div className="text-xl font-bold text-[#FFEB3B]">$30/month</div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">Increased storage capacity by 5TB</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">Increased usage of AI assistant to 500 times/month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-[#333] dark:text-white">
                  Added daily check-in function, with a $5 recharge coupon for 15 consecutive days of check-in (only
                  available for premium and above members)
                </span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            className="border-[#FFB6C1] text-[#333] dark:text-white hover:bg-[#FFB6C1]/10 mr-3"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-[#FFEB3B] to-[#FFB6C1] hover:opacity-90 text-white"
            disabled={!selectedPlan}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}

