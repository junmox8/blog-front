<template>
  <div class="more-Article">
    <div class="article-cover">
      <div
        style="border-radius: 12px; height: 100%; width: 100%"
        @click="router.push('/home/articleDetail?id=' + id)"
      >
        <img
          style="width: 100%; height: 100%"
          :src="
            canSee == true
              ? cover
              : 'https://p3.ssl.qhimgs1.com/sdr/400__/t018609111cb4a43413.jpg'
          "
          alt=""
        />
      </div>
      <div class="hover-cover">
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 65%;
            font-size: 12px;
          "
        >
          <el-icon><Star /></el-icon>
          <div style="margin-left: 2px">{{ likeNumber }}</div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 10px;
            font-size: 12px;
          "
        >
          <el-icon><ChatDotSquare /></el-icon>
          <div style="margin-left: 2px">{{ comment }}</div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 10px;
            font-size: 12px;
          "
        >
          <el-icon><View /></el-icon>
          <div style="margin-left: 2px">{{ look }}</div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 68px">
      <el-skeleton
        :style="{
          display: canSee == false ? 'block' : 'none',
          marginTop: '5px',
        }"
        :rows="1"
        animated
      />
      <el-popover
        placement="right"
        :width="200"
        trigger="hover"
        :content="title"
        :style="{ display: canSee == true ? 'block' : 'none' }"
      >
        <template #reference>
          <div
            class="moreArticle-text"
            :style="{ display: canSee == true ? 'block' : 'none' }"
          >
            {{ title }}
          </div>
        </template>
      </el-popover>
      <div
        class="moreArticle-userInfo"
        :style="{ display: canSee == true ? 'flex' : 'none' }"
      >
        <img
          style="width: 25px; height: 25px; border-radius: 50%"
          :src="avatar"
          class="avatar"
        />
        <div class="moreArticle-name">{{ name }}</div>
        <div class="moreArticle-dianzan" @click="star">
          <i
            :style="{ color: dianzan == true ? 'yellow' : '' }"
            :class="[
              'iconfont',
              dianzan == true ? 'icon-star-fill' : 'icon-star',
            ]"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { likeOrNot, hasLike } from "../axios/service";
import { ref, reactive, toRefs } from "vue";
export default {
  name: "moreArticle",
  props: [
    "canSee",
    "avatar",
    "name",
    "cover",
    "title",
    "like",
    "look",
    "comment",
    "id",
  ],
  async created() {
    const {
      data: { data: result },
    } = await hasLike(this.id);
    if (result == 1) this.dianzan = true;
    this.likeNumber = this.like;
  },
  setup(props) {
    const router = useRouter();
    const dianzan = ref(false);
    const likeNumber = ref(0);
    const star = async () => {
      const {
        data: { data, success, errorMsg },
      } = await likeOrNot(props.id);
      if (success == true) {
        if (data.includes("取消")) likeNumber.value -= 1;
        else likeNumber.value += 1;
        ElMessage({ type: "success", message: data });
        dianzan.value = !dianzan.value;
      } else ElMessage({ type: "error", message: errorMsg });
    };
    return {
      dianzan,
      likeNumber,
      router,
      star,
    };
  },
};
</script>

<style scoped lang="scss">
.more-Article {
  width: 23.4%;
  height: 260px !important;
  margin-left: 1.28%;
  float: left;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 6px;
  transition-duration: 1.5s;
  border-color: #ebebeb;
}
@media screen and (min-width: 1388px) {
  .more-Article {
    margin-left: 1.3%;
  }
}
.more-Article:hover {
  transform: translateY(-10px);
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-style: solid;
  border-width: 1px;
  border-color: #ebebeb;
  .hover-cover {
    opacity: 1;
  }
  .moreArticle-dianzan {
    border-style: solid;
    border-width: 1px;
    border-color: #a4adb3;
  }
}
.article-cover {
  height: 185px;
  position: relative;
}
.hover-cover {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.15s ease-in-out 0s;
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.moreArticle-text {
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #5e6b72;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 5px;
}
.moreArticle-userInfo {
  height: 43px;
  width: 100%;
  padding-left: 10px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  position: relative;
}
.moreArticle-name {
  font-size: 13px;
  color: #1f292e;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.moreArticle-dianzan {
  height: 25px;
  width: 30px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
