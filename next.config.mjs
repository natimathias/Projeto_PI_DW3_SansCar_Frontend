/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.webmotors.com.br',
      },
    ],
  },
};

export default nextConfig;
