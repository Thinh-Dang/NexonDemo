const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['bootdey.com', 'i.pinimg.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
