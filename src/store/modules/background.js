export default {
  namespaced: true,
  state: {
    isNight: false,
    bgI: "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/%E5%A4%AA%E9%98%B3.png",
    //太阳月亮切换
    cover:
      "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/img/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89%20%281%29.jpg",
    //封面图片切换
  },
  mutations: {
    setBackground(state, data) {
      state.isNight = !state.isNight;
      if (state.isNight == true) {
        state.bgI =
          "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/%E6%9C%88%E4%BA%AE.png";
        state.cover =
          "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/hd-wallpaper-g09124acdf_1920.jpg";
      } else {
        state.bgI =
          "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/%E5%A4%AA%E9%98%B3.png";
        state.cover =
          "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/img/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89%20%281%29.jpg";
      }
    },
  },
  actions: {
    setBackground(store, data) {
      store.commit("setBackground", data);
    },
  },
};
