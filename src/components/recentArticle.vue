<template>
  <div
    style="
      width: 100%;
      height: 55px;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #edeced;
      line-height: 55px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 2%;
      color: #595859;
      font-size: 15px;
    "
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style></style>
