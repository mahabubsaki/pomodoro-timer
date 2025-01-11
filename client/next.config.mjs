/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        IMGBB_API_KEY: process.env.NEXTIMGBB_API_KEY,
        BACKEND_API_DEV: process.env.NEXTBACKEND_URL_DEV,
        BACKEND_API_PROD: process.env.NEXTBACKEND_URL_PROD,
    },
    reactStrictMode: false
};

export default nextConfig;
