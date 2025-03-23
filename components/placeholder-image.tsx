import { CameraOff } from "lucide-react"

interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
}

export default function PlaceholderImage({
  width = 400,
  height = 300,
  text = "Imagen no disponible",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gray-800 text-gray-400 ${className}`}
      style={{ width, height }}
    >
      <CameraOff className="w-10 h-10 mb-2 opacity-50" />
      <p className="text-sm text-center px-4">{text}</p>
    </div>
  )
}

