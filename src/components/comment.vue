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
        right: 2.5%;
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
      <div @click="() => (dialogFormVisible = true)" class="responceText">
        回复
      </div>
    </div>
    <commentAttach
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
import { handUpCommentAttach, getTheCommentAttach } from "../axios/service";
import { ref } from "vue";
import commentAttach from "./commentAttach.vue";
import { ElMessage } from "element-plus";
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
  async created() {
    this.time_tr = this.time
      .replace(/T/g, " ")
      .replace(/.[\d]{3}Z/, " ")
      .substring(0, 19);
    const result = await getTheCommentAttach(this.id);
    this.commentAttach = result.data.data;
  },
  setup(props) {
    const time_tr = ref("");
    const dialogFormVisible = ref(false);
    const comment = ref("");
    const commentAttach = ref([]);
    const handUpComment = async () => {
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
        commentAttach.value = result2.data.data;
      } else
        ElMessage.error({
          type: "error",
          message: "回复失败,请稍后重试",
        });
      dialogFormVisible.value = false;
    };
    const resend = async (data) => {
      const result = await getTheCommentAttach(props.id);
      commentAttach.value = result.data.data;
    };
    return {
      time_tr,
      dialogFormVisible,
      comment,
      commentAttach,
      handUpComment,
      resend,
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
  right: 3%;
  cursor: pointer;
  font-size: 12px;
  color: #8fc4f7;
}
</style>
