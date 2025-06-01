export default defineNuxtPlugin(async () => {
  const { initReviews } = useReviews()

  // Инициализируем данные отзывов на сервере для SSR
  try {
    await initReviews()
  } catch (error) {
    console.error('Failed to initialize reviews data on server:', error)
  }
}) 