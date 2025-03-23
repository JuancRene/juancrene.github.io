"use client"

import * as React from "react"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

// Creamos nuestro propio contexto para reemplazar OTPInputContext
const OTPInputContext = React.createContext<{
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  maxLength: number
}>({
  value: "",
  setValue: () => {},
  maxLength: 6,
})

// Componente principal
export function OTPInput({
  value,
  onChange,
  maxLength = 6,
  children,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const [internalValue, setInternalValue] = React.useState(value || "")

  React.useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // Modificamos esta función para que sea compatible con React.Dispatch<React.SetStateAction<string>>
  const setValue = React.useCallback(
    (valueOrFn: React.SetStateAction<string>) => {
      const newValue =
        typeof valueOrFn === "function" ? (valueOrFn as (prevState: string) => string)(internalValue) : valueOrFn

      setInternalValue(newValue)
      onChange(newValue)
    },
    [internalValue, onChange],
  )

  return (
    <OTPInputContext.Provider
      value={{
        value: internalValue,
        setValue,
        maxLength,
      }}
    >
      <div {...props} className={cn("flex items-center gap-2", props.className)}>
        {children}
      </div>
    </OTPInputContext.Provider>
  )
}

// Componente para cada slot de entrada
export function OTPInputGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("flex items-center gap-2", props.className)}>
      {children}
    </div>
  )
}

// Componente para cada slot individual
export function OTPInputSlot({
  index,
  ...props
}: {
  index: number
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { value, setValue, maxLength } = React.useContext(OTPInputContext)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const newValue = value.slice(0, index - 1) + value.slice(index)
      setValue(newValue)
      const prevInput = inputRef.current?.previousElementSibling as HTMLInputElement
      prevInput?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = inputRef.current?.previousElementSibling as HTMLInputElement
      prevInput?.focus()
    } else if (e.key === "ArrowRight" && index < maxLength - 1) {
      const nextInput = inputRef.current?.nextElementSibling as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    let newChar = target.value.slice(-1)

    // Solo permitir dígitos
    if (!/^\d*$/.test(newChar)) {
      newChar = ""
    }

    const newValue = value.slice(0, index) + newChar + value.slice(index + 1)
    setValue(newValue)

    if (newChar && index < maxLength - 1) {
      const nextInput = inputRef.current?.nextElementSibling as HTMLInputElement
      nextInput?.focus()
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      maxLength={1}
      value={value[index] || ""}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      className={cn(
        "h-10 w-10 rounded-md border border-input bg-background text-center text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring",
        props.className,
      )}
      {...props}
    />
  )
}

// Componente separador
export function OTPInputSeparator({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      {...props}
      className={cn("flex items-center justify-center text-muted-foreground", props.className)}
    >
      <Dot className="h-4 w-4" />
    </div>
  )
}

