<template>
  <div class="h-[630px] w-[1200px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col justify-between text-white p-16 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-white transform -translate-x-48 -translate-y-48"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white transform translate-x-40 translate-y-40"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10">
      <div class="flex items-center space-x-6 mb-8">
        <Icon :name="icon" class="text-6xl text-blue-200" />
        <div>
          <div class="text-2xl text-blue-200 uppercase tracking-wider font-medium">{{ type }}</div>
          <div class="text-xl text-blue-300">{{ pagesCount }} {{ getPageWordForm(pagesCount) }}</div>
        </div>
      </div>

      <h1 class="text-6xl font-bold leading-tight mb-6">
        {{ title }}
      </h1>
      
      <p class="text-2xl text-blue-100 leading-relaxed max-w-4xl">
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/images/logo-white.png" alt="BarristerCorp" class="h-12 w-auto" />
        <div>
          <div class="text-2xl font-bold">BarristerCorp</div>
          <div class="text-lg text-blue-200">Ваш путь к американской мечте</div>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-xl text-blue-200">barristercorp.com</div>
        <div class="text-lg text-blue-300">Иммиграция в США</div>
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
  type: {
    type: String,
    default: 'Раздел'
  },
  icon: {
    type: String,
    default: 'ph:folder'
  },
  pagesCount: {
    type: Number,
    default: 0
  }
});

// Склонение слова "страница"
const getPageWordForm = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'страница';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'страницы';
  } else {
    return 'страниц';
  }
};
</script> 