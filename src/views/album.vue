<template>
  <el-dialog v-model="dialogVisible2" title="添加图片">
    <el-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :http-request="handleStart"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="upload">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible" title="添加分类" width="30%">
    <el-input v-model="input" placeholder="请输入分类名" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFenlei">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="container">
    <el-card class="album-container">
      <el-tabs
        @tab-change="changeTab"
        v-model="editableTabsValue"
        type="card"
        addable
        stretch
        class="demo-tabs"
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <template v-slot>
            <div @scroll="scroll" class="pane-container" ref="contain">
              <el-button
                @click="toTop"
                class="toTop"
                type="primary"
                :icon="ArrowUp"
                circle
              />
              <el-button
                @click="() => (dialogVisible2 = true)"
                class="upload"
                type="primary"
                :icon="Upload"
                circle
              />
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { uploadFile } from "../utils/cos";
import {
  handUpImgKind,
  getAllImgKinds,
  handUpImg,
  getImgs,
} from "../axios/service";
import { ArrowUp, Upload } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  async created() {
    const result = await getAllImgKinds();
    result.data.data.forEach((item) => {
      this.editableTabs.push({
        title: item.name,
        name: item.name,
      });
    });
  },
  setup() {
    const editableTabsValue = ref("0");
    const editableTabs = ref([]);
    const dialogVisible = ref(false);
    const dialogVisible2 = ref(false);
    const input = ref("");
    const contain = ref(null);
    const fileList = ref([]);
    const handleTabsEdit = (targetName, action) => {
      if (action === "add") {
        dialogVisible.value = true;
      } else if (action === "remove") {
        const tabs = editableTabs.value;
        let activeName = editableTabsValue.value;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        editableTabsValue.value = activeName;
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
      }
    };
    const addFenlei = async () => {
      dialogVisible.value = false;
      const result = await handUpImgKind(input.value);
      if (result.data.success == true) {
        const result2 = await getAllImgKinds();
        editableTabs.value = [];
        result2.data.data.forEach((item) => {
          editableTabs.value.push({
            title: item.name,
            name: item.name,
          });
        });
        editableTabsValue.value = input.value;
        ElMessage({
          type: "success",
          message: "添加分类成功",
        });
      } else
        ElMessage({
          type: "error",
          message: result.data.errorMsg,
        });
    };
    const toTop = () => {
      contain.value[0].scrollTop = 0;
    };
    const scroll = () => {
      if (
        contain.value[0].scrollTop + contain.value[0].clientHeight >=
        contain.value[0].scrollHeight
      )
        console.log(1);
    };
    const upload = async () => {
      let urls = "";
      fileList.value.forEach((item, index) => {
        if (index != fileList.value.length - 1) urls += item.url + ",";
        else urls += item.url;
      });
      const result = await handUpImg(urls, editableTabsValue.value);
      if (result.data.success == true) {
        ElMessage({
          type: "success",
          message: "上传图片成功",
        });
      } else
        ElMessage({
          type: "error",
          message: result.data.errorMsg,
        });
    };
    const handleStart = async (file) => {
      const result = await uploadFile(file.file, file.file.uid);
      fileList.value.push({
        name: file.file.uid,
        url: result,
      });
      fileList.value.splice(fileList.value.length - 2, 1);
    };
    const changeTab = async (name) => {
      const {
        data: { data: data2 },
      } = await getImgs(name);
      console.log(data2);
    };
    return {
      editableTabsValue,
      editableTabs,
      dialogVisible,
      dialogVisible2,
      input,
      contain,
      handleTabsEdit,
      handleTabsEdit,
      addFenlei,
      ArrowUp,
      Upload,
      toTop,
      scroll,
      upload,
      fileList,
      handleStart,
      changeTab,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  width: 100%;
  min-height: 82vh;
  height: auto;
  background-image: url("https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/%E6%91%84%E5%9B%BE%E7%BD%91_401729159_%E6%B8%90%E5%8F%98%E4%BD%8E%E5%A4%9A%E8%BE%B9%E5%BD%A2%E8%83%8C%E6%99%AF%EF%BC%88%E9%9D%9E%E4%BC%81%E4%B8%9A%E5%95%86%E7%94%A8%EF%BC%89.jpg");
  background-size: cover;
  overflow: hidden;
}
.album-container {
  width: 80%;
  margin-top: 59px;
  margin-left: 10%;
  margin-bottom: 50px;
  height: 500px;
  animation-name: container;
  animation-duration: 2s;
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
.pane-container {
  height: 400px;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
}
.toTop {
  position: fixed;
  bottom: 200px;
  right: 180px;
}
.upload {
  position: fixed;
  bottom: 250px;
  right: 180px;
}
</style>
