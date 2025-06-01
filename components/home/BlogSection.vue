<template>
  <section class="section bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div
        class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="container-custom relative">
      <UiSectionHeading
        title="Блог и полезные статьи"
        subtitle="Актуальная информация о визах, образовании и иммиграции в США"
        data-aos="fade-up"
      />

      <!-- Loading State -->
      <div v-if="blogStore.loading" class="space-y-8">
        <!-- Featured Post Skeleton -->
        <div class="mb-12 max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="h-[300px] md:h-[400px] bg-gray-200 animate-pulse"></div>
              <div class="p-6 md:p-8 space-y-4">
                <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Grid Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 5" :key="i" class="bg-white rounded-xl overflow-hidden shadow-lg">
            <div class="h-48 bg-gray-200 animate-pulse"></div>
            <div class="p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="latestPosts.length > 0">
        <!-- Featured Post -->
        <div class="mb-12 max-w-5xl mx-auto" v-if="latestPosts[0]">
          <div
            class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="relative h-[300px] md:h-[400px]">
                <img
                  :src="getImageUrl(latestPosts[0].image)"
                  :alt="latestPosts[0].title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 left-4">
                  <span
                    class="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    Новая статья
                  </span>
                </div>
              </div>
              <div class="p-6 md:p-8 flex flex-col justify-center">
                <div class="mb-2 flex items-center flex-wrap gap-2">
                  <span
                    class="bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs font-medium"
                  >
                    {{ latestPosts[0].category_name }}
                  </span>
                  <span class="text-secondary-500 text-sm ml-3 flex items-center">
                    <Icon name="ph:calendar" class="mr-1" size="14" />
                    {{ formatDate(latestPosts[0].published_at) }}
                  </span>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
                  {{ latestPosts[0].title }}
                </h3>
                <p class="text-secondary-600 mb-6">
                  {{ latestPosts[0].summary }}
                </p>
                <NuxtLink
                  :to="`/blog/${latestPosts[0].slug}`"
                  class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
                >
                  <span>Читать далее</span>
                  <Icon
                    name="ph:arrow-right"
                    class="ml-1 transform group-hover:translate-x-1 transition-transform"
                    size="20"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
          <BlogCard
            v-for="(post, index) in latestPosts.slice(1)"
            :key="post.id"
            :title="post.title"
            :summary="post.summary"
            :imageUrl="getImageUrl(post.image)"
            :date="post.published_at"
            :category="post.category_name"
            :link="`/blog/${post.slug}`"
            :data-aos="'fade-up'"
            :data-aos-delay="500 + (index * 100)"
          />
        </div>

        <!-- View All Button -->
        <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
          <NuxtLink to="/blog" class="btn btn-primary inline-flex items-center">
            Все статьи
            <Icon name="ph:arrow-right" class="ml-2" size="20" />
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Icon name="ph:article" class="mx-auto text-gray-400 mb-4" size="64" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Статьи не найдены</h3>
        <p class="text-gray-500">Скоро здесь появятся интересные материалы</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useBlogStore } from '~/stores/blog'

const blogStore = useBlogStore()

// Получаем последние посты для главной страницы
const latestPosts = computed(() => blogStore.latestPosts)

// Форматирование даты
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Получение URL изображения из Directus
const getImageUrl = (imageId) => {
  const config = useRuntimeConfig()
  return `${config.public.directusUrl}/assets/${imageId}?width=800&height=600&fit=cover&format=webp`
}

// Загружаем данные при монтировании
onMounted(async () => {
  // Загружаем категории и последние 6 постов
  await Promise.all([
    blogStore.fetchCategories(),
    blogStore.fetchPosts(6)
  ])
})
</script>
