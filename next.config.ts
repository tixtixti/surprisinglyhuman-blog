import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: no server, no cookies, no runtime.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
