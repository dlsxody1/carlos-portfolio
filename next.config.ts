import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // 배럴 import 를 빌드 때 개별 import 로 바꾼다
  experimental: { optimizePackageImports: ['@react-three/drei', '@paper-design/shaders-react', 'simple-icons'] },
}

export default nextConfig
