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
        <div class="catalogue-content">
          <el-tag
            class="catalogue-tags"
            size="large"
            effect="dark"
            style="margin-left: 6px; cursor: pointer"
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
          <div class="container-title-right">more</div>
        </div>
        <div class="recent-article-main">
          <Article2
            v-for="(item, index) in recentArticle"
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
                  src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/img/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89%20%281%29.jpg "
                  alt=""
                />
                <div style="font-size: 13px">有问题欢迎同学来学习讨论^ ^</div>
              </div>
              <div
                style="font-size: 13px; margin-top: 5px; margin-bottom: 25px"
              >
                这个博客是我前段时间突发奇想花了十天写的一个简单系统,照着别人的界面设计自己写的一个小型全栈项目,后续会逐渐完善更多功能,目前比较简陋各位多多包涵,最后欢迎各位加我好友一起交流学习
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
    Article2,
  },
  async created() {
    const result = await getAllArticleNumber();
    this.articleNumber = result.data.data;
    const result2 = await getArticleList(1);
    this.articleList = result2.data.data;
    const result3 = await getRecentArticle();
    this.recentArticle = result3.data.data;
  },
  setup() {
    const router = useRouter();
    const articleList = ref([]);
    const recentArticle = ref([]);
    const articleNumber = ref(0);
    const tagType = ref(["", "success", "info", "warning", "danger"]);
    const tags = ref([
      { name: "vue" },
      { name: "react" },
      { name: "nodejs" },
      { name: "express" },
      { name: "es6" },
      { name: "git" },
      { name: "css" },
      { name: "nginx" },
      { name: "云服务" },
    ]);
    const changePage = async (n) => {
      const result = await getArticleList(n);
      articleList.value = result.data.data;
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
      changePage,
      jumpToArticleDetail,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  margin-top: 30px;
  background-image: url("https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/img/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89%20%281%29.jpg");
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
.catalogue-content {
  width: 100%;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
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
}
</style>
