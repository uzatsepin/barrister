<template>
  <NuxtLayout>
    <NuxtPage :transition="{ 
      name: 'page',
      mode: 'out-in'
    }" />
    
    <!-- Global Contact Modal -->
    <ContactModal />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup>
// Main app component
</script>