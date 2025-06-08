<template>
  <section id="testimonials" class="py-24 bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <UiSectionHeading
        badge="Отзывы"
        title="Более 500+ довольных клиентов"
        subtitle="Проверенные отзывы на ведущих платформах и в социальных сетях"
      >
        <template #badge-icon>
          <Icon name="ph:star" />
        </template>
      </UiSectionHeading>

      <!-- Platforms Statistics -->
      <div v-if="loading.platforms" class="flex justify-center mb-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="platforms.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        <div 
          v-for="platform in platforms" 
          :key="platform.name"
          class="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          :class="{ 'ring-2 ring-primary-500': selectedPlatform === platform.name.toLowerCase().replace(/[^a-z0-9]/g, '') }"
          @click="selectPlatform(platform.name.toLowerCase().replace(/[^a-z0-9]/g, ''))"
        >
          <div class="flex flex-col items-center">
            <!-- Platform Logo -->
            <div class="w-12 h-12 mb-2 flex items-center justify-center">
              <Icon :name="getPlatformIcon(platform)" :class="getPlatformColorByName(platform.name)" size="32" />
            </div>
            
            <!-- Rating -->
            <div class="flex items-center gap-1 mb-1">
              <Icon name="ph:star-fill" :class="getPlatformColorByName(platform.name)" size="16" />
              <span class="font-bold text-sm">{{ platform.rating }}</span>
            </div>
            
            <!-- Reviews Count -->
            <p class="text-xs text-gray-600">{{ platform.reviewsCount }} отзывов</p>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          @click="selectedFilter = tab.key"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedFilter === tab.key
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          ]"
        >
          <Icon :name="tab.icon" class="mr-1" size="16" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Reviews Content -->
      <Transition mode="out-in" name="fade">
        <div :key="selectedFilter">
          <!-- Video Reviews -->
          <div v-if="selectedFilter === 'video'" class="space-y-8">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-4">Видео отзывы клиентов</h3>
              <p class="text-gray-600">Реальные истории успеха наших клиентов</p>
            </div>
            
            <div v-if="loading.videoReviews" class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>

            <div v-else-if="videoReviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="video in videoReviews" 
                :key="video.id"
                class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div class="aspect-video relative group cursor-pointer" @click="openVideo(video.url)">
                  <img 
                    :src="getVideoThumbnailUrl(video.thumbnail)" 
                    :alt="video.title" 
                    class="w-full h-full object-cover"
                    @error="$event.target.src = '/images/video-thumbnail-1.svg'"
                  />
                  <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name="ph:play-fill" class="text-primary-600 ml-1" size="24" />
                    </div>
                  </div>
                  <!-- Duration Badge -->
                  <div v-if="video.duration" class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {{ video.duration }}
                  </div>
                </div>
                <div class="p-4">
                  <h4 class="font-semibold mb-2">{{ video.title }}</h4>
                  <p class="text-sm text-gray-600 mb-2">{{ video.description }}</p>
                  <div v-if="video.client || video.visaType" class="flex flex-wrap gap-2 text-xs">
                    <span v-if="video.client" class="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {{ video.client }}
                    </span>
                    <span v-if="video.visaType" class="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {{ video.visaType }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <p class="text-gray-500">Видео отзывы скоро появятся</p>
            </div>
          </div>

          <!-- Platform-specific Reviews -->
          <div v-else class="space-y-6">
            <div v-if="loading.reviews" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>

            <div v-else-if="filteredReviews.length > 0">
              <!-- Reviews Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="(review, index) in filteredReviews" 
                  :key="`${review.platform}-${review.id || index}`"
                  class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  :data-aos="'fade-up'"
                  :data-aos-delay="index * 100"
                >
                  <!-- Review Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-semibold text-lg">{{ review.name }}</h3>
                        <Icon v-if="review.verified" name="ph:check-circle-fill" class="text-green-500" size="16" title="Проверенный отзыв" />
                      </div>
                      <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
                      
                      <!-- Platform Badge -->
                      <div class="flex items-center gap-1 mt-2">
                        <Icon :name="getPlatformIcon(review.platform)" :class="getPlatformColorByName(review.platform)" size="16" />
                        <span class="text-xs font-medium text-gray-600">{{ getPlatformName(review.platform) }}</span>
                      </div>
                    </div>
                    
                    <!-- Rating -->
                    <div class="flex gap-1">
                      <Icon 
                        v-for="star in 5" 
                        :key="star"
                        name="ph:star-fill"
                        :class="star <= review.rating ? getPlatformColorByName(review.platform) : 'text-gray-200'"
                        class="w-4 h-4"
                      />
                    </div>
                  </div>

                  <!-- Review Content -->
                  <div class="space-y-3">
                    <p v-if="review.title" class="font-medium text-secondary-900">{{ review.title }}</p>
                    <p class="text-secondary-600 line-clamp-4">{{ review.content }}</p>
                  </div>

                  <!-- Review Footer -->
                  <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <p v-if="review.experienceDate" class="text-sm text-gray-500">
                      Дата обращения: {{ formatDate(review.experienceDate) }}
                    </p>
                    <a 
                      :href="review.sourceUrl" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Читать полностью →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Load More Button -->
              <div v-if="hasMoreReviews" class="text-center mt-8">
                <button 
                  @click="loadMoreReviews"
                  class="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Показать ещё отзывы
                </button>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <p class="text-gray-500">
                <span v-if="selectedFilter !== 'all'">Отзывы для выбранной платформы пока отсутствуют</span>
                <span v-else>Отзывы скоро появятся</span>
              </p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- All Platforms Links -->
      <div class="mt-16 bg-white rounded-2xl p-8 shadow-lg">
        <h3 class="text-2xl font-bold text-center mb-6">Читайте отзывы на всех платформах</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <a 
            v-for="platform in platforms" 
            :key="platform.name"
            :href="platform.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <Icon :name="getPlatformIcon(platform)" :class="getPlatformColorByName(platform.name)" size="20" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm truncate">{{ platform.name }}</p>
              <p class="text-xs text-gray-500">{{ platform.reviewsCount }} отзывов</p>
            </div>
            <Icon name="ph:arrow-square-out" class="text-gray-400 group-hover:text-primary-600" size="16" />
          </a>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="selectedVideo"
        class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        @click="closeVideo"
      >
        <div class="relative w-full max-w-4xl aspect-video" @click.stop>
          <button 
            @click="closeVideo"
            class="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
          >
            <Icon name="ph:x" size="32" />
          </button>
          <iframe 
            :src="selectedVideo"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useReviews } from '~/composables/useReviews'

