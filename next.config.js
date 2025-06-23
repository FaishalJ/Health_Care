/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignorebuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
