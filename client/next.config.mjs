/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    reactStrictMode: false
};

export default nextConfig;
