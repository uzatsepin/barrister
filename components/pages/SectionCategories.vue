<template>
  <section class="section bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Доступные категории</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Выберите подходящую категорию для получения подробной информации
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="category in sectionCategories"
          :key="category.id"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
        >
          <div class="p-8">
            <div class="flex items-center mb-4">
              <div class="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Icon :name="getCategoryIcon(category.slug)" class="text-primary-600" size="24" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {{ category.title }}
              </h3>
            </div>
            
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ getCategoryDescription(category.slug) }}
            </p>

            <!-- Pages in Category -->
            <div class="space-y-2 mb-6">
              <div class="text-sm font-semibold text-gray-500 mb-3">
                {{ getCategoryPages(category.id).length }} {{ getPageWordForm(getCategoryPages(category.id).length) }}:
              </div>
              <div class="space-y-1">
                <NuxtLink
                  v-for="page in getCategoryPages(category.id).slice(0, 3)"
                  :key="page.id"
                  :to="`/${sectionData.slug}/${category.slug}/${page.slug}`"
                  class="block text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {{ page.title }}
                </NuxtLink>
                <div v-if="getCategoryPages(category.id).length > 3" class="text-sm text-gray-500 px-3 py-1">
                  +{{ getCategoryPages(category.id).length - 3 }} еще...
                </div>
              </div>
            </div>

            <NuxtLink
              :to="`/${sectionData.slug}/${category.slug}`"
              class="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center group"
            >
              Подробнее
              <Icon name="ph:arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" size="20" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- All Pages Quick Access -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-3">Все страницы раздела</h3>
          <p class="text-gray-600">Быстрый доступ ко всем материалам</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <NuxtLink
            v-for="page in sectionPages"
            :key="page.id"
            :to="`/${sectionData.slug}/${page.category_slug}/${page.slug}`"
            class="group flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <div class="bg-gray-100 group-hover:bg-primary-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors">
              <Icon name="ph:file-text" class="text-gray-600 group-hover:text-primary-600" size="18" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-gray-800 group-hover:text-primary-600 transition-colors truncate">
                {{ page.title }}
              </div>
              <div class="text-sm text-gray-500 truncate">
                {{ getCategoryByPageId(page.category)?.title }}
              </div>
            </div>
            <Icon name="ph:arrow-right" class="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" size="16" />
          </NuxtLink>
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
  sectionCategories: {
    type: Array,
    default: () => []
  },
  sectionPages: {
    type: Array,
    default: () => []
  },
  getCategoryIcon: {
    type: Function,
    required: true
  },
  getCategoryDescription: {
    type: Function,
    required: true
  },
  getCategoryPages: {
    type: Function,
    required: true
  },
  getPageWordForm: {
    type: Function,
    required: true
  },
  getCategoryByPageId: {
    type: Function,
    required: true
  }
});
</script> 