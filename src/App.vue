<template>
  <router-view />
</template>
<script>
import { useRouter } from "vue-router";
export default {
  created() {
    // const router = useRouter();
    // router.push("/login");
  },
};
</script>
<style scoped>
html {
  cursor: pointer;
}

h3 {
  text-align: center;
  user-select: none;
}

.div-box {
  font-size: 40px;
  width: 10px;
  height: 10px;
  position: absolute;
  transition: all;
  transition-duration: 1s;
  text-align: center;
}
</style>
