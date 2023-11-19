/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
      BASE_URL: process.env.BASE_URL,
    },
    reactStrictMode:true,
    swcMinify: true,
    distDir: 'out',
  
     /* output: 'export', */
    /*  distDir: 'out', */
    images: { unoptimized: true } , 
     serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
  },
  
  pwa: {
    dest: 'public',
    register: true,
  },
  
     webpack: (config, { isServer }) => {
         if (!isServer) {
           // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
           config.resolve.fallback = {
             fs: false,
           };
         }
     
         return config;
       },
      
  }
  
  module.exports = nextConfig