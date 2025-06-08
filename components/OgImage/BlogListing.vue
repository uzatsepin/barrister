<template>
  <div class="w-[1200px] h-[630px] flex flex-col relative bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-800 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 2px, transparent 2px); background-size: 100px 100px;"></div>
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10 flex-1 flex flex-col justify-center px-16 py-12">
      <!-- Header -->
      <div class="flex items-center mb-8">
        <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mr-6">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
          </svg>
        </div>
        <div>
          <div class="text-2xl font-bold text-secondary-100">BarristerCorp</div>
          <div class="text-lg text-secondary-200">Блог</div>
        </div>
      </div>
      
      <!-- Main Title -->
      <h1 class="text-6xl font-bold mb-6 leading-tight">
        {{ title }}
      </h1>
      
      <!-- Description -->
      <p class="text-2xl text-secondary-100 mb-8 font-medium">
        {{ description }}
      </p>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div class="text-4xl font-bold mb-2">{{ postsCount }}+</div>
          <div class="text-secondary-200">Статей</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div class="text-4xl font-bold mb-2">15+</div>
          <div class="text-secondary-200">Лет опыта</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div class="text-4xl font-bold mb-2">5000+</div>
          <div class="text-secondary-200">Успешных дел</div>
        </div>
      </div>
      
      <!-- Topics -->
      <div class="flex flex-wrap gap-3">
        <div class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">📚 Образование</div>
        <div class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">💼 Рабочие визы</div>
        <div class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">🏢 Бизнес</div>
        <div class="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">🤝 Гуманитарные программы</div>
      </div>
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute top-16 right-16 w-32 h-32 border-2 border-white/20 rounded-full"></div>
    <div class="absolute bottom-16 right-32 w-16 h-16 border-2 border-white/10 rounded-full"></div>
    <div class="absolute top-32 right-64 w-8 h-8 bg-white/10 rounded-full"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Блог о визах и иммиграции в США'
  },
  description: {
    type: String,
    default: 'Экспертные статьи от BarristerCorp'
  },
  postsCount: {
    type: Number,
    default: 50
  }
})
</script> 