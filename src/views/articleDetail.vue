<template>
  <div style="container">
    <div class="articleDetail-title">
      <div style="width: auto; max-width: 60%; height: auto">
        <div
          style="
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            word-break: break-all;
            word-wrap: break-word;
          "
        >
          <el-icon><Paperclip /></el-icon>

          <div>
            {{ title }}
          </div>
        </div>
        <div
          style="
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
          "
        >
          <el-icon><Clock /></el-icon>

          <div>{{ time }}</div>
        </div>
      </div>
    </div>
    <el-card style="width: 80%; margin-left: 10%; margin-bottom: 100px">
      <v-md-editor :model-value="content" mode="preview"></v-md-editor>
    </el-card>
    <div
      style="
        width: 60%;
        margin-left: 20%;
        height: 50px;
        margin-bottom: 100px;
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
      <el-button @click="handupComment" style="margin-left: 10px" type="primary"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getArticleById, handUpComment } from "../axios/service";
import { ElMessage } from "element-plus";
export default {
  async created() {
    const { data } = await getArticleById(this.$route.query.id);
    (this.title = data.data.title),
      (this.content = data.data.content),
      (this.time = data.data.createdAt.substring(0, 10));
    this.articleId = this.$route.query.id;
  },
  setup(props) {
    const route = useRoute();
    const obj = reactive({
      title: "",
      content: "",
      time: "",
    });
    const articleId = ref(0);
    const textarea = ref("");
    const handupComment = async () => {
      const result = await handUpComment(textarea.value, articleId.value);
      if (result) {
        ElMessage.success({
          type: "success",
          message: "发表评论成功",
        });
      } else
        ElMessage.error({
          type: "error",
          message: result.data.errorMsg,
        });
    };
    return {
      ...toRefs(obj),
      textarea,
      articleId,
      handupComment,
    };
  },
};
</script>

<style>
.container {
  width: 100%;
  height: auto;
  margin-top: 59px;
  background-image: url("../assets/摄图网_401729159_渐变低多边形背景（非企业商用）.jpg");
  background-size: cover;
  position: relative;
  transition: all;
  transition-duration: 2s;
  overflow: hidden;
}
.articleDetail-title {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
