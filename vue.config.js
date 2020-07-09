module.exports = {
  lintOnSave: false,
  devServer: {
    public:process.env.VUE_APP_SERVER_HOST,
    disableHostCheck: true
  }
}
