<template>
  <div>
    <v-md-editor
      :disabled-menus="[]"
      v-model="text"
      left-toolbar="undo redo clear | h bold italic strikethrough quote tip| ul ol table hr | link image code emoji todo-list| save "
      height="400px"
      @upload-image="handleUploadImage"
      @save="save"
    ></v-md-editor>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { useStore } from "vuex";
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
    this.text = this.store.state.Artist.text;
  },
  setup(props, context) {
    const store = useStore();
    const text = ref("");
    const saveText = ref("");
    const handleUploadImage = async (event, insertImage, files) => {
      const result = await uploadFile(files[0], files[0].lastModified);
      insertImage({
        url: result,
        desc: files[0].lastModified,
      });
    };
    const save = (te, html) => {
      store.dispatch("Artist/setText", te);
      ElMessage({
        type: "success",
        message: "保存成功",
      });
    };
    return {
      text,
      saveText,
      store,
      handleUploadImage,
      save,
    };
  },
};
</script>
