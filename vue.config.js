module.exports = {
  lintOnSave: false,
  devServer: {
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    https: true,
    hot: true,
    disableHostCheck: true
  }
}
