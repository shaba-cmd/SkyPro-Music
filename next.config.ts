import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: '/',
        destination: '/music/main',
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
