// This script generates placeholder images for development
// Run with: node scripts/generate-placeholders.js

const fs = require("fs")
const path = require("path")

// List of required images
const requiredImages = [
  { path: "images/juan-profile.png", width: 400, height: 400, text: "Foto de Perfil" },
  { path: "images/hero-background.png", width: 1920, height: 1080, text: "Imagen de Fondo" },
  { path: "images/gestor-sistema.png", width: 600, height: 400, text: "Sistema de Gestión" },
  { path: "images/botsito.png", width: 600, height: 400, text: "Bot de WhatsApp" },
  { path: "images/reserva-canchas.png", width: 600, height: 400, text: "Reserva de Canchas" },
  { path: "images/portfolio-web.png", width: 600, height: 400, text: "Portfolio Web" },
]

// Ensure public directory exists
const publicDir = path.join(process.cwd(), "public")
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir)
}

// Ensure images directory exists
const imagesDir = path.join(publicDir, "images")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir)
}

// Generate placeholder SVG for each missing image
requiredImages.forEach((image) => {
  const fullPath = path.join(publicDir, image.path)

  // Skip if image already exists
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${image.path} already exists.`)
    return
  }

  // Generate SVG placeholder
  const svg = `<svg width="${image.width}" height="${image.height}" viewBox="0 0 ${image.width} ${image.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${image.width}" height="${image.height}" fill="#1F2937"/>
  <rect x="10" y="10" width="${image.width - 20}" height="${image.height - 20}" stroke="#4B5563" stroke-width="2" stroke-dasharray="10 5"/>
  <text x="${image.width / 2}" y="${image.height / 2}" font-family="Arial" font-size="24" fill="#9CA3AF" text-anchor="middle">${image.text}</text>
</svg>`

  // Write SVG to file
  fs.writeFileSync(fullPath, svg)
  console.log(`✅ Generated placeholder for ${image.path}`)
})

console.log("\nAll placeholder images have been generated. Replace them with real images before production.")

