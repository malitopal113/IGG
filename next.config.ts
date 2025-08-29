// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//    output: 'export',           
//    images: { unoptimized: true } 
// };

// export default nextConfig;
// next.config.ts  (Vercel için)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel'de SSR/SSG'yi Next kendi yönetir; 'export' KULLANMA!
  // images: { unoptimized: true } da gereksiz, kaldır.
};

export default nextConfig;