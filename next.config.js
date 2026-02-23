/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- ESTA ES LA LÍNEA CLAVE
  images: {
    unoptimized: true, // Necesario para GitHub Pages
  },
};

export default nextConfig;