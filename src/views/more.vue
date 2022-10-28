<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
    v-loading="loading"
  >
    <div class="more-title">
      <el-input
        @keydown="search($event)"
        style="width: 60%; height: 50px"
        v-model="input"
        placeholder="请输入"
        class="input-with-select"
      >
        <template #append>
          <el-icon @click="search($event, 1)" style="cursor: pointer"
            ><Search
          /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="checkbox-container">
      <div v-for="(item, index) in selects" class="checkbox-box" :key="index">
        <div class="label">{{ item.label }}</div>
        <div class="label-detail">
          <div
            class="label-tag"
            v-for="i in item.children"
            :key="i.value"
            :style="{
              color: isSelect[i.value - 1] == true ? '#16a0fb' : '#000000',
              borderRadius: '12px',
              backgroundColor:
                isSelect[i.value - 1] == true ? '#e1ecf9' : 'transparent',
            }"
            @click="clickTag(i.value)"
          >
            {{ i.label }}
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        'moreContent-container',
        articles.length > 0 ? '' : 'article-empty',
      ]"
    >
      <el-empty
        :image-size="200"
        description="暂无相关文章"
        :style="{ display: articles.length > 0 ? 'none' : 'block' }"
      />
      <moreArticle
        v-for="(item, index) in articles"
        :key="index"
        ref="articleRef"
        :canSee="canSee[index]"
        :avatar="item.User.avatar"
        :name="item.User.name"
        :cover="item.img"
        :title="item.title"
        :like="item.like"
        :look="item.look"
        :comment="item.comment"
        :id="item.id"
      ></moreArticle>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { data } from "../json/selectData";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ref, nextTick } from "vue";
