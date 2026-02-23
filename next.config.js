/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/YogIA_Center', // <--- AÑADE ESTA LÍNEA (Debe coincidir con el nombre de tu repositorio)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;