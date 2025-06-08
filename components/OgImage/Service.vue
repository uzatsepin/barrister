<template>
  <div class="h-[630px] w-[1200px] bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col justify-between text-white p-16 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 border-4 border-white rounded-full transform translate-x-48 -translate-y-48"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 border-4 border-white rounded-full transform -translate-x-40 translate-y-40"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center space-x-4">
          <Icon :name="badge.icon" class="text-4xl text-purple-200" />
          <div class="bg-purple-600 px-4 py-2 rounded-full text-lg font-medium">
            {{ badge.text }}
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-5xl font-bold text-purple-100">${{ price }}</div>
          <div class="text-xl text-purple-300">{{ priceNote }}</div>
        </div>
      </div>

      <h1 class="text-6xl font-bold leading-tight mb-6">
        {{ title }}
      </h1>
      
      <p class="text-2xl text-purple-100 leading-relaxed max-w-4xl mb-8">
        {{ description }}
      </p>

      <!-- Key Features -->
      <div class="flex space-x-8">
        <div 
          v-for="feature in keyFeatures.slice(0, 3)" 
          :key="feature.title"
          class="flex items-center space-x-3"
        >
          <Icon :name="feature.icon" class="text-2xl text-purple-200" />
          <span class="text-lg text-purple-100">{{ feature.title }}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/images/logo-white.png" alt="BarristerCorp" class="h-12 w-auto" />
        <div>
          <div class="text-2xl font-bold">BarristerCorp</div>
          <div class="text-lg text-purple-200">Профессиональные иммиграционные услуги</div>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-xl text-purple-200">barristercorp.com</div>
        <div class="text-lg text-purple-300">Доступные решения для всех</div>
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
  price: {
    type: Number,
    required: true
  },
  priceNote: {
    type: String,
    default: ''
  },
  badge: {
    type: Object,
    default: () => ({
      icon: 'ph:star',
      text: 'Услуга'
    })
  },
  keyFeatures: {
    type: Array,
    default: () => []
  }
});
</script> 