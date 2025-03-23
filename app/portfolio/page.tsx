import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Mi Portfolio
        </h1>
        <p className="mb-8 text-gray-300">Bienvenido a mi portfolio. Soy Juan Cruz Rene, desarrollador de software.</p>
        <div className="mb-8">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

