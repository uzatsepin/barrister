import { defineStore } from 'pinia'

interface Review {
  id: number
  status: string
  platform: string
  name: string
  date: string
  rating: number
  title: string
  content: string
  experienceDate?: string
  verified: boolean
  sourceUrl: string
}

interface VideoReview {
  id: number
  status: string
  title: string
  description: string
  thumbnail: string // Directus file ID
  url: string
  duration: string
  client: string
  visaType?: string
}

interface Platform {
  id: number
  name: string
  rating: string
  icon: string
  url: string
  description: string
  reviewsCount: string
}

interface ReviewsState {
  reviews: Review[]
  videoReviews: VideoReview[]
  platforms: Platform[]
  loading: {
    reviews: boolean
    videoReviews: boolean
    platforms: boolean
  }
  error: {
    reviews: string | null
    videoReviews: string | null
    platforms: string | null
  }
  lastFetch: {
    reviews: number | null
    videoReviews: number | null
    platforms: number | null
  }
}

export const useReviewsStore = defineStore('reviews', {
  state: (): ReviewsState => ({
    reviews: [],
    videoReviews: [],
    platforms: [],
    loading: {
      reviews: false,
      videoReviews: false,
      platforms: false
    },
    error: {
      reviews: null,
      videoReviews: null,
      platforms: null
    },
    lastFetch: {
      reviews: null,
      videoReviews: null,
      platforms: null
    }
  }),

  getters: {
    // Получаем отзывы по платформе
    getReviewsByPlatform: (state) => (platform: string) => {
      if (platform === 'all') return state.reviews
      return state.reviews.filter(review => review.platform === platform)
    },

    // Получаем количество отзывов по платформе
    getReviewsCountByPlatform: (state) => (platform: string) => {
      if (platform === 'all') return state.reviews.length
      return state.reviews.filter(review => review.platform === platform).length
    },

    // Проверяем, нужно ли обновить данные (кэш 5 минут)
    needsRefresh: (state) => (type: 'reviews' | 'videoReviews' | 'platforms') => {
      const lastFetch = state.lastFetch[type]
      if (!lastFetch) return true
      return Date.now() - lastFetch > 5 * 60 * 1000 // 5 минут
    },

    // Все данные загружены
    isDataLoaded: (state) => {
      return state.reviews.length > 0 && 
             state.videoReviews.length > 0 && 
             state.platforms.length > 0
    },

    // Есть ошибки
    hasErrors: (state) => {
      return !!(state.error.reviews || state.error.videoReviews || state.error.platforms)
    }
  },

  actions: {
    // Загружаем отзывы
    async fetchReviews(force = false) {
      if (!force && !this.needsRefresh('reviews')) {
        return this.reviews
      }

      this.loading.reviews = true
      this.error.reviews = null

      try {
        const { data } = await useAsyncData('directus-reviews', () => 
          $fetch('/api/directus/items/reviews', {
            query: {
              filter: {
                status: { _eq: 'published' }
              },
              sort: ['-date_created']
            }
          }), {
            default: () => ({ data: [] }),
            server: true,
            transform: (response: any) => response?.data || []
          }
        )

        this.reviews = data.value || []
        this.lastFetch.reviews = Date.now()
        
        return this.reviews
      } catch (error) {
        console.error('Error fetching reviews:', error)
        this.error.reviews = 'Ошибка загрузки отзывов'
        throw error
      } finally {
        this.loading.reviews = false
      }
    },

    // Загружаем видео отзывы
    async fetchVideoReviews(force = false) {
      if (!force && !this.needsRefresh('videoReviews')) {
        return this.videoReviews
      }

      this.loading.videoReviews = true
      this.error.videoReviews = null

      try {
        const { data } = await useAsyncData('directus-video-reviews', () => 
          $fetch('/api/directus/items/videoReviews', {
            query: {
              filter: {
                status: { _eq: 'published' }
              },
              sort: ['-date_created']
            }
          }), {
            default: () => ({ data: [] }),
            server: true,
            transform: (response: any) => response?.data || []
          }
        )

        this.videoReviews = data.value || []
        this.lastFetch.videoReviews = Date.now()
        
        return this.videoReviews
      } catch (error) {
        console.error('Error fetching video reviews:', error)
        this.error.videoReviews = 'Ошибка загрузки видео отзывов'
        throw error
      } finally {
        this.loading.videoReviews = false
      }
    },

    // Загружаем платформы
    async fetchPlatforms(force = false) {
      if (!force && !this.needsRefresh('platforms')) {
        return this.platforms
      }

      this.loading.platforms = true
      this.error.platforms = null

      try {
        const { data } = await useAsyncData('directus-platforms', () => 
          $fetch('/api/directus/items/platforms', {
            query: {
              sort: ['id']
            }
          }), {
            default: () => ({ data: [] }),
            server: true,
            transform: (response: any) => response?.data || []
          }
        )

        this.platforms = data.value || []
        this.lastFetch.platforms = Date.now()
        
        return this.platforms
      } catch (error) {
        console.error('Error fetching platforms:', error)
        this.error.platforms = 'Ошибка загрузки платформ'
        throw error
      } finally {
        this.loading.platforms = false
      }
    },

    // Загружаем все данные
    async fetchAllReviewsData(force = false) {
      try {
        await Promise.all([
          this.fetchReviews(force),
          this.fetchVideoReviews(force),
          this.fetchPlatforms(force)
        ])
      } catch (error) {
        console.error('Error fetching all reviews data:', error)
        throw error
      }
    },

    // Получаем URL превьюшки видео
    getVideoThumbnailUrl(thumbnailId: string) {
      if (!thumbnailId) return '/images/video-thumbnail-1.svg' // fallback
      
      const runtimeConfig = useRuntimeConfig()
      const directusUrl = runtimeConfig.public.directusUrl
      
      return `${directusUrl}/assets/${thumbnailId}?width=640&height=360&fit=cover&quality=80`
    },

    // Получаем иконку платформы для UI
    getPlatformDisplayIcon(platform: Platform) {
      const iconMap: Record<string, string> = {
        'stars': 'ph:star-fill',
        'google': 'ph:google-logo',
        'youtube': 'ph:youtube-logo',
        'reviews': 'ph:star-fill'
      }
      
      return iconMap[platform.icon] || 'ph:star-fill'
    },

    // Получаем цвет платформы
    getPlatformColor(platformName: string) {
      const colorMap: Record<string, string> = {
        'trustpilot': 'text-[#00b67a]',
        'google': 'text-blue-500',
        'reviewsio': 'text-orange-500',
        'sitejabber': 'text-green-500',
        'glassdoor': 'text-emerald-500',
        'youtube': 'text-red-500',
        'articles': 'text-purple-500'
      }
      
      const key = platformName.toLowerCase().replace(/[^a-z0-9]/g, '')
      return colorMap[key] || 'text-gray-500'
    },

    // Очищаем кэш
    clearCache() {
      this.lastFetch = {
        reviews: null,
        videoReviews: null,
        platforms: null
      }
    },

    // Сброс ошибок
    clearErrors() {
      this.error = {
        reviews: null,
        videoReviews: null,
        platforms: null
      }
    }
  }
}) 