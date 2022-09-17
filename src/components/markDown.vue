<template>
  <div>
    <v-md-editor
      :disabled-menus="[]"
      v-model="text"
      height="400px"
      @upload-image="handleUploadImage"
      @save="save"
    ></v-md-editor>
  </div>
</template>

<script>
import { uploadFile } from "../utils/cos";
import { ElMessage } from "element-plus";
import pubsub from "pubsub-js";
import { ref } from "vue";
export default {
  name: "MarkDown",
  emits: ["getData"],
  created() {
    pubsub.subscribe("getData", (_, data) => {
      this.$emit("getData", this.text);
    });
  },
  setup(props, context) {
    const text = ref("");
    const handleUploadImage = async (event, insertImage, files) => {
      const result = await uploadFile(files[0], files[0].lastModified);
      insertImage({
        url: result,
        desc: files[0].lastModified,
      });
    };
    const save = (te, html) => {
      text.value = html;
      ElMessage({
        type: "success",
        message: "保存成功",
      });
    };
    return {
      text,
      handleUploadImage,
      save,
    };
  },
};
</script>
