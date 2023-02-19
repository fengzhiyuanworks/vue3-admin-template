<script setup lang="ts">
// import { useUserStore } from "@common/store/modules/user";
// const userStore = useUserStore();
</script>

<template>
  <!-- {{ userStore.name }} -->
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
