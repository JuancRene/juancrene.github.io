"use client"

import type React from "react"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmailLink({
  showIcon = true,
  className = "",
  buttonStyle = false,
  children,
}: {
  showIcon?: boolean
  className?: string
  buttonStyle?: boolean
  children?: React.ReactNode
}) {
  const email = "juancruzrenearenas@gmail.com"

  if (buttonStyle) {
    return (
      <Button
        className={`bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 ${className}`}
        onClick={() => (window.location.href = `mailto:${email}`)}
      >
        {showIcon && <Mail className="mr-2 h-4 w-4" />}
        {children || "Enviar Email"}
      </Button>
    )
  }

  return (
    <a
      href={`mailto:${email}`}
      className={`text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center ${className}`}
    >
      {showIcon && <Mail className="mr-2 h-4 w-4" />}
      {children || email}
    </a>
  )
}

