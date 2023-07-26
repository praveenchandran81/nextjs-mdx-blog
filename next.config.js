/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
     remotePatterns:[
      {
        protocol:'https',
        hostname:'raw.githubusercontent.com',
        port:'',
        pathname:'/praveenchandran81/blog-posts/main/images/**'
      }
     ]
  }
}

module.exports = nextConfig
