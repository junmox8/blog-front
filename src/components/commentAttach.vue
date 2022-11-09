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
      <div
        :style="{
          display: store.state.User.userId === fromUserId ? 'block' : 'none',
        }"
        class="deleteText"
        @click="dialogFormVisible2 = true"
      >
        删除
      </div>
      <div @click="() => (dialogFormVisible = true)" class="responce-Text">
        回复
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserInfo,
  handUpCommentAttachAttach,
  deleteCommentAttach,
} from "../axios/service";
import { ref, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
  props: ["fromUserId", "toUserId", "time", "content", "id", "commentId"],
  emits: ["resend", "del"],
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
    const store = useStore();
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
    const time2 = ref(null); //节流
    const dialogFormVisible2 = ref(false);
    const handUpComment = async () => {
      if (!time2.value) {
        time2.value = setTimeout(() => {
          clearTimeout(time2.value);
          time2.value = null;
        }, 5000);
        if (comment.value.length > 0) {
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
        } else ElMessage.error({ type: "error", message: "请填写内容" });
      } else
        ElMessage.error({
          type: "error",
          message: "请稍等一会再回复",
        });
    };
    const confirmDelete = async () => {
      const result = await deleteCommentAttach(props.id);
      if (result.data.success == true) {
        emit("del", props.id);
        dialogFormVisible2.value = false;
        ElMessage({
          message: "删除留言成功",
          type: "success",
        });
      } else
        ElMessage({
          message: result.data.errorMsg,
          type: "error",
        });
    };
    return {
      time_tr,
      dialogFormVisible,
      comment,
      time2,
      ...toRefs(user1),
      ...toRefs(user2),
      handUpComment,
      store,
      confirmDelete,
      dialogFormVisible2,
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
  right: 0%;
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
</style>
