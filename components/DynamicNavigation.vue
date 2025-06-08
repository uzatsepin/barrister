<template>
  <nav class="space-y-1">
    <!-- Loading state -->
    <div v-if="isContentLoading" class="space-y-2">
      <div v-for="i in 5" :key="i" class="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
    
    <!-- Navigation items -->
    <div v-else-if="filteredCategories.length > 0">
      <div v-for="category in filteredCategories" :key="category.id" class="mb-4">
        <!-- Category header -->
        <div class="px-3 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
          {{ category.title }}
        </div>
        
        <!-- Category pages -->
        <div class="mt-2 space-y-1">
          <NuxtLink
            v-for="page in category.pages"
            :key="page.id"
            :to="page.full_path"
            class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            :class="[
              isActive(page.full_path) 
                ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            ]"
          >
            <span>{{ page.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="text-gray-500 text-sm text-center py-4">
      Навигация не настроена
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  currentPath: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  }
})

// Используем новый content composable
const { isContentLoading, loadContent, getMenuBySection, isAllContentLoaded } = useContent()

// Получаем категории для конкретного раздела
const sectionCategories = computed(() => {
  if (!isAllContentLoaded.value) return []
  return getMenuBySection(props.section)
})

// Фильтруем категории только с pages
const filteredCategories = computed(() => {
  return sectionCategories.value.filter(category => 
    category.pages && category.pages.length > 0
  )
})

// Проверяем активность пункта меню
const isActive = (pagePath) => {
  return props.currentPath === pagePath
}

onMounted(async () => {
  // Загружаем контент если еще не загружен
  if (!isAllContentLoaded.value) {
    await loadContent()
  }
})
</script> 