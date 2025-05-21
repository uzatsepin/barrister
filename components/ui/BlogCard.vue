<template>
  <div class="card overflow-hidden h-full flex flex-col">
    <div class="relative h-48">
      <img :src="imageUrl" :alt="title" class="w-full h-full object-cover" />
      <div class="absolute top-0 left-0 bg-primary-600 text-white px-3 py-1 text-sm font-medium">
        {{ category }}
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center text-secondary-500 text-sm mb-2">
        <Icon name="ph:calendar" class="mr-1" />
        <span>{{ formattedDate }}</span>
        <span class="mx-2">•</span>
        <Icon name="ph:clock" class="mr-1" />
        <span>{{ readTime }} {{ $t('blog.readTime') }}</span>
      </div>
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-secondary-600 mb-4 flex-grow">{{ summary }}</p>
      <NuxtLink :to="link" class="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center mt-auto">
        {{ $t('common.readMore') }}
        <Icon name="ph:arrow-right" class="ml-1" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    default: 5
  },
  link: {
    type: String,
    required: true
  }
});

const formattedDate = computed(() => {
  const date = new Date(props.date);
  return new Intl.DateTimeFormat('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
});
</script>