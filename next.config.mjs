/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — produces a plain ./out folder that deploys to
  // Vercel, Netlify, GitHub Pages, or any static host. Swap to the default
  // (remove this) later if you grow into server features.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
