<template>
  <div class="text-center max-w-3xl mx-auto mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">{{ title }}</h2>
    <p v-if="subtitle" class="text-lg text-secondary-600">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>