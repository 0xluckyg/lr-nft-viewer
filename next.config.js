require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
