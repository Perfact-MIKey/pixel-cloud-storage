import { HardDrive } from "lucide-react"

interface StorageUsageProps {
  usedSpace: number // in GB
  totalSpace: number // in GB
}

export default function StorageUsage({ usedSpace, totalSpace }: StorageUsageProps) {
  const usagePercentage = Math.min(100, Math.round((usedSpace / totalSpace) * 100))
  const remainingSpace = totalSpace - usedSpace

  // Determine color based on usage
  const getColorClass = () => {
    if (usagePercentage < 50) return "from-green-400 to-green-500"
    if (usagePercentage < 80) return "from-yellow-400 to-orange-400"
    return "from-red-400 to-red-500"
  }

  return (
    <div className="bg-white/80 dark:bg-[#2a2a40]/80 backdrop-blur-sm border border-[#FFB6C1]/20 rounded-xl p-3 shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-[#FFEB3B] to-[#FFB6C1]">
          <HardDrive className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-[#333] dark:text-white">Storage</h3>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {remainingSpace} GB free of {totalSpace} GB
          </div>
        </div>
      </div>

      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColorClass()}`}
          style={{ width: `${usagePercentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{usedSpace} GB used</span>
        <span>{usagePercentage}%</span>
      </div>
    </div>
  )
}

