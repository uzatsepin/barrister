<template>
  <div class="w-[1200px] h-[630px] flex relative bg-white overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
    
    <!-- Brand Header -->
    <div class="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 h-3"></div>
    
    <!-- Content Container -->
    <div class="relative z-10 flex-1 flex p-16">
      <!-- Left Side - Content -->
      <div class="flex-1 flex flex-col justify-center pr-12">
        <!-- Category Badge -->
        <div class="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-lg font-semibold mb-6 w-fit">
          {{ category }}
        </div>
        
        <!-- Title -->
        <h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight" style="line-height: 1.1">
          {{ title }}
        </h1>
        
        <!-- Meta Info -->
        <div class="flex items-center space-x-6 text-gray-600 mb-8">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
            <span class="text-lg">{{ date }}</span>
          </div>
          <div class="flex items-center">
            <div class="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
            <span class="text-lg">{{ readingTime }} мин чтения</span>
          </div>
        </div>
        
        <!-- Brand -->
        <div class="flex items-center">
          <div class="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <span class="text-white font-bold text-xl">B</span>
          </div>
          <div>
            <div class="text-xl font-bold text-gray-900">BarristerCorp</div>
            <div class="text-gray-600">Эксперты по иммиграции в США</div>
          </div>
        </div>
      </div>
      
      <!-- Right Side - Image/Visual -->
      <div class="w-96 flex items-center justify-center">
        <div v-if="image" class="relative">
          <img 
            :src="image" 
            :alt="title"
            class="w-80 h-80 object-cover rounded-2xl shadow-2xl"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
        <div v-else class="w-80 h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
          <div class="text-primary-600 text-center">
            <div class="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="text-2xl font-bold">Статья блога</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute bottom-8 right-8 w-32 h-32 border-2 border-primary-200 rounded-full opacity-50"></div>
    <div class="absolute top-24 right-24 w-16 h-16 border-2 border-primary-100 rounded-full opacity-30"></div>
    <div class="absolute bottom-24 right-32 w-8 h-8 bg-primary-100 rounded-full opacity-40"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Блог'
  },
  date: {
    type: String,
    required: true
  },
  readingTime: {
    type: Number,
    default: 5
  },
  image: {
    type: String,
    default: null
  }
})
</script> 