module.exports = {
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com','platform-lookaside.fbsbx.com']
  },
  swcMinify : false,
  distDir: "build",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://chat-app-rania.herokuapp.com/api/:path*',
      },
    ]
  },
}