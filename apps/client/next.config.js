/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui","@repo/db","@repo/api","@repo/auth"]
}

module.exports = nextConfig
