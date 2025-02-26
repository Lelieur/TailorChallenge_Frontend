import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.video-images.vice.com",
      "www.media-cdn.tripadvisor.com",
      "www.livingfla.com",
      "www.c8.alamy.com",
      "www.es.nycgo.com",
      "www.wazwu.com",
      "www.resizer.otstatic.com",
      "www.i.pinimg.com",
      "www.res.cloudinary.com",
      "video-images.vice.com",
      "media-cdn.tripadvisor.com",
      "livingfla.com",
      "c8.alamy.com",
      "es.nycgo.com",
      "wazwu.com",
      "resizer.otstatic.com",
      "i.pinimg.com",
      "res.cloudinary.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