const selectedPlatform = ref('all')
const selectedFilter = ref('all')
const selectedVideo = ref(null)
const currentPage = ref(1)
const reviewsPerPage = 6

// Используем новый reviews store
const {
  reviews: allReviews,
  videoReviews,
  platforms,
  loading,
  error,
  isDataLoaded,
  getReviewsByPlatform,
  getVideoThumbnailUrl,
  getPlatformDisplayIcon,
  getPlatformColor
} = useReviews()

// Filter tabs - обновляем динамически на основе доступных платформ
const filterTabs = computed(() => {
  const baseTabs = [
    { key: 'all', label: 'Все отзывы', icon: 'ph:list' },
    { key: 'video', label: 'Видео', icon: 'ph:play' },
    { key: 'articles', label: 'Статьи', icon: 'ph:article' }
  ]

  // Добавляем табы для каждой платформы
  const platformTabs = platforms.value.map(platform => ({
    key: platform.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    label: platform.name,
    icon: getPlatformDisplayIcon(platform)
  }))

  return [...baseTabs, ...platformTabs]
})

// Computed properties
const filteredReviews = computed(() => {
  let filtered = allReviews.value || []
  
  if (selectedFilter.value === 'video') {
    return []
  }
  
  if (selectedFilter.value !== 'all') {
    // Ищем платформу по ключу фильтра
    const platformKey = selectedFilter.value
    const platform = platforms.value.find(p => 
      p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === platformKey
    )
    
    if (platform) {
      const platformName = platform.name.toLowerCase()
      filtered = filtered.filter(review => 
        review.platform.toLowerCase().includes(platformName) ||
        platformName.includes(review.platform.toLowerCase())
      )
    } else {
      filtered = filtered.filter(review => review.platform === selectedFilter.value)
    }
  }
  
  if (selectedPlatform.value !== 'all') {
    const platform = platforms.value.find(p => 
      p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedPlatform.value
    )
    
    if (platform) {
      const platformName = platform.name.toLowerCase()
      filtered = filtered.filter(review => 
        review.platform.toLowerCase().includes(platformName) ||
        platformName.includes(review.platform.toLowerCase())
      )
    }
  }
  
  return filtered.slice(0, currentPage.value * reviewsPerPage)
})

const hasMoreReviews = computed(() => {
  let totalFiltered = allReviews.value || []
  
  if (selectedFilter.value === 'video') {
    return false
  }
  
  if (selectedFilter.value !== 'all') {
    const platformKey = selectedFilter.value
    const platform = platforms.value.find(p => 
      p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === platformKey
    )
    
    if (platform) {
      const platformName = platform.name.toLowerCase()
      totalFiltered = totalFiltered.filter(review => 
        review.platform.toLowerCase().includes(platformName) ||
        platformName.includes(review.platform.toLowerCase())
      )
    } else {
      totalFiltered = totalFiltered.filter(review => review.platform === selectedFilter.value)
    }
  }
  
  if (selectedPlatform.value !== 'all') {
    const platform = platforms.value.find(p => 
      p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedPlatform.value
    )
    
    if (platform) {
      const platformName = platform.name.toLowerCase()
      totalFiltered = totalFiltered.filter(review => 
        review.platform.toLowerCase().includes(platformName) ||
        platformName.includes(review.platform.toLowerCase())
      )
    }
  }
  
  return filteredReviews.value.length < totalFiltered.length
})

// Methods
const selectPlatform = (platformKey) => {
  selectedPlatform.value = platformKey
  selectedFilter.value = platformKey === 'all' ? 'all' : platformKey
  currentPage.value = 1
}

const loadMoreReviews = () => {
  currentPage.value++
}

const openVideo = (url) => {
  selectedVideo.value = url
  // Предотвращаем скролл фона
  document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
  selectedVideo.value = null
  // Возвращаем скролл
  document.body.style.overflow = 'auto'
}

const getPlatformIcon = (platform) => {
  return getPlatformDisplayIcon(platform)
}

const getPlatformColorByName = (platformName) => {
  return getPlatformColor(platformName)
}

const getPlatformName = (platform) => {
  return platform || 'Неизвестно'
}

// Форматируем дату
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

onBeforeUnmount(() => {
  if (selectedVideo.value) {
    document.body.style.overflow = 'auto'
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>