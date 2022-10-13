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
        margin-left: 25%;
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
    <div class="comment-area">
      <el-skeleton :rows="8" v-if="commentArr.length == 0 && number != 0" />
      <comment
        v-for="(item, index) in commentArr"
        :key="index"
        :content="item.content"
        :time="item.createdAt"
        :avatar="item.User.avatar"
        :name="item.User.name"
        :index="index"
        :articleId="item.articleId"
        :id="item.id"
        :userId="item.userId"
        :page="currentPage"
      ></comment>
    </div>
    <div style="display: flex; justify-content: center; margin-bottom: 50px">
      <el-pagination
        background
        :page-size="5"
        layout="prev, pager, next"
        :total="number"
        @current-change="changePage"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import {
  getArticleById,
  handUpComment,
  getAllContent,
  getCommentNumber,
} from "../axios/service";
import { ElMessage } from "element-plus";
import comment from "../components/comment.vue";
import dayjs from "dayjs";
export default {
  components: {
    comment,
  },
  async created() {
    const { data } = await getArticleById(this.$route.query.id);
    (this.title = data.data.title),
      (this.content = data.data.content),
      (this.time = data.data.createdAt.substring(0, 10));
    this.articleId = this.$route.query.id;
    const result = await getAllContent(this.$route.query.id, 1);
    result.data.data.forEach((item) => {
      item.createdAt = dayjs(
        dayjs(
          item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
        ).valueOf() + 28800000
      ).format("YYYY-MM-DD HH:mm:ss");
    });
    this.commentArr = result.data.data;
    const result2 = await getCommentNumber(this.$route.query.id);
    this.number = result2.data.data;
  },
  setup(props) {
    const route = useRoute();
    const obj = reactive({
      title: "",
      content: "",
      time: "",
    });
    const commentArr = ref([]);
    const articleId = ref(0);
    const textarea = ref("");
    const currentPage = ref(1);
    const number = ref(0);
    const handupComment = async () => {
      if (textarea.value.length > 0) {
        const result = await handUpComment(textarea.value, articleId.value);
        if (result) {
          ElMessage.success({
            type: "success",
            message: "发表评论成功",
          });
          const result2 = await getAllContent(
            articleId.value,
            currentPage.value
          );
          commentArr.value = result2.data.data;
          number.value++;
        } else
          ElMessage.error({
            type: "error",
            message: result.data.errorMsg,
          });
      } else
        ElMessage.error({
          type: "error",
          message: "请填写评论内容",
        });
    };
    const changePage = async (page) => {
      commentArr.value = [];
      currentPage.value = page;
      const result = await getAllContent(route.query.id, page);
      result.data.data.forEach((item) => {
        item.createdAt = dayjs(
          dayjs(
            item.createdAt.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")
          ).valueOf() + 28800000
        ).format("YYYY-MM-DD HH:mm:ss");
      });
      commentArr.value = result.data.data;
    };
    return {
      ...toRefs(obj),
      textarea,
      articleId,
      commentArr,
      currentPage,
      number,
      handupComment,
      changePage,
    };
  },
};
</script>

<style>
.container {
  width: 100%;
  height: auto;
  margin-top: 59px;
  background-image: url("https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/img/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89%20%281%29.jpg ");
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
.comment-area {
  width: 80%;
  margin-left: 10%;
  height: auto;
  margin-bottom: 100px;
}
</style>
