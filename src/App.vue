<template>
  <div id="app">
    <!-- Apply transition to all pages -->
    <Transition name="slide-scale" mode="out-in">
      <RouterView />
    </Transition>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
/* Slide-and-scale transition for page navigation */
.slide-scale-enter-active,
.slide-scale-leave-active {
  transition: all 0.4s ease;
}

.slide-scale-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}

.slide-scale-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.slide-scale-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.slide-scale-leave-to {
  opacity: 0;
  transform: translateX(-50px) scale(0.95);
}
</style>