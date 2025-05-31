// Типы для новой 3-табличной структуры Directus

export interface DirectusSection {
  id: number
  title: string
  slug: string
  order: number
  user_created?: string
  date_created?: string
  user_updated?: string | null
  date_updated?: string | null
}

export interface DirectusCategory {
  id: number
  title: string
  slug: string
  section: number // FK to sections
  order: number
  user_created?: string
  date_created?: string
  user_updated?: string | null
  date_updated?: string | null
}

export interface DirectusPage {
  id: number
  title: string
  slug: string
  content?: string
  section: number // FK to sections
  category: number // FK to categories
  is_published: boolean
  type: string
  seo?: {
    title?: string
    meta_description?: string
  }
  user_created?: string
  date_created?: string
  user_updated?: string | null
  date_updated?: string | null
}

// Объединенные типы для удобства работы
export interface MenuSection extends DirectusSection {
  categories: MenuCategory[]
}

export interface MenuCategory extends DirectusCategory {
  pages: MenuPage[]
  section_slug?: string
}

export interface MenuPage extends DirectusPage {
  category_slug?: string
  section_slug?: string
  full_path?: string
}

export interface DirectusResponse<T> {
  data: T[]
}

export const useDirectus = () => {
  // Используем наш серверный API proxy
  const baseURL = '/api/directus'
  
  // Получить все разделы
  const fetchSections = async (): Promise<DirectusSection[]> => {
    try {
      const response = await $fetch<DirectusResponse<DirectusSection>>(`${baseURL}/items/sections`, {
        params: {
          sort: ['order'],
          fields: ['id', 'title', 'slug', 'order']
        }
      })
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching sections:', error)
      return []
    }
  }
  
  // Получить категории (опционально по разделу)
  const fetchCategories = async (sectionId?: number): Promise<DirectusCategory[]> => {
    try {
      const params: any = {
        sort: ['order'],
        fields: ['id', 'title', 'slug', 'section', 'order']
      }
      
      if (sectionId) {
        params.filter = {
          section: { _eq: sectionId }
        }
      }
      
      const response = await $fetch<DirectusResponse<DirectusCategory>>(`${baseURL}/items/categories`, {
        params
      })
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }
  
  // Получить страницы (опционально по разделу или категории)
  const fetchPages = async (sectionId?: number, categoryId?: number): Promise<DirectusPage[]> => {
    try {
      const params: any = {
        filter: {
          is_published: { _eq: true }
        },
        sort: ['title'],
        fields: [
          'id', 'title', 'slug', 'content', 'section', 'category', 
          'is_published', 'type', 'seo'
        ]
      }
      
      if (sectionId) {
        params.filter.section = { _eq: sectionId }
      }
      
      if (categoryId) {
        params.filter.category = { _eq: categoryId }
      }
      
      const response = await $fetch<DirectusResponse<DirectusPage>>(`${baseURL}/items/pages`, {
        params
      })
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching pages:', error)
      return []
    }
  }
  
  // Получить полную структуру меню
  const fetchFullMenu = async (): Promise<MenuSection[]> => {
    try {
      console.log('Fetching full menu structure...')
      
      // Загружаем все данные параллельно
      const [sections, categories, pages] = await Promise.all([
        fetchSections(),
        fetchCategories(),
        fetchPages()
      ])
      
      console.log('Fetched data:', { sections, categories, pages })
      
      // Создаем мапы для быстрого поиска
      const sectionsMap = new Map(sections.map(s => [s.id, s]))
      const categoriesMap = new Map(categories.map(c => [c.id, c]))
      
      // Группируем категории по разделам
      const categoriesBySection = new Map<number, DirectusCategory[]>()
      categories.forEach(category => {
        if (!categoriesBySection.has(category.section)) {
          categoriesBySection.set(category.section, [])
        }
        categoriesBySection.get(category.section)!.push(category)
      })
      
      // Группируем страницы по категориям
      const pagesByCategory = new Map<number, DirectusPage[]>()
      pages.forEach(page => {
        if (!pagesByCategory.has(page.category)) {
          pagesByCategory.set(page.category, [])
        }
        pagesByCategory.get(page.category)!.push(page)
      })
      
      // Строим полную структуру меню
      const menuStructure: MenuSection[] = sections.map(section => {
        const sectionCategories = categoriesBySection.get(section.id) || []
        
        const enrichedCategories: MenuCategory[] = sectionCategories.map(category => {
          const categoryPages = pagesByCategory.get(category.id) || []
          
          const enrichedPages: MenuPage[] = categoryPages.map(page => ({
            ...page,
            category_slug: category.slug,
            section_slug: section.slug,
            full_path: `/${section.slug}/${category.slug}/${page.slug}`
          }))
          
          return {
            ...category,
            section_slug: section.slug,
            pages: enrichedPages
          }
        })
        
        return {
          ...section,
          categories: enrichedCategories
        }
      })
      
      console.log('Built menu structure:', menuStructure)
      return menuStructure
      
    } catch (error) {
      console.error('Error building full menu:', error)
      return getFallbackMenu()
    }
  }
  
  // Получить страницу по полному пути
  const fetchPageByPath = async (sectionSlug: string, categorySlug: string, pageSlug: string): Promise<MenuPage | null> => {
    try {
      console.log('Fetching page by path:', { sectionSlug, categorySlug, pageSlug })
      
      // Находим раздел
      const sections = await fetchSections()
      const section = sections.find(s => s.slug === sectionSlug)
      if (!section) {
        console.warn('Section not found:', sectionSlug)
        return null
      }
      
      // Находим категорию
      const categories = await fetchCategories(section.id)
      const category = categories.find(c => c.slug === categorySlug)
      if (!category) {
        console.warn('Category not found:', categorySlug)
        return null
      }
      
      // Находим страницу
      const pages = await fetchPages(section.id, category.id)
      const page = pages.find(p => p.slug === pageSlug)
      if (!page) {
        console.warn('Page not found:', pageSlug)
        return null
      }
      
      // Обогащаем данными
      const enrichedPage: MenuPage = {
        ...page,
        category_slug: category.slug,
        section_slug: section.slug,
        full_path: `/${section.slug}/${category.slug}/${page.slug}`
      }
      
      console.log('Found page:', enrichedPage)
      return enrichedPage
      
    } catch (error) {
      console.error('Error fetching page by path:', error)
      return null
    }
  }
  
  // Получить меню для конкретного раздела
  const getMenuBySection = (sectionSlug: string, fullMenu: MenuSection[]): MenuSection | null => {
    return fullMenu.find(section => section.slug === sectionSlug) || null
  }
  
  // Fallback меню на случай недоступности Directus
  const getFallbackMenu = (): MenuSection[] => {
    return [
      {
        id: 1,
        title: 'Учёба в США',
        slug: 'study',
        order: 1,
        categories: [
          {
            id: 1,
            title: 'Форматы обучения',
            slug: 'formats',
            section: 1,
            order: 1,
            section_slug: 'study',
            pages: [
              {
                id: 1,
                title: 'Онлайн',
                slug: 'online',
                section: 1,
                category: 1,
                is_published: true,
                type: 'page',
                category_slug: 'formats',
                section_slug: 'study',
                full_path: '/study/formats/online'
              },
              {
                id: 2,
                title: 'Оффлайн',
                slug: 'offline',
                section: 1,
                category: 1,
                is_published: true,
                type: 'page',
                category_slug: 'formats',
                section_slug: 'study',
                full_path: '/study/formats/offline'
              }
            ]
          },
          {
            id: 2,
            title: 'Курсы',
            slug: 'courses',
            section: 1,
            order: 2,
            section_slug: 'study',
            pages: [
              {
                id: 3,
                title: 'Языковые курсы',
                slug: 'language',
                section: 1,
                category: 2,
                is_published: true,
                type: 'page',
                category_slug: 'courses',
                section_slug: 'study',
                full_path: '/study/courses/language'
              }
            ]
          }
        ]
      }
    ]
  }
  
  // CRUD операции
  const createSection = async (sectionData: Partial<DirectusSection>): Promise<DirectusSection> => {
    try {
      const response = await $fetch<{ data: DirectusSection }>(`${baseURL}/items/sections`, {
        method: 'POST',
        body: sectionData
      })
      return response.data
    } catch (error) {
      console.error('Error creating section:', error)
      throw error
    }
  }
  
  const createCategory = async (categoryData: Partial<DirectusCategory>): Promise<DirectusCategory> => {
    try {
      const response = await $fetch<{ data: DirectusCategory }>(`${baseURL}/items/categories`, {
        method: 'POST',
        body: categoryData
      })
      return response.data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }
  
  const createPage = async (pageData: Partial<DirectusPage>): Promise<DirectusPage> => {
    try {
      const response = await $fetch<{ data: DirectusPage }>(`${baseURL}/items/pages`, {
        method: 'POST',
        body: pageData
      })
      return response.data
    } catch (error) {
      console.error('Error creating page:', error)
      throw error
    }
  }
  
  return {
    // Fetch operations
    fetchSections,
    fetchCategories,
    fetchPages,
    fetchFullMenu,
    fetchPageByPath,
    
    // Utility functions
    getMenuBySection,
    getFallbackMenu,
    
    // CRUD operations
    createSection,
    createCategory,
    createPage
  }
}