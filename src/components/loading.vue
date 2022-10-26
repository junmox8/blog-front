<template>
  <el-skeleton style="width: 100%">
    <template #template>
      <div style="padding: 14px; display: flex; flex-wrap: nowrap">
        <el-skeleton-item variant="image" style="width: 40%; height: 220px" />
        <!-- <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
        > -->
        <div style="width: 55%; margin-left: 3%; overflow: hidden">
          <el-skeleton-item variant="text" style="width: 95%" />
          <el-skeleton-item variant="text" style="width: 95%" />
          <el-skeleton-item variant="text" style="width: 95%" />
          <el-skeleton-item variant="text" style="width: 95%" />
          <el-skeleton-item variant="text" style="width: 95%" />
          <el-skeleton-item
            variant="text"
            style="width: 100%; margin-top: 19%"
          />
        </div>
        <!-- </div> -->
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {};
</script>

<style></style>
