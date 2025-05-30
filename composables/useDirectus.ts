// Типы для страниц из Directus
export interface DirectusPage {
  id: number
  title: string
  name?: string
  slug: string
  content?: string
  seo?: {
    title?: string
    meta_description?: string
  }
  user_created?: string
  date_created: string
  user_updated?: string | null
  date_updated?: string | null
}

export interface DirectusResponse<T> {
  data: T[]
}

export const useDirectus = () => {
  // Используем наш серверный API proxy
  const baseURL = '/api/directus'
  
  // Определить коллекцию по slug
  const getCollectionBySlug = (slug: string): string => {
    const slugParts = slug.split('/')
    
    if (slugParts.length === 1) {
      // Простые slug типа "online", "offline" - ищем в study
      return 'study'
    }
    
    // Для составных slug берем первую часть как название коллекции
    const category = slugParts[0]
    return category // courses, degree, visa и т.д.
  }
  
  // Получить slug для поиска в коллекции
  const getSearchSlug = (slug: string): string => {
    const slugParts = slug.split('/')
    
    if (slugParts.length === 1) {
      // Для простых slug возвращаем как есть
      return slug
    }
    
    // Для составных slug берем вторую часть
    return slugParts[1] // language, bachelor и т.д.
  }
  
  // Получить страницу study по slug
  const fetchStudyPage = async (slug: string): Promise<DirectusPage | null> => {
    try {
      const collection = getCollectionBySlug(slug)
      const searchSlug = getSearchSlug(slug)
      
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/${collection}`, {
        params: {
          filter: {
            slug: { _eq: searchSlug }
          },
          fields: [
            'id',
            'title',
            'name',
            'slug',
            'content',
            'seo.title',
            'seo.meta_description',
            'date_created',
            'date_updated'
          ]
        }
      })
      
      return response.data && response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      console.error('Error fetching study page:', error)
      return null
    }
  }
  
  // Получить все страницы study (из всех коллекций)
  const fetchAllStudyPages = async (): Promise<DirectusPage[]> => {
    try {
      const collections = ['study', 'courses', 'degree'] // добавьте другие коллекции по необходимости
      const allPages: DirectusPage[] = []
      
      for (const collection of collections) {
        try {
          const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/${collection}`, {
            params: {
              fields: [
                'id',
                'title',
                'name',
                'slug',
                'date_created',
                'date_updated'
              ],
              sort: ['date_created']
            }
          })
          
          // Добавляем префикс к slug для правильного URL
          const pagesWithPrefix = response.data.map(page => ({
            ...page,
            slug: collection === 'study' ? page.slug : `${collection}/${page.slug}`
          }))
          
          allPages.push(...pagesWithPrefix)
        } catch (error) {
          console.error(`Error fetching ${collection} pages:`, error)
        }
      }
      
      return allPages
    } catch (error) {
      console.error('Error fetching study pages:', error)
      return []
    }
  }
  
  // Получить страницу work по slug
  const fetchWorkPage = async (slug: string): Promise<DirectusPage | null> => {
    try {
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/work`, {
        params: {
          filter: {
            slug: { _eq: slug }
          },
          fields: [
            'id',
            'title',
            'name',
            'slug',
            'content',
            'seo.title',
            'seo.meta_description',
            'date_created',
            'date_updated'
          ]
        }
      })
      
      return response.data && response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      console.error('Error fetching work page:', error)
      return null
    }
  }
  
  // Получить все страницы work
  const fetchAllWorkPages = async (): Promise<DirectusPage[]> => {
    try {
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/work`, {
        params: {
          fields: [
            'id',
            'title',
            'name',
            'slug',
            'date_created',
            'date_updated'
          ],
          sort: ['date_created']
        }
      })
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching work pages:', error)
      return []
    }
  }
  
  // Получить страницу business по slug
  const fetchBusinessPage = async (slug: string): Promise<DirectusPage | null> => {
    try {
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/business`, {
        params: {
          filter: {
            slug: { _eq: slug }
          },
          fields: [
            'id',
            'title',
            'name',
            'slug',
            'content',
            'seo.title',
            'seo.meta_description',
            'date_created',
            'date_updated'
          ]
        }
      })
      
      return response.data && response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      console.error('Error fetching business page:', error)
      return null
    }
  }
  
  // Получить все страницы business
  const fetchAllBusinessPages = async (): Promise<DirectusPage[]> => {
    try {
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/business`, {
        params: {
          fields: [
            'id',
            'title',
            'name',
            'slug',
            'date_created',
            'date_updated'
          ],
          sort: ['date_created']
        }
      })
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching business pages:', error)
      return []
    }
  }
  
  // Создать страницу (универсальная функция)
  const createPage = async (collection: string, pageData: Partial<DirectusPage>): Promise<DirectusPage> => {
    try {
      const response = await $fetch<{ data: DirectusPage }>(`${baseURL}/items/${collection}`, {
        method: 'POST',
        body: pageData
      })
      
      return response.data
    } catch (error) {
      console.error(`Error creating ${collection} page:`, error)
      throw error
    }
  }
  
  // Обновить страницу (универсальная функция)
  const updatePage = async (collection: string, id: number, pageData: Partial<DirectusPage>): Promise<DirectusPage> => {
    try {
      const response = await $fetch<{ data: DirectusPage }>(`${baseURL}/items/${collection}/${id}`, {
        method: 'PATCH',
        body: pageData
      })
      
      return response.data
    } catch (error) {
      console.error(`Error updating ${collection} page:`, error)
      throw error
    }
  }
  
  return {
    // Study pages
    fetchStudyPage,
    fetchAllStudyPages,
    
    // Work pages
    fetchWorkPage,
    fetchAllWorkPages,
    
    // Business pages
    fetchBusinessPage,
    fetchAllBusinessPages,
    
    // Universal functions
    createPage,
    updatePage
  }
} 