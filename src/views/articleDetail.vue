<template>
  <div
    style="container"
    ref="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
    <div class="articleDetail-title">
      <div
        :style="{
          display: loading1 == false && loading2 == false ? 'none' : 'block',
        }"
        style="width: 40%"
      >
        <el-skeleton :rows="1" />
      </div>
      <div
        :style="{
          display: loading1 == false && loading2 == false ? 'block' : 'none',
        }"
        style="width: auto; max-width: 60%; height: auto"
      >
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
        <el-skeleton
          :style="{
            display: loading1 == false && loading2 == false ? 'none' : 'block',
          }"
          :rows="11"
        />
        <v-md-editor
          :style="{
            display: loading1 == false && loading2 == false ? 'block' : 'none',
          }"
          :model-value="content"
          mode="preview"
          ref="preview"
        ></v-md-editor>
        <!-- <v-md-preview :text="content" ref="preview" /> -->
      </el-card>
      <el-card
        style="
          width: 20%;
          height: 400px;
          margin-left: 2%;
          position: fixed;
          top: 200px;
          right: 3%;
        "
        :style="{
          display: loading1 == false && loading2 == false ? 'none' : 'block',
        }"
      >
        <el-skeleton :rows="11" />
      </el-card>
      <el-card
        ref="mulu"
        style="
          width: 20%;
          margin-left: 2%;
          height: 400px;
          position: fixed;
          top: 200px;
          right: 3%;
          transition: all;
          transition-duration: 1s;
          display: flex;
          flex-wrap: wrap;
        "
        :style="{
          backgroundColor:
            loading1 == false && loading2 == false ? '#fff' : 'transparent',
        }"
      >
        <div
          :style="{
            display: loading1 == false && loading2 == false ? 'block' : 'none',
          }"
          style="
            width: 100%;
            height: 10%;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: black;
            margin-bottom: 2%;
          "
        >
          目录
        </div>
        <div
          :style="{
            display: loading1 == false && loading2 == false ? 'block' : 'none',
          }"
          style="
            width: 100%;
            height: auto;
            max-height: 88%;
            overflow: scroll;
            overflow-x: hidden;
          "
        >
          <div
            v-for="(anchor, index) in titles"
            :key="index"
            :style="{
              padding: `0px 0px 10px ${(anchor.indent - 1) * 20}px`,
              marginBottom: '5px',
            }"
            @click="handleAnchorClick(anchor, index)"
          >
            <a ref="cursorTitle" style="cursor: pointer" class="cursor-title">{{
              anchor.title
            }}</a>
          </div>
        </div>
      </el-card>
    </div>
    <div class="icon-line"></div>
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
import { ref, reactive, toRefs, nextTick, onMounted, onUpdated } from "vue";
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
    this.loading1 = true;
    this.loading2 = true;
    this.loading3 = true;
    const { data } = await getArticleById(this.$route.query.id);
    (this.title = data.data.title),
      (this.content = data.data.content),
      (this.time = data.data.createdAt.substring(0, 10));
    this.loading1 = false;
    this.loading2 = false;
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
    this.loading3 = false;
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
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        let anchors =
          this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
        const titles = Array.from(anchors).filter(
          (title) => !!title.innerText.trim()
        );

        if (!titles.length) {
          this.titles = [];
          return;
        }

        const hTags = Array.from(
          new Set(titles.map((title) => title.tagName))
        ).sort();

        this.titles = titles.map((el) => ({
          title: el.innerText,
          lineIndex: el.getAttribute("data-v-md-line"),
          indent: hTags.indexOf(el.tagName),
        }));
      }, 10);
    });
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
    handleAnchorClick(anchor, index) {
      this.$refs.cursorTitle.forEach((item, ind) => {
        if (ind == index) item.style.color = "#8fc4f7";
        else item.style.color = "#000000";
      });
      const { preview } = this.$refs;
      const { lineIndex } = anchor;
      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );
      if (heading) {
        preview.previewScrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
  },
  setup(props) {
    const time2 = ref(null);
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
    const cursorTitle = ref([]);
    const loadings = reactive({
      //骨架屏
      loading1: false, //文章标题及内容
      loading2: false, //文章标签
      loading3: false, //文章评论
    });
    onUpdated(() => {});
    const handupComment = async () => {
      if (textarea.value.length == 0)
        return ElMessage.error({
          type: "error",
          message: "请填写评论内容",
        });
      if (!time2.value) {
        time2.value = setTimeout(() => {
          clearTimeout(time2.value);
          time2.value = null;
        }, 5000);
        const result = await handUpComment(textarea.value, articleId.value);
        if (result.data.success == true) {
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
          message: "请稍等一会再回复",
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
        mulu.value.$el.style.opacity = 0;
      if (
        window.document.documentElement.scrollTop <=
        0.7 * window.screen.height
      )
        mulu.value.$el.style.opacity = 1;
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
      time2,
      cursorTitle,
      ...toRefs(loadings),
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1288px;
  width: 100%;
  height: auto;
  min-height: 100vh;
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
.cursor-title:hover,
.cursor-title:visited {
  color: #8fc4f7;
}
.icon-line {
  width: 60%;
  margin-left: 10%;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 50px;
}
</style>
