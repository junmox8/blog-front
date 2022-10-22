<template>
  <div
    style="
      width: 100%;
      height: 55px;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #edeced;
      line-height: 55px;
      padding-left: 2%;
      color: #595859;
      font-size: 15px;
      display: flex;
      justify-content: flex-start;
      position: relative;
    "
  >
    <div
      style="
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 60%;
      "
    >
      {{ title }}
    </div>
    <div style="position: absolute; right: 5%; font-size: 12px">
      {{ createdAt }}
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["title", "time"],
  created() {
    this.createdAt = dayjs(
      dayjs(this.time.replace(/T/g, " ").replace(/.[\d]{3}Z/, " ")).valueOf() +
        28800000
    ).format("YYYY-MM-DD HH:mm:ss");
  },
  data() {
    return {
      createdAt: "",
    };
  },
};
</script>

<style></style>
