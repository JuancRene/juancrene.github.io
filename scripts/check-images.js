// This script checks if all required images exist in the public directory
// Run with: node scripts/check-images.js

const fs = require("fs")
const path = require("path")

// List of required images
const requiredImages = [
  "images/juan-profile.png",
  "images/hero-background.png",
  "images/gestor-sistema.png",
  "images/botsito.png",
  "images/reserva-canchas.png",
  "images/portfolio-web.png",
]

// Check if public directory exists
const publicDir = path.join(process.cwd(), "public")
if (!fs.existsSync(publicDir)) {
  console.error("Public directory not found!")
  process.exit(1)
}

// Check each required image
const missingImages = []
requiredImages.forEach((imagePath) => {
  const fullPath = path.join(publicDir, imagePath)
  if (!fs.existsSync(fullPath)) {
    missingImages.push(imagePath)
  }
})

// Report results
if (missingImages.length === 0) {
  console.log("✅ All required images are present in the public directory.")
} else {
  console.error("❌ The following images are missing:")
  missingImages.forEach((image) => {
    console.error(`   - ${image}`)
  })
  console.log("\nPlease add these images to the public directory before building.")
}

