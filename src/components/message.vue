<template>
  <el-dialog v-model="dialogFormVisible" title="添加评论">
    <el-input
      v-model="message"
      :autosize="{ minRows: 2 }"
      type="textarea"
      placeholder="请输入评论"
      show-word-limit
      maxlength="50"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handUpMessage">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="message-container">
    <div class="message-container-avatar">
      <img
        :src="avatar"
        alt=""
        style="width: 100%; height: 100%; border-radius: 50%"
      />
    </div>
    <div class="message-container-name">{{ name }}</div>
    <div
      style="
        position: absolute;
        right: 0%;
        top: 6px;
        font-size: 14px;
        display: flex;
        flex-wrap: nowrap;
      "
    >
      <div class="message-container-lou">
        {{ (page - 1) * 5 + index + 1 }}楼
      </div>
      <div class="message-container-time">{{ time_tr }}</div>
    </div>
    <div class="message-content-container">
      <div class="message-container-content">
        {{ content }}
      </div>
      <div @click="() => (dialogFormVisible = true)" class="responceText">
        回复
      </div>
    </div>
    <messageAttach
      @resend="resend"
      v-for="(item, index) in messageAttach"
      :key="index"
      :fromUserId="item.fromUserId"
      :toUserId="item.toUserId"
      :time="item.createdAt"
      :content="item.content"
      :id="item.id"
      :messageId="item.messageId"
    ></messageAttach>
  </div>
</template>

<script>
import { handUpMessageAttach, getTheMessageAttach } from "../axios/service";
import { ref } from "vue";
import messageAttach from "./messageAttach.vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
export default {
  components: {
    messageAttach,
  },
  props: ["content", "time", "avatar", "name", "index", "userId", "id", "page"],
  async created() {
    this.time_tr = this.time
      .replace(/T/g, " ")
      .replace(/.[\d]{3}Z/, " ")
      .substring(0, 19);
    const result = await getTheMessageAttach(this.id);
    result.data.data.forEach((item) => {
      item.createdAt = dayjs(
        dayjs(
          item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
        ).valueOf() + 28800000
      ).format("YYYY-MM-DD HH:mm:ss");
    });
    this.messageAttach = result.data.data;
  },
  setup(props) {
    const time_tr = ref("");
    const dialogFormVisible = ref(false);
    const message = ref("");
    const messageAttach = ref([]);
    const time2 = ref(null); //节流
    const handUpMessage = async () => {
      if (!time2.value) {
        time2.value = setTimeout(() => {
          clearTimeout(time2.value);
          time2.value = null;
        }, 5000);
        if (message.value.length > 0) {
          const result = await handUpMessageAttach(
            message.value,
            props.userId,
            props.id
          );
          if (result) {
            ElMessage.success({
              type: "success",
              message: "回复成功",
            });
            const result2 = await getTheMessageAttach(props.id);
            result2.data.data.forEach((item) => {
              item.createdAt = dayjs(
                dayjs(
                  item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
                ).valueOf() + 28800000
              ).format("YYYY-MM-DD HH:mm:ss");
            });
            messageAttach.value = result2.data.data;
          } else
            ElMessage.error({
              type: "error",
              message: "回复失败,请稍后重试",
            });
          dialogFormVisible.value = false;
        } else
          ElMessage.error({
            type: "error",
            message: "请填写内容",
          });
      } else
        ElMessage.error({
          type: "error",
          message: "请稍等一会再回复",
        });
    };
    const resend = async (data) => {
      const result = await getTheMessageAttach(props.id);
      result.data.data.forEach((item) => {
        item.createdAt = dayjs(
          dayjs(
            item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
          ).valueOf() + 28800000
        ).format("YYYY-MM-DD HH:mm:ss");
      });
      messageAttach.value = result.data.data;
    };
    return {
      time_tr,
      dialogFormVisible,
      message,
      messageAttach,
      time2,
      handUpMessage,
      resend,
    };
  },
};
</script>

<style>
.message-container {
  width: 100%;
  min-height: 60px;
  height: auto;
  /* background-color: yellow; */
  position: relative;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c4c3c4;
  border-collapse: separate;
  overflow: hidden;
}
.message-container-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: 2.5%;
  top: 6px;
}
.message-container-name {
  width: auto;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  top: 8px;
  left: calc(2.5% + 35px);
  color: #e55e18;
  font-size: 14px;
  font-weight: 600;
}
.message-container-time {
  margin-left: 10px;
}
.message-content-container {
  width: calc(97.5% - 35px);
  margin-left: calc(2.5% + 35px);
  height: auto;
  margin-top: 35px;
  font-size: 15px;
  position: relative;
  margin-bottom: 5px;
}
.message-container-content {
  width: auto;
  max-width: 80%;
  word-break: break-all;
  word-wrap: break-word;
}
.responceText {
  position: absolute;
  bottom: 5px;
  right: 0;
  cursor: pointer;
  font-size: 12px;
  color: #8fc4f7;
}
.messageAttach:nth-last-child(1) {
  border-style: hidden;
}
</style>
