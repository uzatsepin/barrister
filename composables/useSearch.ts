import { ref, computed } from 'vue'

export const useSearch = () => {
  const isSearching = ref(false)
  const searchResults = ref([])
  const searchError = ref(null)

  // Функция для подсветки найденного текста
  const highlightText = (text, query) => {
    if (!text || !query) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
  }

  // Функция для извлечения контекста вокруг найденного текста
  const getTextContext = (text, query, contextLength = 150) => {
    if (!text || !query) return text
    
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerText.indexOf(lowerQuery)
    
    if (index === -1) {
      return text.length > contextLength ? text.substring(0, contextLength) + '...' : text
    }
    
    const start = Math.max(0, index - contextLength / 2)
    const end = Math.min(text.length, start + contextLength)
    
    let result = text.substring(start, end)
    if (start > 0) result = '...' + result
    if (end < text.length) result = result + '...'
    
    return result
  }

  const performSearch = async (query) => {
    if (!query.trim()) {
      searchResults.value = []
      return []
    }

    isSearching.value = true
    searchError.value = null
    const results = []

    try {
      // Поиск по блогу и страницам параллельно
      const [blogResponse, pagesResponse] = await Promise.all([
        // Поиск по блогу
        $fetch('/api/directus/items/blog', {
          query: {
            filter: {
              _or: [
                { title: { _icontains: query } },
                { summary: { _icontains: query } },
                { content: { _icontains: query } }
              ]
            },
            fields: ['id', 'title', 'summary', 'slug', 'published_at', 'category'],
            limit: 8,
            sort: ['-published_at']
          }
        }).catch(() => ({ data: [] })),

        // Поиск по страницам
        $fetch('/api/directus/items/pages', {
          query: {
            filter: {
              _and: [
                {
                  _or: [
                    { title: { _icontains: query } },
                    { content: { _icontains: query } }
                  ]
                },
                { is_published: { _eq: true } }
              ]
            },
            fields: ['id', 'title', 'slug', 'content', 'section', 'category', 'seo'],
            limit: 8
          }
        }).catch(() => ({ data: [] }))
      ])

      // Обрабатываем результаты блога
      if (blogResponse && blogResponse.data && blogResponse.data.length > 0) {
        for (const post of blogResponse.data) {
          const summary = post.summary || 'Статья блога'
          const highlightedSummary = highlightText(summary, query)
          
          results.push({
            id: `blog-${post.id}`,
            title: highlightText(post.title, query),
            description: highlightedSummary,
            link: `/blog/${post.slug}`,
            type: 'blog',
            published_at: post.published_at,
            icon: 'ph:article',
            relevance: calculateRelevance(post.title, summary, query)
          })
        }
      }

      // Получаем данные о разделах и категориях для построения ссылок на страницы
      const [sectionsResponse, categoriesResponse] = await Promise.all([
        $fetch('/api/directus/items/sections', {
          query: {
            fields: ['id', 'slug']
          }
        }).catch(() => ({ data: [] })),
        
        $fetch('/api/directus/items/categories', {
          query: {
            fields: ['id', 'slug', 'section']
          }
        }).catch(() => ({ data: [] }))
      ])

      // Создаем мапы для быстрого поиска
      const sectionsMap = new Map()
      const categoriesMap = new Map()
      
      if (sectionsResponse && sectionsResponse.data) {
        sectionsResponse.data.forEach((section) => {
          sectionsMap.set(section.id, section.slug)
        })
      }
      
      if (categoriesResponse && categoriesResponse.data) {
        categoriesResponse.data.forEach((category) => {
          categoriesMap.set(category.id, {
            slug: category.slug,
            sectionId: category.section
          })
        })
      }

      // Обрабатываем результаты страниц
      if (pagesResponse && pagesResponse.data && pagesResponse.data.length > 0) {
        for (const page of pagesResponse.data) {
          const categoryData = categoriesMap.get(page.category)
          const sectionSlug = categoryData ? sectionsMap.get(categoryData.sectionId) : null
          const categorySlug = categoryData ? categoryData.slug : null
          
          if (sectionSlug && categorySlug) {
            // Извлекаем краткое описание из контента
            let description = 'Страница сайта'
            let rawDescription = ''
            
            if (page.seo && page.seo.meta_description) {
              description = page.seo.meta_description
              rawDescription = description
            } else if (page.content) {
              // Убираем HTML теги
              const textContent = page.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
              rawDescription = textContent
              description = getTextContext(textContent, query, 120)
            }

            results.push({
              id: `page-${page.id}`,
              title: highlightText(page.title, query),
              description: highlightText(description, query),
              link: `/${sectionSlug}/${categorySlug}/${page.slug}`,
              type: 'page',
              section: sectionSlug,
              category: categorySlug,
              icon: getPageIcon(sectionSlug),
              relevance: calculateRelevance(page.title, rawDescription, query)
            })
          }
        }
      }

      // Сортируем результаты по релевантности и типу
      results.sort((a, b) => {
        // Сначала сортируем по типу (блог приоритетнее)
        if (a.type === 'blog' && b.type === 'page') return -1
        if (a.type === 'page' && b.type === 'blog') return 1
        
        // Потом по релевантности
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance
        }
        
        // Если релевантность одинаковая, для блога - по дате, для страниц - по алфавиту
        if (a.type === 'blog' && b.type === 'blog') {
          const dateA = new Date(a.published_at || 0)
          const dateB = new Date(b.published_at || 0)
          return dateB.getTime() - dateA.getTime()
        }
        
        return a.title.localeCompare(b.title)
      })

      searchResults.value = results
      return results

    } catch (error) {
      searchError.value = 'Ошибка поиска. Попробуйте еще раз.'
      searchResults.value = []
      return []
    } finally {
      isSearching.value = false
    }
  }

  // Функция для расчета релевантности
  const calculateRelevance = (title, content, query) => {
    let score = 0
    const lowerQuery = query.toLowerCase()
    const lowerTitle = title.toLowerCase()
    const lowerContent = content ? content.toLowerCase() : ''
    
    // Точное совпадение в заголовке = +100
    if (lowerTitle.includes(lowerQuery)) {
      score += 100
      
      // Если начинается с запроса = +50
      if (lowerTitle.startsWith(lowerQuery)) {
        score += 50
      }
    }
    
    // Совпадение в контенте = +10
    if (lowerContent.includes(lowerQuery)) {
      score += 10
      
      // Подсчет количества упоминаний в контенте
      const matches = (lowerContent.match(new RegExp(lowerQuery, 'g')) || []).length
      score += matches * 5
    }
    
    return score
  }

  // Иконки для разных типов страниц
  const getPageIcon = (sectionSlug) => {
    const iconMap = {
      'study': 'ph:student',
      'work': 'ph:briefcase', 
      'business': 'ph:buildings',
      'immigration': 'ph:airplane',
      'humanitarian': 'ph:heart',
      'estate': 'ph:house',
      'services': 'ph:gear'
    }
    return iconMap[sectionSlug] || 'ph:file-text'
  }

  // Форматирование типа для отображения
  const getTypeLabel = (type) => {
    return type === 'blog' ? 'Блог' : 'Страница'
  }

  // Цвет для типа результата
  const getTypeColor = (type) => {
    return type === 'blog' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-blue-700 bg-blue-50 border-blue-200'
  }

  return {
    isSearching,
    searchResults,
    searchError,
    performSearch,
    getTypeLabel,
    getTypeColor,
    highlightText
  }
} 