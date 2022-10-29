<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
    <el-card class="box-card">
      <div style="font-weight: 700; font-size: 21px">文章发布</div>
      <div style="margin-top: 20px; font-size: 13px">文章标题</div>
      <el-input
        v-model="title"
        style="margin-top: 10px"
        placeholder="请输入文章标题"
      />
      <div style="margin-top: 10px; font-size: 13px">文章封面图片</div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="handleStart"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div style="margin-top: 10px; font-size: 13px">文章简介</div>
      <el-input
        style="margin-top: 10px"
        v-model="introduction"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="请输入"
      />
      <div style="margin-top: 10px; font-size: 13px">文章主题内容</div>
      <MarkDown @getData="getData" style="margin-top: 10px"></MarkDown>
      <div style="margin-top: 10px; font-size: 13px">文章分类</div>
      <el-tree-select
        style="margin-top: 10px"
        v-model="value"
        :data="selectData"
        multiple
        :render-after-expand="false"
      />
      <div style="margin-top: 10px; font-size: 13px">文章标签</div>
      <div style="display: flex; align-items: center; flex-wrap: wrap">
        <el-tag
          style="margin-top: 10px; margin-right: 5px"
          v-for="(tag, index) in dynamicTags"
          :key="index"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          style="margin-top: 10px; width: 150px"
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          style="margin-top: 10px"
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          添加标签
        </el-button>
      </div>

      <el-button @click="handup" type="primary" style="margin-top: 10px"
        >提交</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { data } from "../json/selectData.js";
import { uploadFile } from "../utils/cos";
import { handUpArticle } from "../axios/service";
import { uploadContent } from "../utils/fileCos";
import pubsub from "pubsub-js";
import MarkDown from "../components/markDown.vue";
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElInput } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    MarkDown,
  },
  created() {
    this.selectData = data;
  },
  setup() {
    const imageUrl = ref("");
    const title = ref("");
    const introduction = ref("");
    const tagsColor = ref(["success", "info", "danger", "warning"]);
    const dynamicTags = ref([]);
    const InputRef = ref(null);
    const inputValue = ref("");
    const value = ref("");
    const content = ref("");
    const selectData = ref([]);
    const inputVisible = ref(false);
    const store = useStore();
    const getData = async (data) => {
      content.value = data;
      if (
        title.value.length > 0 &&
        introduction.value.length > 0 &&
        content.value.length > 0 &&
        dynamicTags.value.length > 0 &&
        value.value.length > 0 &&
        imageUrl.value.length > 0
      ) {
        if (data.length <= 10000) {
          const result = await handUpArticle(
            title.value,
            introduction.value,
            content.value,
            dynamicTags.value.join(),
            value.value.sort().join(),
            imageUrl.value
          );
          if (result.data.success == true) {
            ElMessage({
              type: "success",
              message: "成功发布推文",
            });
            window.location.reload();
          } else
            ElMessage({
              type: "error",
              message: "发布推文失败",
            });
        } else
          ElMessage({
            type: "error",
            message: "文本字数超出限制",
          });
      } else
        ElMessage({
          type: "error",
          message: "请补充完整信息",
        });
      // const fileContent = new File([data], "", { type: "txt" });
      // const file = new FileReader(fileContent);
      // // 文件上传传参是formdata格式
      // const formdata = new FormData();
      // // 模仿单文件上传给接口传参
      // formdata.append("file", fileContent);
      // await uploadContent(fileContent, fileContent.lastModified);
    };
    const handleStart = async (file) => {
      const result = await uploadFile(file.file, file.file.uid);
      imageUrl.value = result;
    };
    const handleClose = (tag) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
    };
    const showInput = () => {
      inputVisible.value = true;
    };
    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    const handup = async () => {
      pubsub.publish("getData", 1);
    };
    return {
      imageUrl,
      title,
      introduction,
      tagsColor,
      dynamicTags,
      InputRef,
      inputVisible,
      inputValue,
      selectData,
      value,
      content,
      store,
      getData,
      handleStart,
      handleClose,
      showInput,
      handleInputConfirm,
      handup,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1288px;
  margin-top: 59px;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  transition: all;
  transition-duration: 2s;
}
.box-card {
  width: 70%;
  min-height: 90vh;
  height: auto;
  margin-left: 15%;
  margin-top: 59px;
  margin-bottom: 50px;
  padding-left: 1%;
  animation-name: container;
  animation-duration: 2s;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
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
</style>
