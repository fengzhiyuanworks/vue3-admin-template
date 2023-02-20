<template>
  <div class="forbidden">
    <div class="forbidden-content">
      <img src="@/common/assets/images/403.png" />
      <p>抱歉，您没有访问该页面的权限</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.forbidden {
  height: calc(100vh - 72px);
  &-content {
    padding-top: 179px;
    text-align: center;
    img {
      height: 225px;
      object-fit: cover;
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
