import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// バックエンドの設定
// api/hogehoge~とリクエストが来たらhttp://host.codker.internal:8000/api/hogehoge~のURLをリクエストをリライトする
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:8000/api/:path*/',
      },
    ]
  },
};