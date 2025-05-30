<template>
  <nav class="space-y-2">
    <!-- Loading state -->
    <div v-if="loading" class="space-y-2">
      <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
    </div>
    
    <!-- Simple navigation list -->
    <div v-else-if="studyPages.length > 0" class="space-y-1">
      <div v-for="page in studyPages" :key="page.id">
        <NuxtLink 
          :to="`/study/${page.slug}`" 
          class="block px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-primary-50"
          :class="{
            'bg-primary-100 text-primary-700 font-semibold border-l-4 border-primary-600': isCurrentPath(`/study/${page.slug}`),
            'text-secondary-700 hover:text-primary-600': !isCurrentPath(`/study/${page.slug}`)
          }"
        >
          <div class="flex items-center">
            <Icon name="ph:circle" class="mr-2 flex-shrink-0" size="16" />
            <span>{{ page.name || page.title }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Fallback if no data -->
    <div v-else class="space-y-2">
      <div class="text-secondary-600 text-sm">
        Загрузка навигации...
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { DirectusPage } from '~/composables/useDirectus'

const props = defineProps<{
  currentPath: string
}>()

const { fetchAllStudyPages } = useDirectus()

const studyPages = ref<DirectusPage[]>([])
const loading = ref(true)

const isCurrentPath = (path: string): boolean => {
  return props.currentPath === path
}

const loadStudyPages = async () => {
  try {
    loading.value = true
    const pages = await fetchAllStudyPages()
    studyPages.value = pages
  } catch (error) {
    console.error('Error loading study pages:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStudyPages()
})
</script>

<style scoped>
/* Additional hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
</style> 