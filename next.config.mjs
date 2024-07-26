/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         // { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         // { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
  //         // { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
  //         // {
  //         //   key: 'Content-Security-Policy',
  //         //   value: "default-src 'self' *; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; style-src 'self' * 'unsafe-inline'; img-src 'self' *; connect-src 'self' *; font-src 'self' *; frame-src 'self' *; worker-src 'self' * blob:;"
  //         // },
  //         // {
  //         //   key: 'Content-Security-Policy',
  //         //   value: "default-src 'self' *; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; style-src 'self' * 'unsafe-inline'; img-src 'self' *; connect-src 'self' *; font-src 'self' *; frame-src 'self' *; worker-src 'self' * blob:; frame-src 'self' https://player-holotv.ru"
  //         // },
  //         // {
  //         //   key: 'Content-Security-Policy',
  //         //   value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-src 'self' https://localhost:5173; worker-src 'self' blob:"
  //         // },
  //         // {
  //         //   key: 'X-Frame-Options',
  //         //   value: 'ALLOW-FROM https://player-holotv.ru',
  //         // },
  //         // {
  //         //   key: "Access-Control-Allow-Origin",
  //         //   value: "*",
  //         // },
  //         // {
  //         //   key: "Access-Control-Allow-Methods",
  //         //   value: "GET, POST, OPTIONS;",
  //         // },
  //         // {
  //         //   key: "Access-Control-Allow-Headers",
  //         //   value: "Origin, Content-Type, Accept, Authorization;",
  //         // },
  //         // {
  //         //   key: "X-Content-Type-Options",
  //         //   value: "nosniff",
  //         // },
  //         // {
  //         //   key: "X-Frame-Options",
  //         //   value: "SAMEORIGIN",
  //         // },
  //         // {
  //         //   key: "X-Xss-Protection",
  //         //   value: "1; mode=block",
  //         // },
  //         // {
  //         //   key: 'Content-Security-Policy',
  //         //   // value: 'default-src * \'unsafe-inline\' \'unsafe-eval\' data: blob:; frame-src *;'
  //         //   // value: 'default-src * \'unsafe-inline\' \'unsafe-eval\' data: blob:; frame-ancestors *; child-src *; worker-src blob: *;'
  //         //   value: 'default-src *; frame-src playerjs-holotv.ru;'
  //         //   // value: 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://player-holotv.ru https://holotv.space; style-src \'self\' \'unsafe-inline\'; frame-src https://player-holotv.ru; connect-src https://holotv.space wss://localhost:3000; worker-src \'self\' blob:; object-src \'none\';'
  //         // }
  //       ],
  //     },
  //   ]
  // },
  reactStrictMode: false,
  images: { remotePatterns: [
      process.env.NODE_ENV === 'development'
        ? {
          protocol: 'https',
          hostname: 'localhost',
          port: '5000',
        }
        : {
          protocol: 'https',
          hostname: 'serverkino.ru',
        },
    ]
  },

};

export default nextConfig;
