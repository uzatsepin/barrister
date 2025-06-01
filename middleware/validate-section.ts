export default defineNuxtRouteMiddleware((to) => {
  // Валидные разделы для динамических страниц
  const validSections = ['study', 'work', 'business', 'humanitarian', 'estate']
  
  const pathSegments = to.path.split('/').filter(Boolean)
  
  // Если нет сегментов - пропускаем (это главная)
  if (pathSegments.length === 0) {
    return
  }
  
  const firstSegment = pathSegments[0]
  
  // Если первый сегмент не валидный раздел - показываем 404
  if (!validSections.includes(firstSegment)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }
}) 