<template>
  <section
    class="relative bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-800 text-white overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-secondary-700/90 to-secondary-900/90 z-10"></div>
    </div>
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-700/90 z-10"
      ></div>
      <NuxtImg
        ref="parallaxBg"
        src="/images/blog-bg.webp"
        alt="США"
        format="webp"
        class="w-full h-full object-cover scale-110 transform motion-safe:animate-subtle-zoom"
      />
    </div>
    
    <div class="container-custom relative z-20 py-20 md:py-28">
      <div class="max-w-5xl mx-auto text-center">
        <!-- Breadcrumbs -->
        <nav class="mb-8">
          <ol class="flex items-center justify-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                Главная
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
              <NuxtLink :to="`/${sectionData?.slug}`" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                {{ sectionData?.title || 'Секция' }}
              </NuxtLink>
            </li>
            <li class="flex items-center">
              <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
              <span class="text-white font-medium">{{ categoryData?.title || 'Категория' }}</span>
            </li>
          </ol>
        </nav>

        <!-- Category Content -->
        <div v-if="categoryData">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {{ categoryData.title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            {{ categoryDescription }}
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div class="text-3xl font-bold mb-1">{{ categoryPages.length }}</div>
              <div class="text-sm text-gray-200">{{ pageWordForm }}</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div class="text-3xl font-bold mb-1">{{ sectionData?.title || 'Раздел' }}</div>
              <div class="text-sm text-gray-200">Основной раздел</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div class="text-3xl font-bold mb-1">15+</div>
              <div class="text-sm text-gray-200">Лет опыта</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div class="text-3xl font-bold mb-1">5000+</div>
              <div class="text-sm text-gray-200">Успешных дел</div>
            </div>
          </div>

          <!-- Quick CTA -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 class="text-xl font-semibold mb-3">Нужна персональная консультация?</h3>
            <p class="text-gray-200 text-sm mb-4">Обсудите ваши планы с экспертом BarristerCorp</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                @click="$emit('openContact')"
                class="bg-white text-secondary-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Icon name="ph:calendar-check" class="mr-2" size="20" />
                Записаться на консультацию
              </button>
              <a
                href="tel:+19362896191"
                class="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-secondary-800 transition-colors flex items-center justify-center"
              >
                <Icon name="ph:phone" class="mr-2" size="20" />
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sectionData: {
    type: Object,
    required: true
  },
  categoryData: {
    type: Object,
    required: true
  },
  categoryPages: {
    type: Array,
    default: () => []
  },
  categoryDescription: {
    type: String,
    required: true
  },
  pageWordForm: {
    type: String,
    required: true
  }
});

defineEmits(['openContact']);
</script> 