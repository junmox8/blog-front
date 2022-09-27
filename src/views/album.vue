<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加分类"
    width="30%"
    :before-close="handleClose"
  >
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
        v-model="editableTabsValue"
        type="card"
        editable
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
            <div class="pane-container" ref="contain">
              <el-button
                @click="toTop"
                class="toTop"
                type="primary"
                :icon="ArrowUp"
                circle
              />
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ArrowUp } from "@element-plus/icons-vue";
import { ref } from "vue";
export default {
  setup() {
    const editableTabsValue = ref("0");
    const editableTabs = ref([]);
    const dialogVisible = ref(false);
    const input = ref("");
    const contain = ref(null);
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
      editableTabs.value.push({
        title: input.value,
        name: input.value,
      });
      editableTabsValue.value = input.value;
    };
    const toTop = () => {
      contain.value[0].scrollTop = 0;
    };
    return {
      editableTabsValue,
      editableTabs,
      dialogVisible,
      input,
      contain,
      handleTabsEdit,
      handleTabsEdit,
      addFenlei,
      ArrowUp,
      toTop,
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
</style>
