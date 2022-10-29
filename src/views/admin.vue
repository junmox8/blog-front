<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
    <div class="article-list border">
      <div class="container-title">
        <div class="container-title-left" style="padding-left: 3%">
          <el-icon><Notebook /></el-icon>
          <div style="margin-left: 2%">文章列表</div>
        </div>
        <div class="container-title-right right2">
          <div>共</div>
          <div
            style="
              color: #ffd04b;
              font-size: 20px;
              margin-left: 12px;
              margin-right: 12px;
            "
          >
            {{ articleNumber }}
          </div>
          <div>篇</div>
        </div>
      </div>
      <div class="article-main">
        <div style="height: 720px; width: 100%">
          <Loading
            :style="{ display: loading == true ? 'block' : 'none' }"
          ></Loading>
          <Loading
            :style="{ display: loading == true ? 'block' : 'none' }"
          ></Loading>
          <Loading
            :style="{ display: loading == true ? 'block' : 'none' }"
          ></Loading>
          <Article
            @click="jumpToArticleDetail(item.id)"
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
          <div
            class="container-title-right"
            @click="() => router.push('/home/more')"
          >
            more
          </div>
        </div>
        <div class="catalogue-content">
          <el-tag
            class="catalogue-tags"
            size="large"
            effect="dark"
            style="margin-left: 6px; cursor: pointer"
            @click="() => router.push('/home/more?tagId=' + item.value)"
            v-for="(item, index) in tags"
            :key="index"
            :type="tagType[index % 5]"
            >{{ item.name }}</el-tag
          >
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
          <div
            class="container-title-right"
            @click="() => router.push('/home/more')"
          >
            more
          </div>
        </div>
        <div class="recent-article-main">
          <Loading2
            :style="{ display: loading2 == true ? 'block' : 'none' }"
          ></Loading2>
          <Article2
            v-for="(item, index) in recentArticle"
            :time="item.createdAt"
            :id="item.id"
            :key="index"
            :title="item.title"
          ></Article2>
        </div>
      </div>
    </div>
    <div class="music border">
      <div style="width: 100%; height: 100%">
        <div class="container-title">
          <div class="container-title-left">
            <el-icon><UserFilled /></el-icon>
            <div style="margin-left: 2%">My MakeFriend</div>
          </div>
        </div>
        <div class="music-title-contain">
          <el-tabs type="border-card" stretch>
            <el-tab-pane label="联系方式">
              <div style="width: 100%; display: flex">
                <div>
                  <i class="iconfont icon-qq"></i>
                  <span style="font-size: 13px">931097192</span>
                </div>
                <div style="margin-left: 20px">
                  <i class="iconfont icon-weixin"></i>
                  <span style="font-size: 13px">junmox8</span>
                </div>
              </div>
              <div style="width: 100%; display: flex; margin-top: 5px">
                <img
                  width="20"
                  src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/%E8%9A%81%E4%BA%BA.png "
                  alt=""
                />
                <div style="font-size: 13px">有问题欢迎同学来学习讨论^ ^</div>
              </div>
              <div
                style="font-size: 13px; margin-top: 5px; margin-bottom: 20px"
              >
                这个博客是我前段时间突发奇想花了十天,照着别人的ui设计自己写的一个小型全栈项目,后续会逐渐完善更多功能,目前比较简陋各位多多包涵,最后欢迎各位加我好友一起交流学习
              </div>
            </el-tab-pane>
            <el-tab-pane label="xxx"> 暂时没想好这里写啥= = </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineAsyncComponent } from "vue";
import { ref, reactive } from "vue";
import {
  getAllArticleNumber,
  getArticleList,
  getRecentArticle,
} from "../axios/service";
import Article from "../components/article.vue";
import Article2 from "../components/recentArticle.vue";
import { useRouter } from "vue-router";
export default {
  name: "admin",
  components: {
    Article,
    Loading: defineAsyncComponent(() => import("../components/loading.vue")),
    Loading2: defineAsyncComponent(() => import("../components/loading2.vue")),
    Article2,
  },
  async created() {
    this.loading = true;
    this.loading2 = true;
    const result = await getAllArticleNumber();
    this.articleNumber = result.data.data;
    const result2 = await getArticleList(1, 3);
    this.articleList = result2.data.data;
    this.loading = false;
    const result3 = await getRecentArticle();
    this.recentArticle = result3.data.data;
    this.loading2 = false;
  },
  setup() {
    const router = useRouter();
    const articleList = ref([]);
    const recentArticle = ref([]);
    const articleNumber = ref(0);
    const store = useStore();
    const tagType = ref(["", "success", "info", "warning", "danger"]);
    const loading = ref(false);
    const loading2 = ref(false);
    const tags = ref([
      { name: "vue3", value: 57 },
      { name: "react", value: 64 },
      { name: "nodejs", value: 60 },
      { name: "express", value: 61 },
      { name: "taro", value: 70 },
      { name: "git", value: 58 },
      { name: "css", value: 54 },
      { name: "nestjs", value: 72 },
      { name: "nextjs", value: 71 },
      { name: "webpack", value: 59 },
    ]);
    const changePage = async (n) => {
      loading.value = true;
      articleList.value = [];
      const result = await getArticleList(n, 3);
      articleList.value = result.data.data;
      loading.value = false;
    };
    const jumpToArticleDetail = async (id) => {
      router.push("/home/articleDetail?id=" + id);
    };
    return {
      articleList,
      articleNumber,
      tags,
      tagType,
      recentArticle,
      store,
      router,
      loading,
      loading2,
      changePage,
      jumpToArticleDetail,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1388px;
  width: 100%;
  height: auto;
  margin-top: 59px;
  background-size: cover;
  position: relative;
  transition: all;
  transition-duration: 2s;
  overflow: hidden;
}
/* @media screen and (max-width: 1515px) {
  .catalogue-tags {
    margin-left: 20px !important;
  }
}
@media screen and (min-width: 1515px) and (max-width: 1650px) {
  .catalogue-tags {
    margin-left: 30px !important;
  }
}
@media screen and (min-width: 1650px) and (max-width: 1800px) {
  .catalogue-tags {
    margin-left: 35px !important;
  }
}
@media screen and (min-width: 1800px) and (max-width: 1950px) {
  .catalogue-tags {
    margin-left: 42px !important;
  }
} */
/* @media screen and (max-width: 1600px) and (min-width: 1515px) {
  .catalogue-tags {
    margin-left: 28px !important;
  }
} */
.article-list {
  width: 50%;
  height: auto;
  min-height: 900px;
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
  height: auto;
  min-height: 800px;
  position: relative;
}
.article-main-bottom {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}
.catalogue-content {
  width: 100%;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-between;
  align-content: space-around;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
.catalogue-tags:hover {
  transform: scale(1.1);
}
.recent-article-main {
  height: 220px;
  width: 100%;
  perspective: 1000px;
  transform-style: preserve-3d;
  overflow: hidden;
}
.el-tabs--border-card {
  border-bottom-style: none;
}
</style>
