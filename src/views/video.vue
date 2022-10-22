<template>
  <div
    class="container"
    :style="{
      backgroundImage: 'url(' + store.state.Background.cover + ')',
    }"
  ></div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style scoped>
.container {
  min-width: 1388px;
  margin-top: 59px;
  width: 100%;
  min-height: 90vh;
  height: auto;
  background-size: cover;
  transition: all;
  transition-duration: 2s;
}
</style>
