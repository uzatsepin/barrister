<template>
  <div class="card p-6">
    <div class="mb-4">
      <div class="flex text-accent-500">
        <Icon v-for="i in 5" :key="i" name="ph:star-fill" :class="{ 'text-gray-300': i > rating }" />
      </div>
    </div>
    <p class="text-secondary-700 mb-4 italic">{{ text }}</p>
    <div class="flex items-center">
      <div v-if="avatarUrl" class="h-12 w-12 rounded-full overflow-hidden mr-3">
        <img :src="avatarUrl" alt="аватар" class="h-full w-full object-cover" />
      </div>
      <div v-else class="h-12 w-12 rounded-full overflow-hidden mr-3 bg-primary-100 flex items-center justify-center">
        <span class="text-primary-600 font-bold text-xl">{{ nameInitial }}</span>
      </div>
      <div>
        <div class="font-semibold text-secondary-800">{{ name }}</div>
        <div class="text-sm text-secondary-500">{{ position }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5,
    validator: value => value >= 1 && value <= 5
  },
  avatarUrl: {
    type: String,
    default: ''
  }
});

const nameInitial = computed(() => {
  return props.name.charAt(0).toUpperCase();
});
</script>