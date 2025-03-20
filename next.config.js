/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    typescript: {
        ignoreBuildErrors: true,

    },
    trailingSlash: true,
    images: { unoptimized: true },
    reactStrictMode: false,  
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },

}

module.exports = nextConfig
