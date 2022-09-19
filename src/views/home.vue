<template>
  <div class="container">
    <div style="position: fixed; top: 0; width: 100%; z-index: 10">
      <el-menu
        default-active="/home/admin"
        router
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <div
          class="text"
          style="
            height: 100%;
            line-height: 59px;
            margin-left: 40px;
            margin-right: 280px;
            letter-spacing: 2px;
          "
        >
          CODEHJY
        </div>
        <el-menu-item index="/home/admin"
          ><el-icon><House /></el-icon>首页</el-menu-item
        >
        <el-menu-item index="/home/article"
          ><el-icon><ChatLineSquare /></el-icon>文章发布</el-menu-item
        >
        <el-menu-item index="/home/video"
          ><el-icon><VideoCamera /></el-icon>视频demo</el-menu-item
        >
        <el-menu-item index="/home/album"
          ><el-icon><Picture /></el-icon>云相册</el-menu-item
        >
        <el-menu-item index="/home/info"
          ><el-icon><User /></el-icon>个人信息</el-menu-item
        >
        <el-menu-item index="/home/message"
          ><el-icon><Edit /></el-icon>留言板</el-menu-item
        >
      </el-menu>
    </div>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <keep-alive include="admin,article">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import love from "../utils/createLove";
export default {
  mounted() {
    love();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  height: auto;
  min-width: 1162px;
  overflow: hidden;
}
.text {
  animation: color 3s linear infinite;
  outline: none;
}
@keyframes color {
  0% {
    color: #d02618;
  }
  5% {
    color: #d04e18;
  }
  10% {
    color: #dd8f10;
  }
  15% {
    color: #ddaf10;
  }
  20% {
    color: #ddd210;
  }
  25% {
    color: #cfdd10;
  }
  30% {
    color: #a6dd10;
  }
  35% {
    color: #8cdd10;
  }
  40% {
    color: #5cdd10;
  }
  45% {
    color: #29dd10;
  }
  50% {
    color: #10dd8c;
  }
  55% {
    color: #10ddbf;
  }
  60% {
    color: #10d2dd;
  }
  65% {
    color: #10acdd;
  }
  70% {
    color: #1083dd;
  }
  75% {
    color: #1063dd;
  }
  80% {
    color: #1039dd;
  }
  85% {
    color: #4910dd;
  }
  90% {
    color: #6c10dd;
  }
  95% {
    color: #8c10dd;
  }
  98% {
    color: #dd10dc;
  }
  100% {
    color: #dd1056;
  }
}
</style>
