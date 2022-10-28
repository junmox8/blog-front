<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
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
      <div class="message-content">
        <el-skeleton :rows="8" v-if="messageArr.length == 0 && number != 0" />
        <message
          v-for="(item, index) in messageArr"
          :key="index"
          :content="item.content"
          :time="item.createdAt"
          :avatar="item.User.avatar"
          :name="item.User.name"
          :index="index"
          :id="item.id"
          :userId="item.userId"
          :page="currentPage"
        ></message>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          margin-top: 30px;
        "
      >
        <el-pagination
          style="outline: none !important"
          background
          :page-size="5"
          layout="prev, pager, next"
          :total="number"
          @current-change="changePage"
          :current-page="currentPage"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import message from "../components/message.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import {
  handUpMessage,
  getAllMessageNumber,
  getOnePageMessage,
} from "../axios/service";
import dayjs from "dayjs";
import { ref, toRefs, onMounted } from "vue";
export default {
  async created() {
    const {
      data: { data: length },
    } = await getAllMessageNumber();
    this.number = length;
    const result = await getOnePageMessage(1);
    result.data.data.forEach((item) => {
      item.createdAt = dayjs(
        dayjs(
          item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
        ).valueOf() + 28800000
      ).format("YYYY-MM-DD HH:mm:ss");
    });
    this.messageArr = result.data.data;
  },
  components: {
    message,
  },
  setup() {
    const time = ref(null); //发送留言节流
    const text = ref(null);
    const textarea = ref("");
    const number = ref(0);
    const currentPage = ref(1);
    const messageArr = ref([]);
    const store = useStore();
    const handupComment = async () => {
      if (textarea.value.length == 0)
        return ElMessage({
          message: "请填写内容",
          type: "error",
        });
      if (!time.value) {
        time.value = setTimeout(() => {
          clearTimeout(time.value);
          time.value = null;
        }, 5000);
        const result = await handUpMessage(textarea.value);
        if (result.data.success == true) {
          ElMessage({
            message: "提交留言成功",
            type: "success",
          });
          const result2 = await getOnePageMessage(currentPage.value);
          result2.data.data.forEach((item) => {
            item.createdAt = dayjs(
              dayjs(
                item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
              ).valueOf() + 28800000
            ).format("YYYY-MM-DD HH:mm:ss");
          });
          messageArr.value = result2.data.data;
          number.value++;
        } else
          ElMessage({
            message: result.data.errorMsg,
            type: "error",
          });
      } else
        ElMessage.error({
          type: "error",
          message: "请稍等一会再回复",
        });
    };
    const changePage = async (page) => {
      messageArr.value = [];
      currentPage.value = page;
      const result = await getOnePageMessage(page);
      result.data.data.forEach((item) => {
        item.createdAt = dayjs(
          dayjs(
            item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
          ).valueOf() + 28800000
        ).format("YYYY-MM-DD HH:mm:ss");
      });
      messageArr.value = result.data.data;
    };
    return {
      text,
      textarea,
      number,
      currentPage,
      messageArr,
      store,
      time,
      handupComment,
      changePage,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 59px;
  width: 100%;
  min-width: 1388px;
  min-height: 90vh;
  height: auto;
  background-size: cover;
  transition: all;
  transition-duration: 2s;
}
.message-always {
  width: 80%;
  margin-left: 10%;
  height: auto;
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
.message-content {
  width: 90%;
  margin-left: 5%;
  height: auto;
  min-height: 400px;
}
.number,
li,
.el-pager li,
.el-pager {
  outline: none !important;
}
</style>
