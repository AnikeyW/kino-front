/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: false,
  images: { remotePatterns: [
      process.env.NODE_ENV === 'development'
        ? {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
        }
        : {
          protocol: 'https',
          hostname: 'holotv.space',
        },
    ]
  },
};

export default nextConfig;
