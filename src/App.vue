<template>
  <router-view />
</template>
<script>
import { useRouter } from "vue-router";
export default {
  created() {
    window.onclick = () => {
      alert("1");
    };
    const router = useRouter();
    router.push("/login");
  },
};
</script>
<style></style>
