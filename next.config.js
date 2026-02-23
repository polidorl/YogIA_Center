/** @type {import('next').NextConfig} */
// Detecta si el "robot" de GitHub está trabajando
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  // Si es GitHub, usa la subcarpeta. Si es Vercel, usa la raíz.
  basePath: isGithubActions ? '/YogIA_Center' : '', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;