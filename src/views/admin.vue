<template>
  <div class="container">
    <div class="article-list border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left" style="padding-left: 3%">
            <el-icon><Notebook /></el-icon>
            <div style="margin-left: 2%">文章列表</div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalogue border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><More /></el-icon>
            <div style="margin-left: 2%">分类</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recent-article border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><Clock /></el-icon>
            <div style="margin-left: 2%">最近文章</div>
          </div>
        </div>
      </div>
    </div>
    <div class="music border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><Headset /></el-icon>
            <div style="margin-left: 2%">音乐鉴赏</div>
          </div>
        </div>
        <div class="music-title-contain">
          <div class="music-text">
            谁还不是个优雅不失风度的人呢,看电脑累了吧,给你推荐一首好听的音乐,闭一下眼睛听着音乐放松放松吧
          </div>
          <iframe
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            width="290"
            height="110"
            src="//music.163.com/outchain/player?type=0&id=2075587022&auto=1&height=90"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  margin-top: 59px;
  background-image: url("../assets/摄图网_401729159_渐变低多边形背景（非企业商用）.jpg");
  background-size: cover;
  position: relative;
  transition: all;
  transition-duration: 2s;
}
.article-list {
  width: 50%;
  height: 130vh;
  margin-top: 50px;
  margin-left: 12%;
  background-color: #fff;
  margin-bottom: 100px;
  animation-name: container;
  animation-duration: 2s;
}
.catalogue {
  position: absolute;
  left: 63%;
  top: 50px;
  width: 22%;
  height: 160px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.recent-article {
  position: absolute;
  left: 63%;
  top: 220px;
  width: 22%;
  height: 260px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.music {
  position: absolute;
  left: 63%;
  top: 490px;
  width: 22%;
  height: 260px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.border {
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #e3e1e3;
  box-shadow: 2px 2px 2px #e3e1e3;
}
.container-title {
  width: 100%;
  height: 40px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #8fb7bc;
}
.container-title-left {
  width: 31%;
  height: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  padding-left: 5%;
}
.music-title-contain {
  width: 100%;
  height: 220px;
}
.music-text {
  padding-left: 4%;
  padding-right: 4%;
  width: 100%;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 13px;
}
@keyframes container {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes container2 {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
