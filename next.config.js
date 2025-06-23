/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignorebuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;

// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.resolve = {
//       ...config.resolve,
//       fallback: {
//         fs: false,
//       },
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;

// Injected content via Sentry wizard below
