export default defineNuxtRouteMiddleware(async (to) => {
  // Используем content store для валидации
  const { getSectionBySlug, loadContent, isAllContentLoaded } = useContent()
  
  const pathSegments = to.path.split('/').filter(Boolean)
  
  // Если нет сегментов - пропускаем (это главная)
  if (pathSegments.length === 0) {
    return
  }
  
  const firstSegment = pathSegments[0]
  
  // Специальные пути, которые не нужно валидировать
  const specialPaths = ['blog', 'contacts', 'api']
  if (specialPaths.includes(firstSegment)) {
    return
  }
  
  // Убеждаемся что контент загружен
  if (!isAllContentLoaded.value) {
    await loadContent()
  }
  
  // Проверяем существует ли секция в content store
  const section = getSectionBySlug(firstSegment)
  
  // Если секция не найдена - показываем 404
  if (!section) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }
}) 