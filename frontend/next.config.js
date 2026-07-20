/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['walmart.com', 'lowes.com', 'homedepot.com', 'amazon.com', 'ebay.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
};

module.exports = nextConfig;
