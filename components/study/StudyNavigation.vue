<template>
  <nav class="space-y-1">
    <!-- Loading state -->
    <div v-if="isContentLoading" class="space-y-2">
      <div v-for="i in 5" :key="i" class="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
    
    <!-- Navigation items -->
    <div v-else-if="studyMenuItems.length > 0">
      <NavigationItem 
        v-for="item in studyMenuItems" 
        :key="item.id"
        :item="item"
        :current-path="currentPath"
      />
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
  }
})

// Используем новый composable для работы с контентом
const { menuStructure, isContentLoading, loadContent, getMenuBySection } = useContent()

// Получаем только пункты меню раздела "study"
const studyMenuItems = computed(() => {
  return getMenuBySection('study')
})

onMounted(async () => {
  // Загружаем контент если еще не загружен
  if (menuStructure.value.length === 0) {
    await loadContent()
  }
})
</script> 