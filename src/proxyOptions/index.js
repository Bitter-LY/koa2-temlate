module.exports = {
  targets: {
    '/api-yuhuan/(.*)': {
      target: 'http://220.185.131.126:8190',
      changeOrigin: true,
      pathRewrite: {
        '^/api-yuhuan': ''
      }
    }
  }
}
