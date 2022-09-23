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
  <div class="commentAttach">
    <div class="commentAttach-title">
      <div class="commentAttach-title-left">
        <div class="commentAttach-title-avatar1">
          <img
            :src="avatar"
            alt=""
            style="width: 100%; height: 100%; border-radius: 50%"
          />
        </div>
        <div class="commentAttach-title-name1">{{ name }}</div>
        <div
          style="
            font-size: 13px;
            line-height: 32px;
            margin-left: 10px;
            color: #777888;
          "
        >
          回复
        </div>
        <div class="commentAttach-title-avatar2">
          <img
            :src="avatar2"
            alt=""
            style="width: 100%; height: 100%; border-radius: 50%"
          />
        </div>
        <div class="commentAttach-title-name2">{{ name2 }}</div>
      </div>
      <div class="commentAttach-time">{{ time_tr }}</div>
    </div>
    <div class="commentAttach-content">
      <div
        style="
          width: auto;
          max-width: 75%;
          word-break: break-all;
          word-wrap: break-word;
        "
      >
        {{ content }}
      </div>
      <div @click="() => (dialogFormVisible = true)" class="responce-Text">
        回复
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, handUpCommentAttachAttach } from "../axios/service";
import { ref, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
export default {
  props: ["fromUserId", "toUserId", "time", "content", "id", "commentId"],
  emits: ["resend"],
  async created() {
    this.time_tr = this.time
      .replace(/T/g, " ")
      .replace(/.[\d]{3}Z/, " ")
      .substring(0, 19);
    const result = await getUserInfo(this.fromUserId);
    const result2 = await getUserInfo(this.toUserId);
    const {
      data: { data: data2 },
    } = result;
    const {
      data: { data: data3 },
    } = result2;
    this.avatar = data2.avatar;
    this.name = data2.name;
    this.avatar2 = data3.avatar;
    this.name2 = data3.name;
  },
  setup(props, { emit }) {
    const time_tr = ref("");
    const user1 = reactive({
      avatar: "",
      name: "",
    });
    const user2 = reactive({
      avatar2: "",
      name2: "",
    });
    const dialogFormVisible = ref(false);
    const comment = ref("");
    const handUpComment = async () => {
      dialogFormVisible.value = false;
      const result = await handUpCommentAttachAttach(
        comment.value,
        props.fromUserId,
        props.commentId
      );
      if (result) {
        ElMessage.success({
          type: "success",
          message: "回复成功",
        });
        emit("resend", 1);
      } else
        ElMessage.error({
          type: "error",
          message: "回复失败,请稍后重试",
        });
    };
    return {
      time_tr,
      dialogFormVisible,
      comment,
      ...toRefs(user1),
      ...toRefs(user2),
      handUpComment,
    };
  },
};
</script>

<style>
.commentAttach {
  width: calc(97.5% - 35px);
  margin-left: calc(2.5% + 35px);
  min-height: 60px;
  height: auto;
  position: relative;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #c4c3c4;
  overflow: hidden;
  padding-bottom: 5px;
}
.commentAttach-title {
  height: 35px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
}
.commentAttach-time {
  position: absolute;
  right: 2.8%;
  top: 6px;
  font-size: 14px;
}
.commentAttach-title-left {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
}
.commentAttach-title-avatar1 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 2.5%;
  margin-top: 6px;
}
.commentAttach-title-avatar2 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 2%;
  margin-top: 6px;
}
.commentAttach-title-name1 {
  width: auto;
  max-width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  margin-left: 5px;
  color: #e55e18;
  font-size: 14px;
  font-weight: 600;
}
.commentAttach-title-name2 {
  width: auto;
  max-width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  margin-left: 5px;
  color: #e55e18;
  font-size: 14px;
  font-weight: 600;
}
.commentAttach-content {
  margin-left: calc(2.5% + 30px);
  width: calc(97.5% - 30px);
  position: relative;
}
.responce-Text {
  position: absolute;
  bottom: 5px;
  right: 3.3%;
  cursor: pointer;
  font-size: 12px;
  color: #8fc4f7;
}
</style>
