module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
  lintOnSave: false, //这里禁止使用eslint-loader
  //以下是其它相关配置
  configureWebpack: {
    externals: {
      BMap: "BMap",
    },
  },
};
