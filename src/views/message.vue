<template>
  <div class="container">
    <el-card shadow="always" class="message-always">
      <div class="message-dan">
        <div class="message-text" ref="text">
          可以给开发者提点建议,也欢迎各位从事开发的同学在此交流学习
        </div>
      </div>
      <div
        style="
          width: 60%;
          margin-left: 25%;
          height: 50px;
          margin-bottom: 100px;
          margin-top: 100px;
          display: flex;
          align-items: center;
        "
      >
        <el-input
          style="width: 80%"
          v-model="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          maxlength="100"
          placeholder="请输入"
          resize="none"
          show-word-limit
        />
        <el-button
          @click="handupComment"
          style="margin-left: 10px"
          type="primary"
          >提交</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, toRefs, onMounted } from "vue";
export default {
  setup() {
    const text = ref(null);
    const textarea = ref("");
    const handupComment = async () => {};
    return {
      text,
      textarea,
      handupComment,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 59px;
  width: 100%;
  min-height: 90vh;
  height: auto;
  background-image: url("https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89.jpg");
  background-size: cover;
}
.message-always {
  width: 80%;
  margin-left: 10%;
  height: 800px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.message-dan {
  width: 100%;
  height: 40px;
  position: relative;
}
.message-text {
  width: 550px;
  height: 40px;
  left: 100%;
  line-height: 40px;
  position: absolute;
  transition: all;
  transition-duration: 3s;
  animation-name: a;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-delay: initial;
  animation-timing-function: linear;
  color: #ffd04b;
}
.message-text:hover {
  animation-play-state: paused;
}
@keyframes a {
  from {
    left: 100%;
    top: 0;
  }
  to {
    left: -100%;
  }
}
</style>
