/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "cdn.mmsports.se",
      },

      {
        protocol: "https",
        hostname: "cdn-fsly.yottaa.net",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;


