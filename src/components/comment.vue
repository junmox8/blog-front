<template>
  <el-dialog v-model="dialogFormVisible" title="添加评论">
    <el-input
      v-model="comment"
      :autosize="{ minRows: 2 }"
      type="textarea"
      placeholder="请输入评论"
      show-word-limit
      maxlength="50"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handUpComment">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible2" title="确定要删除此评论吗">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="comment-container">
    <div class="comment-container-avatar">
      <img
        :src="avatar"
        alt=""
        style="width: 100%; height: 100%; border-radius: 50%"
      />
    </div>
    <div class="comment-container-name">{{ name }}</div>
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
      <div class="comment-container-lou">
        {{ (page - 1) * 5 + index + 1 }}楼
      </div>
      <div class="comment-container-time">{{ time_tr }}</div>
    </div>
    <div class="comment-content-container">
      <div class="comment-container-content">
        {{ content }}
      </div>
      <div
        :style="{
          display: store.state.User.userId === userId ? 'block' : 'none',
        }"
        class="deleteText"
        @click="dialogFormVisible2 = true"
      >
        删除
      </div>
      <div @click="() => (dialogFormVisible = true)" class="responceText">
        回复
      </div>
    </div>
    <commentAttach
      @del="del"
      @resend="resend"
      v-for="(item, index) in commentAttach"
      :key="index"
      :fromUserId="item.fromUserId"
      :toUserId="item.toUserId"
      :time="item.createdAt"
      :content="item.content"
      :id="item.id"
      :commentId="item.commentId"
    ></commentAttach>
  </div>
</template>

<script>
import {
  handUpCommentAttach,
  getTheCommentAttach,
  deleteComment,
} from "../axios/service";
import { ref } from "vue";
import commentAttach from "./commentAttach.vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
  components: {
    commentAttach,
  },
  props: [
    "content",
    "time",
    "avatar",
    "name",
    "index",
    "articleId",
    "userId",
    "id",
    "page",
  ],
  emits: ["del"],
  async created() {
    this.time_tr = this.time
      .replace(/T/g, " ")
      .replace(/.[\d]{3}Z/, " ")
      .substring(0, 19);
    const result = await getTheCommentAttach(this.id);
    result.data.data.forEach((item) => {
      item.createdAt = dayjs(
        dayjs(
          item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
        ).valueOf() + 28800000
      ).format("YYYY-MM-DD HH:mm:ss");
    });
    this.commentAttach = result.data.data;
  },
  setup(props, context) {
    const dialogFormVisible2 = ref(false);
    const store = useStore();
    const time_tr = ref("");
    const dialogFormVisible = ref(false);
    const comment = ref("");
    const commentAttach = ref([]);
    const time2 = ref(null); //节流
    const handUpComment = async () => {
      if (!time2.value) {
        time2.value = setTimeout(() => {
          clearTimeout(time2.value);
          time2.value = null;
        }, 5000);
        if (comment.value.length > 0) {
          const result = await handUpCommentAttach(
            props.userId,
            props.id,
            comment.value
          );
          if (result) {
            ElMessage.success({
              type: "success",
              message: "回复成功",
            });
            const result2 = await getTheCommentAttach(props.id);
            result2.data.data.forEach((item) => {
              item.createdAt = dayjs(
                dayjs(
                  item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
                ).valueOf() + 28800000
              ).format("YYYY-MM-DD HH:mm:ss");
            });
            commentAttach.value = result2.data.data;
          } else
            ElMessage.error({
              type: "error",
              message: "回复失败,请稍后重试",
            });
          dialogFormVisible.value = false;
        } else ElMessage.error({ type: "error", message: "请填写内容" });
      } else
        ElMessage.error({
          type: "error",
          message: "请稍等一会再回复",
        });
    };
    const resend = async (data) => {
      const result = await getTheCommentAttach(props.id);
      result.data.data.forEach((item) => {
        item.createdAt = dayjs(
          dayjs(
            item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
          ).valueOf() + 28800000
        ).format("YYYY-MM-DD HH:mm:ss");
      });
      commentAttach.value = result.data.data;
    };
    const confirmDelete = async () => {
      const result = await deleteComment(props.id);
      if (result.data.success == true) {
        context.emit("del", props.id);
        dialogFormVisible2.value = false;
        ElMessage({
          message: "删除评论成功",
          type: "success",
        });
      } else
        ElMessage({
          message: result.data.errorMsg,
          type: "error",
        });
    };
    const del = async (id) => {
      commentAttach.value = commentAttach.value.filter(
        (item) => item.id !== id
      );
    };
    return {
      time_tr,
      dialogFormVisible,
      comment,
      commentAttach,
      time2,
      handUpComment,
      resend,
      store,
      confirmDelete,
      del,
      dialogFormVisible2,
    };
  },
};
</script>

<style>
.comment-container {
  width: 100%;
  min-height: 60px;
  height: auto;
  /* background-color: yellow; */
  position: relative;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c4c3c4;
  overflow: hidden;
}
.comment-container-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: 2.5%;
  top: 6px;
}
.comment-container-name {
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
.comment-container-time {
  margin-left: 10px;
}
.comment-content-container {
  width: calc(97.5% - 35px);
  margin-left: calc(2.5% + 35px);
  height: auto;
  margin-top: 35px;
  font-size: 15px;
  position: relative;
  margin-bottom: 5px;
}
.comment-container-content {
  width: auto;
  max-width: 80%;
  word-break: break-all;
  word-wrap: break-word;
}
.responceText {
  position: absolute;
  bottom: 5px;
  right: 0%;
  cursor: pointer;
  font-size: 12px;
  color: #8fc4f7;
}
.deleteText {
  position: absolute;
  bottom: 5px;
  right: 30px;
  cursor: pointer;
  font-size: 12px;
  color: #ab2520;
}
.commentAttach:nth-last-child(1) {
  border-style: hidden;
}
</style>
