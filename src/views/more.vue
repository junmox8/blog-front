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
            ref="tagSelected"
            v-for="i in item.children"
            :key="i.value"
            :isSelect="false"
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
      <moreArticle></moreArticle>
      <moreArticle></moreArticle>
      <moreArticle></moreArticle>
      <moreArticle></moreArticle>
      <moreArticle></moreArticle>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import { data } from "../json/selectData";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ref } from "vue";
import moreArticle from "../components/moreArticle.vue";
export default {
  components: {
    moreArticle,
  },
  created() {
    this.selects = data;
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
    const tagSelected = ref([]); //ref
    const selectTagValue = ref([]); //选择的tag index
    const articles = ref([1]);
    const search = (e) => {
      if (e.key === "Enter") alert("1");
    };
    const clickTag = (index) => {
      console.log(tagSelected.value[index - 1].getAttribute("isSelect"));
      if (tagSelected.value[index - 1].getAttribute("isSelect") == "false") {
        tagSelected.value[index - 1].setAttribute("isSelect", "true");
        tagSelected.value[index - 1].style.color = "#16a0fb";
        tagSelected.value[index - 1].style.backgroundColor = "#e1ecf9";
        tagSelected.value[index - 1].style.borderRadius = "12px";
        selectTagValue.value.push(index);
      } else {
        tagSelected.value[index - 1].setAttribute("isSelect", "false");
        tagSelected.value[index - 1].style.color = "#000000";
        tagSelected.value[index - 1].style.backgroundColor = "transparent";
        tagSelected.value[index - 1].style.borderRadius = "12px";
        selectTagValue.value = selectTagValue.value.filter(
          (item) => item != index
        );
      }
    };
    const scroll = async () => {
      if (!time.value) {
        // console.log(window.document.documentElement.scrollTop);
        // console.log(window.screen.height);
        if (
          window.document.documentElement.scrollHeight -
            window.document.documentElement.scrollTop <=
          700
        )
          console.log(1);
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
      tagSelected,
      selectTagValue,
      articles,
      time,
      search,
      clickTag,
      scroll,
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
