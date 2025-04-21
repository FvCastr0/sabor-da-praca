import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  env: {
    BACKEND_URL: "https://sabor-da-praca.onrender.com"
  }
};

export default nextConfig;
