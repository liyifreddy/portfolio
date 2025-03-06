/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "api.microlink.io", // Microlink Image Preview
        ],
      },
    eslint: {
      // 忽略构建时的ESLint错误
      ignoreDuringBuilds: true,
    },
    output: 'export',
};

export default nextConfig;
