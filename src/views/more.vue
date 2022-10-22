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
            v-for="item in item.children"
            :key="item.value"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { data } from "../json/selectData";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  created() {
    console.log(data);
    this.selects = data;
  },
  setup() {
    const store = useStore();
    const input = ref("");
    const selects = ref([]);
    const search = (e) => {
      if (e.key === "Enter") alert("1");
    };
    return {
      store,
      input,
      selects,
      search,
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
}
.label-tag:hover {
  color: #16a0fb;
  cursor: pointer;
  border-radius: 12px;
  background-color: #e1ecf9;
}
</style>
