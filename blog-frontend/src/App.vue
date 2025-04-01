<script setup lang="ts">
// App.vue 不需要特别的逻辑
</script>

<template>
  <el-config-provider>
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </el-config-provider>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
