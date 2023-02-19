<template>
  home ---- {{ num }}
  <span class="xx">阿萨斯撒大所多</span>
</template>

<script setup lang="ts">
import { ref } from "vue";
const num = ref<number>(1);
</script>

<style lang="less">
.xx {
  color: @primary-color !important;
  font-size: 20px;
}
</style>
