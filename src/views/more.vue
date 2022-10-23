<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
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
          <el-icon style="cursor: pointer"><Search /></el-icon>
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
      ></moreArticle>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import { data } from "../json/selectData";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { getArticleList } from "../axios/service";
import moreArticle from "../components/moreArticle.vue";
export default {
  components: {
    moreArticle,
  },
  async created() {
    this.selects = data;
    data.forEach((item) => {
      item.children.forEach((i) => {
        this.isSelect.push(false);
      });
    });
    const {
      data: { data: result },
    } = await getArticleList(1, 12);
    result.forEach((item) => {
      this.canSee.push(false);
    });
    this.articles = result;
    if (this.articles.length > 0) this.page++;
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, true);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scroll, true);
  },
  setup() {
    const time = ref(null);
    const store = useStore();
    const input = ref("");
    const selects = ref([]); //json数组
    const articleRef = ref([]); //ref
    const isSelect = ref([]); //判断是否选择标签 值为true/false
    const canSee = ref([]); //判断该article是否在可视区域内
    const selectTagValue = ref([]); //选择的tag index
    const page = ref(1); //发送接口的页数
    const articles = ref([1]);
    const search = (e) => {
      if (e.key === "Enter") alert("1");
    };
    const clickTag = (index) => {
      isSelect.value[index - 1] = !isSelect.value[index - 1];
      if (isSelect.value[index - 1] == "true")
        selectTagValue.value = selectTagValue.value.filter(
          (item) => item != index
        );
    };
    const scroll = async () => {
      if (!time.value) {
        //滚动加载
        // if (
        //   window.document.documentElement.scrollHeight -
        //     window.document.documentElement.scrollTop <=
        //   700
        // )
        //   console.log(1);
        articleRef.value.forEach((item, index) => {
          if (item.$el.getBoundingClientRect().top < 450) {
            canSee.value[index] = true;
          }
        });
        time.value = setTimeout(() => {
          clearTimeout(time.value);
          time.value = null;
        }, 500);
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
  color: #16a0fb;
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
