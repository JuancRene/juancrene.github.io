import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
            <Home className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}

