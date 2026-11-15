import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le domaine nu redirige vers www (comportement identique à l'ancien hébergement).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "licences-app.fr" }],
        destination: "https://www.licences-app.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
