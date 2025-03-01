/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
