<template>
  <div class="artist-container">
    <div class="img-container">
      <el-image
        style="width: 100%; height: 100%"
        :src="img"
        lazy
        :preview-src-list="srcList"
      />
    </div>
    <div class="content-container">
      <div class="content-container-title">
        <div
          style="width: 5%; height: 100%; display: flex; align-items: center"
        >
          <el-icon><Paperclip /></el-icon>
        </div>
        <div
          style="
            width: auto;
            max-width: 95%;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ title }}
        </div>
      </div>
      <div class="content-container-introduction" style="display: -webkit-box">
        {{ introduction }}
      </div>
      <div class="content-container-info">
        <img
          style="
            height: 30px;
            width: 30px;
            border-radius: 50%;
            vertical-align: bottom;
          "
          :src="avatar"
          alt=""
        />
        <div
          style="
            align-self: flex-end;
            margin-left: 5px;
            font-size: 13px;
            color: #0392dc;
          "
        >
          {{ name }}
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 30px;
            align-self: flex-end;
            font-size: 12px;
          "
        >
          <el-icon><Clock /></el-icon>
          <div style="margin-left: 2px">{{ time }}</div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 30px;
            align-self: flex-end;
            font-size: 12px;
          "
        >
          <el-icon><Star /></el-icon>
          <div style="margin-left: 2px">{{ like }}</div>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: 10px;
            align-self: flex-end;
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
            align-self: flex-end;
            font-size: 12px;
          "
        >
          <el-icon><View /></el-icon>
          <div style="margin-left: 2px">{{ look }}</div>
        </div>
      </div>
      <div class="content-container-tag">
        <el-tag
          style="margin-left: 5px"
          v-for="(item, index) in tag"
          :key="index"
          :type="tagType[index % 5]"
          >{{ item.name }}</el-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "article",
  props: [
    "img",
    "title",
    "introduction",
    "avatar",
    "name",
    "time",
    "tag",
    "like",
    "comment",
    "look",
  ],
  created() {},
  setup(props, context) {
    const tagType = ref(["", "success", "info", "warning", "danger"]);
    return {
      tagType,
    };
  },
};
</script>

<style scoped>
.artist-container {
  width: 100%;
  height: 240px;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-wrap: nowrap;
  border-bottom-style: solid;
  border-bottom-color: #edeced;
  border-bottom-width: 1px;
  /* background-color: green; */
}
.img-container {
  width: 30%;
  height: 100%;
  /* background-color: red; */
}
.content-container {
  width: 65%;
  height: 100%;
  margin-left: 5%;
  cursor: pointer;
  transition: all;
  transition-duration: 1s;
  /* background-color: yellow; */
}
.content-container:hover {
  transform: translateZ(-20px) scale(0.9);
}
.content-container-title {
  width: 90%;
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.content-container-introduction {
  overflow: hidden;
  height: 56px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  width: 90%;
  margin-top: 10px;
  font-size: 14px;
  color: #474547;
}
.content-container-info {
  margin-top: 20px;
  width: 90%;
  height: 30px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.content-container-tag {
  width: 90%;
  margin-top: 15px;
  height: 30px;
  /* background-color: red; */
}
</style>
