/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
