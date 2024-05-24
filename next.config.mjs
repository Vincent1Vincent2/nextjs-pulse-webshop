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
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'i.ibb.co',
//       },
//       {
//         protocol: 'http',
//         hostname: '127.0.0.1',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//       },
//     ],
//   },
//   experimental: {
//     typedRoutes: true,
//   },
// };

// export default nextConfig;
