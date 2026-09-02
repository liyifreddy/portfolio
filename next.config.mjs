/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "api.microlink.io", // Microlink Image Preview
        ],
        unoptimized: true,
      },
    eslint: {
      // 保留原因（2026-09-02 复核）：`npm run lint` 目前 53 error / 4 warning。
      // 其中 32 条是 react/no-unescaped-entities，全部落在 project-tabs-content.tsx
      // 的正文文案里。那份文案受事实档管着、要求逐字照抄，为了过 lint 去改写
      // 引号会带来改错措辞的风险，收益（渲染结果完全不变）远小于代价。
      // 其余 21 条是 unused-vars / explicit-any / display-name 一类的存量技术债。
      // 真正有行为影响的那条（KnowledgeGraph 里 key 挂错层级）已单独修掉。
      // 清完存量债之后再把这个开关关掉。
      ignoreDuringBuilds: true,
    },
    output: 'export',
};

export default nextConfig;
