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
        </el-tab-pane>
      </el-tabs>
      <div
        @scroll="scroll"
        class="pane-container"
        ref="contain"
        v-loading="loading"
      >
        <div
          class="img1-container img-cont"
          ref="img1_ref"
          style="width: 25%; display: inline-block"
        >
          <el-card shadow="hover" v-for="(item, index) in img1" :key="index">
            <el-image style="width: 100%" :src="item" />
          </el-card>
        </div>
        <div
          class="img2-container img-cont"
          ref="img2_ref"
          style="width: 25%; display: inline-block"
        >
          <el-card shadow="hover" v-for="(item, index) in img2" :key="index">
            <el-image style="width: 100%" :src="item" />
          </el-card>
        </div>
        <div
          class="img3-container img-cont"
          ref="img3_ref"
          style="width: 25%; display: inline-block"
        >
          <el-card shadow="hover" v-for="(item, index) in img3" :key="index">
            <el-image style="width: 100%" :src="item" />
          </el-card>
        </div>
        <div
          class="img4-container img-cont"
          ref="img4_ref"
          style="width: 25%; display: inline-block"
        >
          <el-card shadow="hover" v-for="(item, index) in img4" :key="index">
            <el-image style="width: 100%" :src="item" />
          </el-card>
        </div>
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
import { reactive, ref, toRefs, nextTick } from "vue";
import { ElMessage } from "element-plus";
export default {
  async created() {
    const result = await getAllImgKinds();
    result.data.data.forEach((item, index) => {
      this.editableTabs.push({
        title: item.name,
        name: index,
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
    const allImgs = ref([]);
    const loading = ref(false);
    const imgs = reactive({
      img1: [],
      img2: [],
      img3: [],
      img4: [],
    });
    const img1_ref = ref(null);
    const img2_ref = ref(null);
    const img3_ref = ref(null);
    const img4_ref = ref(null);
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
    const toTop = () => {
      contain.value.scrollTop = 0;
    };
    const scroll = () => {
      // if (
      //   contain.value.scrollTop + contain.value.clientHeight + 0.4 >=
      //   contain.value.scrollHeight
      // )
      //   alert(1);
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
        if (item.size) fileList.value.splice(index, 1);
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
          nextTick(() => {
            console.log(img1_ref.value.offsetHeight);
          });
        });
        loading.value = false;
      }
      loading.value = false;
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
      ...toRefs(imgs),
      allImgs,
      img1_ref,
      img2_ref,
      img3_ref,
      img4_ref,
      loading,
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
.el-image:hover {
  transition: all;
  transition-duration: 1s;
  transform: scale(1.1);
}
</style>
