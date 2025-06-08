<template>
  <div class="w-[1200px] h-[630px] flex flex-col relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 opacity-20"
      :style="{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    ></div>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/60"></div>
    
    <!-- Content Container -->
    <div class="relative z-10 flex-1 flex flex-col justify-center px-16 py-12">
      <!-- Logo -->
      <div class="mb-8">
        <img 
          :src="logo" 
          alt="BarristerCorp Logo" 
          class="h-16 w-auto"
        />
      </div>
      
      <!-- Main Title -->
      <h1 class="text-6xl font-bold mb-6 leading-tight">
        {{ title }}
      </h1>
      
      <!-- Description -->
      <p class="text-2xl text-primary-100 mb-8 font-medium">
        {{ description }}
      </p>
      
      <!-- Services Grid -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="flex items-center text-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
          Образование в США
        </div>
        <div class="flex items-center text-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
          Трудоустройство
        </div>
        <div class="flex items-center text-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
          Бизнес-иммиграция
        </div>
        <div class="flex items-center text-lg">
          <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
          Недвижимость
        </div>
      </div>
      
      <!-- CTA -->
      <div class="text-xl text-primary-100 font-semibold">
        Профессиональная помощь в иммиграции
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
    default: 'BarristerCorp - Иммиграция в США'
  },
  description: {
    type: String,
    default: '15+ лет опыта • 5000+ успешных дел'
  },
  background: {
    type: String,
    default: '/images/usa-flag-bg.jpg'
  },
  logo: {
    type: String,
    default: '/images/logo-white.png'
  }
})
</script> 