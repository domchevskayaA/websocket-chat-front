module.exports = {
  lintOnSave: false,
  devServer: {
    public:process.env.VUE_APP_CLIENT_PUBLIC_HOST,
    disableHostCheck: true
  }
}
