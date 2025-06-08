<template>
  <div class="h-[630px] w-[1200px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex flex-col justify-between text-white p-16 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 right-20 w-64 h-2 bg-white rounded-full rotate-45"></div>
      <div class="absolute top-32 right-32 w-48 h-2 bg-white rounded-full rotate-45"></div>
      <div class="absolute bottom-20 left-20 w-80 h-2 bg-white rounded-full -rotate-45"></div>
      <div class="absolute bottom-32 left-32 w-64 h-2 bg-white rounded-full -rotate-45"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10">
      <div class="flex items-center space-x-4 mb-6">
        <div class="bg-emerald-600 px-4 py-2 rounded-full text-sm font-medium">{{ type }}</div>
        <div class="text-emerald-200">{{ section }}</div>
        <div v-if="category" class="text-emerald-300">• {{ category }}</div>
      </div>

      <h1 class="text-6xl font-bold leading-tight mb-6">
        {{ title }}
      </h1>
      
      <p class="text-2xl text-emerald-100 leading-relaxed max-w-4xl">
        {{ description }}
      </p>
    </div>

    <!-- Optional Image -->
    <div v-if="image" class="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-20">
      <img :src="image" :alt="title" class="w-64 h-64 object-cover rounded-lg" />
    </div>

    <!-- Footer -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/images/logo-white.png" alt="BarristerCorp" class="h-12 w-auto" />
        <div>
          <div class="text-2xl font-bold">BarristerCorp</div>
          <div class="text-lg text-emerald-200">Профессиональная иммиграционная помощь</div>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-xl text-emerald-200">barristercorp.com</div>
        <div class="text-lg text-emerald-300">Ваш надежный партнер</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  section: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'Информация'
  },
  image: {
    type: String,
    default: ''
  }
});
</script> 