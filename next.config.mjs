/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS || process.env.GITHUB_PAGES === 'true';
const repoName = 'vijay-website';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages && !process.env.NO_BASE_PATH ? `/${repoName}` : '',
  assetPrefix: isGithubPages && !process.env.NO_BASE_PATH ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages && !process.env.NO_BASE_PATH ? `/${repoName}` : '',
  },
};

export default nextConfig;
