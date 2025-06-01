<template>
  <NuxtLink 
    :to="link" 
    class="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="imageUrl" 
        :alt="title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="absolute bottom-4 left-4 flex items-center space-x-2">
        <span class="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">{{ category }}</span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-secondary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ title }}
      </h3>
      <p class="text-secondary-600 mb-4 line-clamp-3">{{ summary }}</p>
      
      <!-- Footer -->
      <div class="flex items-center justify-between text-sm">
        <div class="text-secondary-500 flex items-center">
          <Icon name="ph:calendar" class="mr-1" size="14" />
          {{ formatDate(date) }}
        </div>
        <div class="text-primary-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
          Читать далее
          <Icon name="ph:arrow-right" class="ml-1" size="16" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
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
  link: {
    type: String,
    required: true
  }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script> 