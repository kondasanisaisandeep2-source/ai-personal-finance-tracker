const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET || 'dev-secret-change-me-please',
  },
};

module.exports = nextConfig;
