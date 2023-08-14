const path = require("path");
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
    domains: ["storage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: false,
      },
    ];
  },
  output: "standalone",
  assetPrefix: isProd ? process.env.NEXT_CDN_DOMAIN : undefined,
};

module.exports = nextConfig;
