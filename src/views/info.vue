<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  >
    <!-- 骨架屏 -->
    <el-skeleton
      :style="{ display: loading == true ? 'block' : 'none' }"
      style="width: 50%; margin-left: 15%; height: 480px; margin-top: 50px"
    >
      <template #template>
        <div style="display: flex; flex-direction: column">
          <el-skeleton-item variant="text" style="width: 30%" />
          <el-skeleton-item
            variant="circle"
            style="width: 300px; height: 300px"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
    <div
      class="info-container"
      :style="{ display: loading == true ? 'none' : 'block' }"
    >
      <div class="animate1" style="color: #fcac2b; font-weight: 600">
        下面这些就是你的个人信息~
      </div>
      <div style="display: flex; flex-wrap: nowrap; margin-top: 20px">
        <el-upload
          class="avatar-uploader animate2"
          :show-file-list="false"
          :http-request="handleStart"
          :disabled="isEdit == false"
        >
          <img
            v-if="avatar"
            style="width: 200px; height: 200px; border-radius: 50%"
            :src="avatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-button
          type="primary"
          style="align-self: flex-end; margin-left: 20px"
          @click="exit"
          >退出登录</el-button
        >
      </div>
      <div
        style="
          display: flex;
          flex-wrap: nowrap;
          margin-top: 50px;
          align-items: center;
        "
      >
        <div
          class="animate1"
          style="font-size: 16px; color: rgb(129, 138, 212); font-weight: 600"
        >
          昵称
        </div>
        <el-input
          v-if="isEdit == true"
          v-model="name2"
          placeholder="请输入"
          clearable
          style="margin-left: 20px; max-width: 40%"
        />
        <div
          class="animate2"
          v-if="isEdit == false"
          style="font-size: 16px; font-weight: 600; margin-left: 20px"
        >
          {{ name }}
        </div>
      </div>
      <div
        style="
          display: flex;
          flex-wrap: nowrap;
          margin-top: 30px;
          align-items: center;
        "
      >
        <div
          class="animate1"
          style="font-size: 16px; color: rgb(129, 138, 212); font-weight: 600"
        >
          介绍
        </div>
        <el-input
          v-if="isEdit == true"
          v-model="introduction2"
          placeholder="请输入"
          clearable
          style="margin-left: 20px; max-width: 40%"
        />
        <div
          class="animate2"
          v-if="isEdit == false"
          style="font-size: 16px; font-weight: 600; margin-left: 20px"
        >
          {{ introduction }}
        </div>
      </div>
      <el-button
        v-if="isEdit == false"
        @click="isEdit = true"
        style="margin-left: 5%; margin-top: 50px"
        >编辑信息</el-button
      >
      <div
        v-if="isEdit == true"
        style="
          margin-left: 5%;
          margin-top: 50px;
          display: flex;
          flex-wrap: nowrap;
        "
      >
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancelEdit" style="margin-left: 5%"
          >取消编辑</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { uploadFile } from "../utils/cos";
import { useRouter } from "vue-router";
import { getMyUserInfo, updateUserInfo } from "../axios/service";
import { reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
export default {
  async created() {
    this.loading = true;
    const {
      data: {
        data: { name, avatar, introduction },
      },
    } = await getMyUserInfo();
    this.name = name;
    this.avatar = avatar;
    this.name2 = name;
    this.introduction2 = introduction;
    this.introduction = introduction;
    this.loading = false;
  },
  setup() {
    const userInfo = reactive({
      name: "",
      avatar: "",
      introduction: "",
    });
    const edit = reactive({
      name2: "",
      introduction2: "",
    });
    const isEdit = ref(false);
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const exit = async () => {
      localStorage.removeItem("token");
      router.replace("/login");
    };
    const save = async () => {
      const { name, avatar, introduction } = userInfo;
      const { name2, introduction2 } = edit;
      const result = await updateUserInfo(name2, avatar, introduction2);
      if (result) {
        ElMessage({ type: "success", message: "更改信息成功" });
        const {
          data: {
            data: { name, avatar, introduction },
          },
        } = await getMyUserInfo();
        userInfo.name = name;
        userInfo.introduction = introduction;
      } else ElMessage({ type: "error", message: "更改信息失败" });
      isEdit.value = false;
    };
    const handleStart = async (file) => {
      const result = await uploadFile(file.file, file.file.uid);
      userInfo.avatar = result;
    };
    const cancelEdit = () => {
      isEdit.value = false;
      edit.name2 = userInfo.name;
      edit.introduction2 = userInfo.introduction;
    };
    return {
      ...toRefs(userInfo),
      ...toRefs(edit),
      exit,
      save,
      isEdit,
      store,
      loading,
      handleStart,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1388px;
  margin-top: 59px;
  width: 100%;
  min-height: 91.6vh;
  height: auto;
  background-size: cover;
  transition: all;
  transition-duration: 2s;
}
.info-container {
  width: 50%;
  margin-left: 15%;
  height: 480px;
  margin-top: 50px;
  position: relative;
  overflow: hidden;
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
@keyframes container2 {
  from {
    opacity: 0;
    transform: translateY(-150px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
.animate1 {
  animation-name: container;
  animation-duration: 2s;
}
.animate2 {
  animation-name: container2;
  animation-duration: 3s;
}
</style>
