/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {remotePatterns: [
      {
        protocol: 'https',
        hostname: 'holotv.space',
        // port: '5000',
      },
    ],}
};

export default nextConfig;
