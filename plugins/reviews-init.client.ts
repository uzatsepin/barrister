export default defineNuxtPlugin(async () => {
  const { initReviews } = useReviews()

  // Инициализируем данные отзывов при запуске приложения
  try {
    await initReviews()
  } catch (error) {
    console.error('Failed to initialize reviews data:', error)
  }
}) 