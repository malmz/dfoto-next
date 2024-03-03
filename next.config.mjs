/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dfoto.se',
        port: '',
        pathname: '/v1/**',
      },
    ],
  },
};

export default nextConfig;
