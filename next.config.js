/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static export to fix build timeout
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
  // Temporarily disable GitHub Pages config
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/piranha' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/piranha' : '',
}

module.exports = nextConfig