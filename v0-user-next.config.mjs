// Make sure the output is set to 'export' for static deployments
// Add basePath if you're deploying to a subdirectory

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Add this for static exports
  },
  transpilePackages: [
    'lucide-react',
    'recharts',
    'embla-carousel-react',
    'react-day-picker',
    'react-hook-form',
    '@hookform/resolvers',
    'sonner',
    'vaul',
    'cmdk',
    'react-resizable-panels',
    '@radix-ui/react-accordion',
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-aspect-ratio',
    '@radix-ui/react-avatar',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-collapsible',
    '@radix-ui/react-context-menu',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-hover-card',
    '@radix-ui/react-label',
    '@radix-ui/react-menubar',
    '@radix-ui/react-navigation-menu',
    '@radix-ui/react-popover',
    '@radix-ui/react-progress',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-scroll-area',
    '@radix-ui/react-select',
    '@radix-ui/react-separator',
    '@radix-ui/react-slider',
    '@radix-ui/react-slot',
    '@radix-ui/react-switch',
    '@radix-ui/react-tabs',
    '@radix-ui/react-toast',
    '@radix-ui/react-toggle',
    '@radix-ui/react-toggle-group',
    '@radix-ui/react-tooltip',
    '@tanstack/react-table'
  ],
  output: 'export', // Add this for static site generation
}

export default nextConfig

