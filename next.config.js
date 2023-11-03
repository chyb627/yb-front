/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: 'http://localhost:8000',
  },
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'localhost'],
  },
};

module.exports = nextConfig;
