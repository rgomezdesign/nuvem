import type { NextConfig } from "next";

// GitHub Pages serves the site from /nuvem; locally it runs at the root.
const basePath = process.env.GITHUB_PAGES === "true" ? "/nuvem" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  experimental: { viewTransition: true },
};

export default nextConfig;
