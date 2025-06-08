<template>
  <section class="section bg-gray-50">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Доступные материалы</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Подробная информация по каждому аспекту категории "{{ categoryData.title }}"
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="page in categoryPages"
          :key="page.id"
          :to="`/${sectionData.slug}/${categoryData.slug}/${page.slug}`"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
        >
          <div class="p-8">
            <div class="flex items-center mb-4">
              <div class="bg-secondary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Icon :name="getPageIcon(page.type)" class="text-secondary-600" size="24" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 group-hover:text-secondary-600 transition-colors leading-tight">
                  {{ page.title }}
                </h3>
                <div class="text-sm text-gray-500 mt-1">
                  {{ getPageTypeName(page.type) }}
                </div>
              </div>
            </div>
            
            <p v-if="page.seo?.meta_description" class="text-gray-600 mb-6 leading-relaxed">
              {{ page.seo.meta_description }}
            </p>
            <p v-else class="text-gray-600 mb-6 leading-relaxed">
              Подробная информация по теме "{{ page.title }}"
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>Подробнее</span>
              <Icon name="ph:arrow-right" class="group-hover:translate-x-1 transition-transform" size="16" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Back to Section -->
      <div class="text-center mt-16">
        <NuxtLink
          :to="`/${sectionData?.slug}`"
          class="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium text-lg"
        >
          <Icon name="ph:arrow-left" class="mr-2" size="20" />
          Вернуться к разделу "{{ sectionData?.title }}"
        </NuxtLink>
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
  getPageIcon: {
    type: Function,
    required: true
  },
  getPageTypeName: {
    type: Function,
    required: true
  }
});
</script> 