import {
  getArticleList,
  searchArticle,
  searchArticleByTag,
} from "../axios/service";
import moreArticle from "../components/moreArticle.vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    moreArticle,
  },
  name: "more",
  async created() {
    this.loading = true;
    this.selects = data;
    data.forEach((item) => {
      item.children.forEach((i) => {
        this.isSelect.push(false);
      });
    });
    if (this.$route.query.tagId) {
      this.canScroll = false;
      //如果是点击标签进入此界面
      this.searchType = 3;
      this.selectTagValue.push(Number(this.$route.query.tagId));
      this.isSelect[this.$route.query.tagId - 1] =
        !this.isSelect[this.$route.query.tagId - 1];
      const {
        data: { data: result },
      } = await searchArticleByTag(
        JSON.stringify(this.selectTagValue),
        "",
        this.page
      );
      result.forEach((item) => {
        this.canSee.push(false);
      });
      this.$nextTick(() => (this.canScroll = true));
      this.articles = result;
      // if (this.articles.length > 0)  之所以去掉注释是因为标签搜索是
      //数据库找十二个数据判断它们的标签是否与要索引的一致 后续若优化搜索可以去掉
      if (this.articles.length > 0) this.page++;
    } else {
      this.canScroll = false;
      const {
        data: { data: result2 },
      } = await getArticleList(1, 12);
      result2.forEach((item) => {
        this.canSee.push(false);
      });
      this.articles = result2;
      this.$nextTick(() => (this.canScroll = true));
      if (this.articles.length > 0) this.page++;
    }
    this.loading = false;
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, true);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scroll, true);
  },
  setup() {
    const time = ref(null); //滚动节流
    const canScroll = ref(true); //防止点击标签时滚动 造成接口发送冲突问题
    const store = useStore();
    const input = ref(""); //输入框的值
    const word = ref(""); //实际搜索用的word
    const searchType = ref(1); //1为全部列表 2为输入搜索 3为标签搜索
    const selects = ref([]); //json数组
    const articleRef = ref([]); //ref
    const isSelect = ref([]); //判断是否选择标签 值为true/false
    const canSee = ref([]); //判断该article是否在可视区域内
    const selectTagValue = ref([]); //选择的tag index
    const page = ref(1); //发送接口的页数
    const articles = ref([1]);
    // key 0代表enter搜索 1代表点击搜索
    const loading = ref(false);
    const time2 = ref(null); //点击标签防抖发送请求
    const time3 = ref(null); //搜索节流
    const search = async (e, key = 0) => {
      if (!time3.value) {
        time3.value = setTimeout(() => {
          clearTimeout(time3.value);
          time3.value = null;
        }, 1000);
        if (e.key === "Enter" || key == 1) {
          page.value = 1; //初始化页数
          searchType.value = 2; //转换搜索模式
          word.value = input.value; //传值给真正发送接口的参数
          canSee.value = [];
          isSelect.value.forEach(
            (item, index) => (isSelect.value[index] = false)
          );
          selectTagValue.value = [];
          canScroll.value = false;
          const result = await searchArticle(word.value, page.value);
          articles.value = result.data.data;
          ElMessage({
            type: "success",
            message: "搜索成功",
          });
          if (articles.value.length > 0) {
            page.value++;
            articles.value.forEach((item) => {
              canSee.value.push(false);
            });
            nextTick(() => (canScroll.value = true));
          }
        }
      } else
        ElMessage({
          type: "error",
          message: "请稍后再搜索",
        });
    };
    const clickTag = async (index) => {
      isSelect.value[index - 1] = !isSelect.value[index - 1];
      if (isSelect.value[index - 1] == false)
        selectTagValue.value = selectTagValue.value.filter(
          (item) => item != index
        );
      else selectTagValue.value.push(index);
      searchType.value = selectTagValue.value.length == 3;
      selectTagValue.value.sort();
      page.value = 1;
      if (!time2) {
        time2.value = setTimeout(async () => {
          loading.value = true;
          canScroll.value = false;
          const {
            data: { data: result },
          } = await searchArticleByTag(
            JSON.stringify(selectTagValue.value.sort()),
            word.value,
            page.value
          );
          if (result.length > 0) page.value++;
          articles.value = result;
          time2.value = null;
          nextTick(() => (canScroll.value = true));
          loading.value = false;
        }, 1000);
      } else {
        clearTimeout(time2.value);
        time2.value = setTimeout(async () => {
          loading.value = true;
          canScroll.value = false;
          const {
            data: { data: result },
          } = await searchArticleByTag(
            JSON.stringify(selectTagValue.value.sort()),
            word.value,
            page.value
          );
          if (result.length > 0) {
            page.value++;
            nextTick(() => (canScroll.value = true));
          }
          articles.value = result;
          loading.value = false;
          time2.value = null;
        }, 1000);
      }
    };
    const scroll = async () => {
      if (!time.value) {
        //滚动加载
        if (
          window.document.documentElement.scrollHeight -
            window.document.documentElement.scrollTop <=
            1.0416 * window.screen.height &&
          canScroll.value == true &&
          searchType.value != 3
        ) {
          time.value = setTimeout(() => {
            clearTimeout(time.value);
            time.value = null;
          }, 500);
          switch (searchType.value) {
            case 1:
              const {
                data: { data: result },
              } = await getArticleList(page.value, 12);
              if (result.length > 0) {
                result.forEach((item) => {
                  canSee.value.push(false);
                });
                articles.value = [...articles.value, ...result];
                page.value++;
              }
              break;
            case 2:
              const {
                data: { data: result2 },
              } = await searchArticle(word.value, page.value);
              if (result2.length > 0) {
                result2.forEach((item) => {
                  canSee.value.push(false);
                });
                articles.value = [...articles.value, ...result2];
                page.value++;
              }
              break;
            // case 3:
            //   const {
            //     data: { data: result3 },
            //   } = await searchArticleByTag(
            //     JSON.stringify(selectTagValue.value.sort()),
            //     word.value,
            //     page.value
            //   );
            //   if (result3.length > 0) {
            //     result3.forEach((item) => {
            //       canSee.value.push(false);
            //     });
            //     articles.value = [...articles.value, ...result3];
            //     page.value++;
            //   }
            //   break;
          }
        }

        articleRef.value.forEach((item, index) => {
          if (
            item.$el.getBoundingClientRect().top > 0 &&
            item.$el.getBoundingClientRect().top < window.screen.height * 0.58
          ) {
            canSee.value[index] = true;
          }
        });
      }
    };
    return {
      store,
      input,
      selects,
      selectTagValue,
      articles,
      time,
      search,
      clickTag,
      scroll,
      isSelect,
      articleRef,
      canSee,
      page,
      searchType,
      loading,
      time2,
      time3,
      canScroll,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1288px;
  margin-top: 59px;
  width: 100%;
  min-height: 90vh;
  height: auto;
  background-size: cover;
  overflow: hidden;
  transition: all;
  transition-duration: 2s;
}
.more-title {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkbox-container {
  width: 80%;
  margin-left: 10%;
  height: 300px;
  border-radius: 12px;
  background-color: #f8f8f8;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.4);
}
.checkbox-box {
  height: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: 32px;
}
.label {
  width: 10%;
  text-align: center;
  font-size: 14px;
  padding-top: 5px;
}
.label-detail {
  width: 90%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.label-tag {
  height: 25px;
  line-height: 25px;
  width: auto;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 34px;
  margin-bottom: 10px;
  color: #1f292e;
  font-size: 13px;
}
.label-tag:hover {
  color: #16a0fb !important;
  cursor: pointer;
  border-radius: 12px;
  background-color: #e1ecf9;
}
.moreContent-container {
  width: 80%;
  margin-left: 10%;
  height: auto;
  min-height: 300px;
  margin-bottom: 20px;
  margin-top: 50px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.4);
  padding-top: 10px;
  padding-bottom: 5px;
}
.moreContent-container:after,
.moreContent-container:before {
  clear: both;
}
.article-empty {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
