<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-800 text-white overflow-hidden">
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
      
      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="mb-6 animate-fade-in">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">Блог</span>
              </li>
            </ol>
          </nav>
          
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            Блог и полезные статьи
          </h1>
          
          <p class="text-xl text-gray-200 mb-8">
            Актуальная информация о визах, образовании и иммиграции в США
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <!-- Categories and Search -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <!-- Categories -->
          <div class="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2 w-full md:w-auto">
            <button 
              @click="blogStore.setCategory('all')"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                blogStore.selectedCategory === 'all' 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-white text-secondary-700 hover:bg-gray-100 shadow-sm'
              ]"
            >
              Все статьи
            </button>
            <button 
              v-for="category in blogStore.categories" 
              :key="category.id"
              @click="blogStore.setCategory(category.id.toString())"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                blogStore.selectedCategory === category.id.toString() 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-white text-secondary-700 hover:bg-gray-100 shadow-sm'
              ]"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Search -->
          <div class="relative w-full md:w-80">
            <input 
              type="text"
              :value="blogStore.searchQuery"
              @input="blogStore.setSearchQuery($event.target.value)"
              placeholder="Поиск статей..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent shadow-sm"
            />
            <Icon name="ph:magnifying-glass" class="absolute left-4 top-3.5 text-gray-400" size="20" />
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="blogStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="bg-white rounded-xl overflow-hidden shadow-lg">
            <div class="h-48 bg-gray-200 animate-pulse"></div>
            <div class="p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
              <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <!-- Blog Posts Grid -->
        <div v-else-if="blogStore.paginatedPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard 
            v-for="post in blogStore.paginatedPosts"
            :key="post.id"
            :title="post.title"
            :summary="post.summary"
            :imageUrl="getImageUrl(post.image)"
            :date="post.published_at"
            :category="post.category_name"
            :link="`/blog/${post.slug}`"
          />
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <Icon name="ph:article" class="mx-auto text-gray-400 mb-6" size="80" />
          <h3 class="text-2xl font-semibold text-gray-600 mb-3">Статьи не найдены</h3>
          <p class="text-gray-500 mb-6">
            {{ blogStore.searchQuery 
              ? `По запросу "${blogStore.searchQuery}" ничего не найдено`
              : 'В этой категории пока нет статей'
            }}
          </p>
          <button 
            v-if="blogStore.searchQuery || blogStore.selectedCategory !== 'all'"
            @click="blogStore.clearFilters()"
            class="btn btn-primary"
          >
            Сбросить фильтры
          </button>
        </div>
        
        <!-- Pagination -->
        <div v-if="blogStore.totalPages > 1" class="flex justify-center mt-12">
          <div class="flex items-center space-x-2">
            <!-- Previous Button -->
            <button 
              @click="blogStore.setPage(blogStore.currentPage - 1)" 
              :disabled="blogStore.currentPage === 1"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors',
                blogStore.currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
              ]"
            >
              <Icon name="ph:caret-left" size="20" />
            </button>
            
            <!-- Page Numbers -->
            <button 
              v-for="page in visiblePages" 
              :key="page" 
              @click="blogStore.setPage(page)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                blogStore.currentPage === page 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
              ]"
            >
              {{ page }}
            </button>
            
            <!-- Next Button -->
            <button 
              @click="blogStore.setPage(blogStore.currentPage + 1)" 
              :disabled="blogStore.currentPage === blogStore.totalPages"
              :class="[
                'px-3 py-2 rounded-lg font-medium transition-colors',
                blogStore.currentPage === blogStore.totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
              ]"
            >
              <Icon name="ph:caret-right" size="20" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

// Видимые страницы для пагинации (показываем максимум 5 страниц)
const visiblePages = computed(() => {
  const total = blogStore.totalPages
  const current = blogStore.currentPage
  const delta = 2
  
  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)
  
  // Если в начале, показываем больше страниц в конце
  if (current <= delta) {
    end = Math.min(total, 2 * delta + 1)
  }
  
  // Если в конце, показываем больше страниц в начале
  if (current >= total - delta) {
    start = Math.max(1, total - 2 * delta)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Получение URL изображения из Directus
const getImageUrl = (imageId) => {
  const config = useRuntimeConfig()
  return `${config.public.directusUrl}/assets/${imageId}?width=600&height=400&fit=cover&format=webp`
}

// SEO
useHead({
  title: 'Блог | BarristerCorp',
  meta: [
    {
      name: 'description',
      content: 'Актуальные статьи о визах, образовании и иммиграции в США от экспертов BarristerCorp'
    }
  ]
})

// Загружаем данные при монтировании
onMounted(async () => {
  // Загружаем данные через blog store (который теперь использует content store)
  await Promise.all([
    blogStore.fetchCategories(),
    blogStore.fetchPosts() // Без лимита - все посты
  ])
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>