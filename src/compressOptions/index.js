module.exports = {
  filter(content_type) {
    return /\.(js|css|json)$/.test(content_type)
  },
  threshold: 10240,
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  br: true // disable brotli
}
