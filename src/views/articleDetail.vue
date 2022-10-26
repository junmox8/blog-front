<template>
  <div
    style="container"
    ref="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
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
    <div
      style="
        width: 100%;
        height: auto;
        margin-bottom: 100px;
        display: flex;
        flex-wrap: nowrap;
      "
    >
      <el-card style="width: 60%; margin-left: 10%">
        <v-md-editor
          :model-value="content"
          mode="preview"
          ref="preview"
        ></v-md-editor>
        <!-- <v-md-preview :text="content" ref="preview" /> -->
      </el-card>
      <el-card
        ref="mulu"
        style="
          width: 20%;
          margin-left: 2%;
          height: 100px;
          position: fixed;
          top: 200px;
          right: 100px;
          transition: all;
          transition-duration: 1s;
        "
      >
        <div>目录锚点之后上线,敬请期待</div>
        <div
          v-for="(anchor, index) in titles"
          :key="index"
          :style="{
            padding: `10px 0 10px ${anchor.indent * 20}px`,
            display: 'none',
          }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </el-card>
    </div>
    <div
      style="
        width: 60%;
        margin-left: 10%;
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
    <div style="display: flex; justify-content: center; margin-bottom: 20px">
      <el-pagination
        background
        :page-size="5"
        layout="prev, pager, next"
        :total="number"
        @current-change="changePage"
        :current-page="currentPage"
      />
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  getArticleById,
  handUpComment,
  getAllContent,
  getCommentNumber,
  addPageViews,
} from "../axios/service";
import { ElMessage } from "element-plus";
import comment from "../components/comment.vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
export default {
  components: {
    comment,
  },
  name: "articleDetail",
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
    const result3 = await addPageViews(this.$route.query.id);
    if (result3.data.success != true) {
      ElMessage({
        message: result.data.errorMsg,
        type: "error",
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, true);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scroll, true);
  },
  data() {
    return {
      titles: [],
    };
  },
  methods: {
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;
      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );
      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
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
    const preview = ref(null);
    const mulu = ref(null);
    const store = useStore();
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          let anchors = preview.value;
          console.log(
            preview.value.$el.querySelectorAll(".github-markdown-body")[0]
          );
          console.log(
            preview.value.$el
              .querySelectorAll(".github-markdown-body")[0]
              .querySelectorAll("h1,h2,h3,h4,h5,h6")
          );
        }, 10);
      });

      // console.log(anchors);
      // const titles = Array.from(anchors).filter(
      //   (title) => !!title.innerText.trim()
      // );

      // if (!titles.length) {
      //   this.titles = [];
      //   return;
      // }

      // const hTags = Array.from(
      //   new Set(titles.map((title) => title.tagName))
      // ).sort();

      // this.titles = titles.map((el) => ({
      //   title: el.innerText,
      //   lineIndex: el.getAttribute("data-v-md-line"),
      //   indent: hTags.indexOf(el.tagName),
      // }));
    });
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
    const scroll = () => {
      if (
        window.document.documentElement.scrollTop >
        0.7 * window.screen.height //260 864
      )
        mulu.value.$el.style.opacity = 1;
      if (
        window.document.documentElement.scrollTop <=
        0.7 * window.screen.height
      )
        mulu.value.$el.style.opacity = 0;
    };
    return {
      ...toRefs(obj),
      textarea,
      articleId,
      commentArr,
      currentPage,
      number,
      preview,
      handupComment,
      changePage,
      scroll,
      mulu,
      store,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1288px;
  width: 100%;
  height: auto;
  /* margin-top: 59px; */
  background-size: cover;
  position: relative;
  transition: all;
  transition-duration: 2s;
  /* overflow: hidden; */
}
.articleDetail-title {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment-area {
  width: 60%;
  margin-left: 8.5%;
  height: auto;
  margin-bottom: 100px;
}
</style>
