<template>
  <div class="not-found">
    <div class="not-found-content">
      <img src="@/common/assets/images/404.png" />
      <p>抱歉，您访问的页面不存在</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found {
  height: calc(100vh - 72px);
  &-content {
    padding-top: 160px;
    text-align: center;
    img {
      height: 263px;
      width: 399px;
      background-size: cover;
      margin-bottom: 11px;
    }
    p {
      font-size: 16px;
      color: #9d9fa7;
      text-align: center;
    }
  }
}
</style>
