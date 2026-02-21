import type { NextConfig } from "next";

const BASE_DOMAINS = [
  "vice.com",
  "tripadvisor.com",
  "livingfla.com",
  "alamy.com",
  "nycgo.com",
  "wazwu.com",
  "otstatic.com",
  "pinimg.com",
  "cloudinary.com",
  "video-images.vice.com",
  "resizer.otstatic.com",
  "i.pinimg.com",
  "media-cdn.tripadvisor.com",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: BASE_DOMAINS.flatMap((d) => [
      { protocol: "https", hostname: d, port: "", pathname: "/**" },
      { protocol: "http", hostname: `**.${d}`, port: "", pathname: "/**" },
      { protocol: "https", hostname: `**.${d}`, port: "", pathname: "/**" },
    ]),
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
