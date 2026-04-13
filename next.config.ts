import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'reverb.com' },
      { protocol: 'https', hostname: 'images.reverb.com' },
      { protocol: 'https', hostname: 'www.ebayimg.com' },
      { protocol: 'https', hostname: 'i.ebayimg.com' },
      { protocol: 'https', hostname: 'www.guitarcenter.com' },
      { protocol: 'https', hostname: 'media.guitarcenter.com' },
      { protocol: 'https', hostname: 'www.sweetwater.com' },
      { protocol: 'https', hostname: 'media.sweetwater.com' },
      { protocol: 'https', hostname: 'www.kijiji.ca' },
      { protocol: 'https', hostname: 'ca.kijiji.ca' },
      { protocol: 'https', hostname: 'img.clerk.com' },
    ],
  },
};

export default nextConfig;
