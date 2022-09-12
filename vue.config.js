module.exports = {
  lintOnSave: false, //这里禁止使用eslint-loader
  //以下是其它相关配置
  configureWebpack: {
    externals: {
      BMap: "BMap",
    },
  },
};
