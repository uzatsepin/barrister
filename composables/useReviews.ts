export const useReviews = () => {
  const store = useReviewsStore()

  // Инициализация данных
  const initReviews = async (force = false) => {
    try {
      await store.fetchAllReviewsData(force)
    } catch (error) {
      console.error('Failed to initialize reviews:', error)
    }
  }

  // Геттеры для удобства
  const reviews = computed(() => store.reviews)
  const videoReviews = computed(() => store.videoReviews)
  const platforms = computed(() => store.platforms)
  
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const isDataLoaded = computed(() => store.isDataLoaded)
  const hasErrors = computed(() => store.hasErrors)

  // Методы для фильтрации
  const getReviewsByPlatform = (platform: string) => {
    return store.getReviewsByPlatform(platform)
  }

  const getReviewsCountByPlatform = (platform: string) => {
    return store.getReviewsCountByPlatform(platform)
  }

  // Методы для получения URL и стилей
  const getVideoThumbnailUrl = (thumbnailId: string) => {
    return store.getVideoThumbnailUrl(thumbnailId)
  }

  const getPlatformDisplayIcon = (platform: any) => {
    return store.getPlatformDisplayIcon(platform)
  }

  const getPlatformColor = (platformName: string) => {
    return store.getPlatformColor(platformName)
  }

  // Методы управления
  const clearCache = () => store.clearCache()
  const clearErrors = () => store.clearErrors()
  const refresh = () => initReviews(true)

  return {
    // Данные
    reviews,
    videoReviews,
    platforms,
    
    // Состояние
    loading,
    error,
    isDataLoaded,
    hasErrors,
    
    // Методы
    initReviews,
    getReviewsByPlatform,
    getReviewsCountByPlatform,
    getVideoThumbnailUrl,
    getPlatformDisplayIcon,
    getPlatformColor,
    clearCache,
    clearErrors,
    refresh
  }
} 