/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/product-images/**')],
  },
};

export default nextConfig;
