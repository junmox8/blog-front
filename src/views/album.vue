<template>
  <el-dialog v-model="dialogVisible2" title="添加图片">
    <el-upload
      v-model:file-list="fileList"
      multiple
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
  <div
    class="container"
    ref="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
    <el-card class="album-container" v-loading="loading">
      <el-tabs
        @tab-change="changeTab"
        v-model="editableTabsValue"
        type="card"
        addable
        stretch
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <div
        :class="[
          editableTabs.length == 0
            ? 'pane-container2'
            : img1.length == 0
            ? 'pane-container2'
            : 'pane-container',
        ]"
        ref="contain"
      >
        <div
          :style="{
            display: editableTabs.length == 0 ? 'block' : 'none',
            position: 'absolute',
            top: '0px',
            width: '100%',
            height: '100%',
          }"
        >
          <el-empty style="margin: 0 auto" description="暂无图片分类" />
        </div>
        <div
          :style="{
            display:
              editableTabs.length != 0 && img1.length == 0 ? 'block' : 'none',
            position: 'absolute',
            top: '0px',
            width: '100%',
            height: '100%',
          }"
        >
          <el-empty style="margin: 0 auto" description="暂无图片" />
        </div>
        <el-card shadow="hover" v-for="(item, index) in img1" :key="index">
          <img
            class="el-image"
            style="width: 100%"
            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleContent/t018609111cb4a43413.jpg"
            :dataUrl="item"
            ref="imgsRef"
          />
        </el-card>
        <el-button
          v-if="editableTabs.length > 0"
          @click="() => (dialogVisible2 = true)"
          class="upload"
          type="primary"
          :icon="Upload"
          circle
        />
      </div>
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
import { useStore } from "vuex";
import { ArrowUp, Upload } from "@element-plus/icons-vue";
import { reactive, ref, toRefs, nextTick, onMounted } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "album",
  async created() {
    const result = await getAllImgKinds();
    result.data.data.forEach((item, index) => {
      this.editableTabs.push({
        title: item.name,
        name: index,
      });
    });
    if (this.editableTabs.length != 0) {
      this.loading = true;
      this.editableTabsValue = this.editableTabs[0].name;
      const {
        data: { data: data2 },
      } = await getImgs(this.editableTabs[0].title);
      if (data2[0] && data2[0].url) {
        this.allImgs = data2[0].url.split(",");
        this.allImgs.forEach((item, index) => {
          this.fileList.push({
            name: index,
            url: item,
          });
          this.img1.push(item);
        });
        this.loading = false;
      }
      this.loading = false;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll, true);
    this.$nextTick(() => {
      setTimeout(() => {
        console.log(this.imgsRef);
      }, 10);
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scroll, true);
  },
  setup() {
    const editableTabsValue = ref("0");
    const editableTabs = ref([]);
    const dialogVisible = ref(false);
    const dialogVisible2 = ref(false);
    const input = ref("");
    const contain = ref(null);
    const container = ref(null);
    const fileList = ref([]);
    const allImgs = ref([]);
    const loading = ref(false);
    const imgsRef = ref([]);
    const store = useStore();
    const imgs = reactive({
      img1: [],
    });
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          console.log(imgsRef.value);
        }, 0);
      });
    });
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
        result2.data.data.forEach((item, index) => {
          editableTabs.value.push({
            title: item.name,
            name: index,
          });
        });
        editableTabsValue.value = editableTabs.value.length - 1;
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
    const upload = async () => {
      let urls = "";
      fileList.value.forEach((item, index) => {
        if (index != fileList.value.length - 1) urls += item.url + ",";
        else urls += item.url;
      });
      const result = await handUpImg(
        urls,
        editableTabs.value[editableTabsValue.value].title
      );
      if (result.data.success == true) {
        ElMessage({
          type: "success",
          message: "该分类更新图片成功",
        });
        fileList.value = [];
        imgs.img1 = [];
        const {
          data: { data: data2 },
        } = await getImgs(editableTabs.value[editableTabsValue.value].title);
        if (data2[0] && data2[0].url) {
          allImgs.value = data2[0].url.split(",");
          allImgs.value.forEach((item, index) => {
            fileList.value.push({
              name: index,
              url: item,
            });
            imgs.img1.push(item);
          });
        } else allImgs.value = [];
      } else
        ElMessage({
          type: "error",
          message: result.data.errorMsg,
        });
      dialogVisible2.value = false;
    };
    const handleStart = async (file) => {
      const result = await uploadFile(file.file, file.file.uid);
      fileList.value.push({
        name: file.file.uid,
        url: result,
      });
      fileList.value.forEach((item, index) => {
        if (item.url.includes("blob")) fileList.value.splice(index, 1);
      });
    };
    const changeTab = async (name) => {
      fileList.value = [];
      allImgs.value = [];
      for (let i in imgs) {
        imgs[i] = [];
      }
      loading.value = true;
      const {
        data: { data: data2 },
      } = await getImgs(editableTabs.value[name].title);
      if (data2[0] && data2[0].url) {
        allImgs.value = data2[0].url.split(",");
        allImgs.value.forEach((item, index) => {
          fileList.value.push({
            name: index,
            url: item,
          });
          imgs.img1.push(item);
        });
        loading.value = false;
      }
      loading.value = false;
    };
    const scroll = () => {
      imgsRef.value.forEach((item, index) => {
        if (
          item.getBoundingClientRect().top > 0 &&
          item.getBoundingClientRect().top < 0.653 * window.screen.height
        )
          item.src = item.getAttribute("dataUrl");
      });
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
      upload,
      fileList,
      handleStart,
      changeTab,
      ...toRefs(imgs),
      allImgs,
      loading,
      container,
      imgsRef,
      store,
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
  min-height: 82vh;
  height: auto;
  background-size: cover;
  overflow: hidden;
  transition: all;
  transition-duration: 2s;
}
.album-container {
  width: 80%;
  margin-top: 59px;
  margin-left: 10%;
  margin-bottom: 50px;
  height: auto;
  min-height: 100vh;
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
  height: auto;
  width: 100%;
  overflow: scroll !important;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  column-count: 4;
  column-gap: 10px;
  column-fill: auto;
}
.pane-container2 {
  height: 100vh;
  width: 100%;
  position: relative;
}
.pane-container::after {
  clear: both;
}

.upload {
  position: fixed;
  bottom: 250px;
  right: 180px;
}
.el-image:hover {
  transition: all;
  transition-duration: 1s;
  transform: scale(1.1);
}
.el-card {
  break-inside: avoid;
}
</style>
