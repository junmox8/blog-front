<template>
  <div class="container">
    <div class="article-list border">
      <div class="container-title">
        <div class="container-title-left" style="padding-left: 3%">
          <el-icon><Notebook /></el-icon>
          <div style="margin-left: 2%">文章列表</div>
        </div>
        <div class="container-title-right right2">
          共
          <div style="color: #ffd04b; font-size: 20px">
            {{ articleNumber }}
          </div>
          篇
        </div>
      </div>
      <div class="article-main">
        <div style="height: 720px; width: 100%">
          <Article
            v-for="(item, index) in articleList"
            :key="index"
            :img="item.img"
            :title="item.title"
            :introduction="item.introduction"
            :avatar="item.User.avatar"
            :name="item.User.name"
            :time="item.createdAt.substring(0, 10)"
            :tag="item.Categories"
            :like="item.like"
            :comment="item.comment"
            :look="item.look"
          ></Article>
          <!-- <Suspense>
            <template v-slot:fallback>
              <Loading></Loading>
            </template>
            <template v-slot:default>
              <Article
                v-for="(item, index) in articleList"
                :key="index"
              ></Article>
            </template>
          </Suspense> -->
        </div>
        <div class="article-main-bottom">
          <el-pagination
            :page-size="3"
            :pager-count="11"
            layout="prev, pager, next"
            :total="articleNumber"
            @current-change="changePage"
          />
        </div>
      </div>
    </div>
    <div class="catalogue border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><More /></el-icon>
            <div style="margin-left: 2%">分类</div>
          </div>
          <div class="container-title-right">more</div>
        </div>
      </div>
    </div>
    <div class="recent-article border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><Clock /></el-icon>
            <div style="margin-left: 2%">最近文章</div>
          </div>
          <div class="container-title-right">more</div>
        </div>
      </div>
    </div>
    <div class="music border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><Headset /></el-icon>
            <div style="margin-left: 2%">音乐鉴赏</div>
          </div>
        </div>
        <div class="music-title-contain">
          <div class="music-text">
            谁还不是个优雅不失风度的人呢,看电脑累了吧,给你推荐一首好听的音乐,闭一下眼睛听着音乐放松放松吧
          </div>
          <iframe
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            width="290"
            height="110"
            src="//music.163.com/outchain/player?type=0&id=2520739691&auto=1&height=90"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { ref, reactive } from "vue";
import { getAllArticleNumber, getArticleList } from "../axios/service";
import Article from "../components/article.vue";
export default {
  components: {
    Article,
    Loading: defineAsyncComponent(() => import("../components/loading.vue")),
  },
  async created() {
    const result = await getAllArticleNumber();
    this.articleNumber = result.data.data;
    const result2 = await getArticleList(1);
    this.articleList = result2.data.data;
    console.log(result2);
  },
  setup() {
    const articleList = ref([]);
    const articleNumber = ref(0);
    const changePage = async (n) => {
      const result = await getArticleList(n);
      articleList.value = result.data.data;
    };
    return {
      articleList,
      articleNumber,
      changePage,
    };
  },
};
</script>

<style scoped>
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
.article-list {
  width: 50%;
  height: 130vh;
  margin-top: 50px;
  margin-left: 12%;
  background-color: #fff;
  margin-bottom: 100px;
  animation-name: container;
  animation-duration: 2s;
}
.catalogue {
  position: absolute;
  left: 63%;
  top: 50px;
  width: 22%;
  height: 160px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.recent-article {
  position: absolute;
  left: 63%;
  top: 220px;
  width: 22%;
  height: 260px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.music {
  position: absolute;
  left: 63%;
  top: 490px;
  width: 22%;
  height: 260px;
  background-color: #fff;
  animation-name: container2;
  animation-duration: 2s;
}
.border {
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #e3e1e3;
  box-shadow: 2px 2px 2px #e3e1e3;
}
.container-title {
  width: 100%;
  height: 40px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #8fb7bc;
  position: relative;
}
.container-title-left {
  width: 60%;
  height: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  padding-left: 5%;
}
.container-title-right {
  position: absolute;
  width: auto;
  right: 5%;
  top: 0;
  height: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  padding-left: 5%;
  color: #818ad4;
  cursor: pointer;
}
.right2 {
  right: 3%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: #000000;
  letter-spacing: 10px;
}
.music-title-contain {
  width: 100%;
  height: 220px;
}
.music-text {
  padding-left: 4%;
  padding-right: 4%;
  width: 100%;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 13px;
}
@keyframes container {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes container2 {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.article-main {
  width: 100%;
  height: calc(100% - 40px);
  position: relative;
}
.article-main-bottom {
  width: 100%;
  height: calc(100% - 720px);
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}
</style>
