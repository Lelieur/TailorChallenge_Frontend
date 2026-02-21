import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "video-images.vice.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.livingfla.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.wazwu.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c8.alamy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "es.nycgo.com",
        port: "",
        pathname: "/**",
      },
      { protocol: "https", hostname: "wazwu.com", port: "", pathname: "/**" },
      {
        protocol: "https",
        hostname: "resizer.otstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
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
