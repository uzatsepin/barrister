import { ref, computed } from 'vue'
import type { MenuSection, MenuCategory, MenuPage } from './useDirectus'

export const useMenu = () => {
  const { fetchFullMenu, getMenuBySection: getMenuBySectionFromDirectus } = useDirectus()
  
  // Состояние
  const fullMenuData = ref<MenuSection[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Загрузить полную структуру меню
  const loadMenu = async () => {
    if (loading.value) return
    
    try {
      loading.value = true
      error.value = null
      
      const menuData = await fetchFullMenu()
      fullMenuData.value = menuData
      
      console.log('Menu loaded successfully:', menuData)
    } catch (err) {
      console.error('Failed to load menu:', err)
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  // Получить меню для конкретного раздела
  const getMenuBySection = (sectionSlug: string): MenuCategory[] => {
    const section = fullMenuData.value.find(s => s.slug === sectionSlug)
    return section?.categories || []
  }

  // Получить хлебные крошки для пути
  const getBreadcrumbs = (currentPath: string) => {
    const breadcrumbs: Array<{ label: string; slug?: string }> = []
    
    // Парсим путь: /section/category/page
    const pathParts = currentPath.split('/').filter(Boolean)
    
    if (pathParts.length === 0) return breadcrumbs
    
    const sectionSlug = pathParts[0]
    const categorySlug = pathParts[1] 
    const pageSlug = pathParts[2]
    
    // Находим раздел
    const section = fullMenuData.value.find(s => s.slug === sectionSlug)
    if (section) {
      breadcrumbs.push({ 
        label: section.title, 
        slug: `/${section.slug}` 
      })
      
      // Находим категорию
      if (categorySlug) {
        const category = section.categories.find(c => c.slug === categorySlug)
        if (category) {
          breadcrumbs.push({ 
            label: category.title, 
            slug: `/${section.slug}/${category.slug}` 
          })
          
          // Находим страницу
          if (pageSlug) {
            const page = category.pages.find(p => p.slug === pageSlug)
            if (page) {
              breadcrumbs.push({ 
                label: page.title 
              })
            }
          }
        }
      }
    }
    
    return breadcrumbs
  }

  // Проверить активность пункта меню
  const isMenuItemActive = (itemPath: string, currentPath: string): boolean => {
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
  }

  // Получить все страницы раздела (плоский список)
  const getPagesBySection = (sectionSlug: string): MenuPage[] => {
    const section = fullMenuData.value.find(s => s.slug === sectionSlug)
    if (!section) return []
    
    return section.categories.flatMap(category => category.pages)
  }

  // Найти страницу по полному пути
  const findPageByPath = (path: string): MenuPage | null => {
    const pathParts = path.split('/').filter(Boolean)
    
    if (pathParts.length !== 3) return null
    
    const [sectionSlug, categorySlug, pageSlug] = pathParts
    
    const section = fullMenuData.value.find(s => s.slug === sectionSlug)
    if (!section) return null
    
    const category = section.categories.find(c => c.slug === categorySlug)
    if (!category) return null
    
    return category.pages.find(p => p.slug === pageSlug) || null
  }

  // Computed свойства
  const menuItems = computed(() => fullMenuData.value)
  
  const hasMenuData = computed(() => fullMenuData.value.length > 0)

  return {
    // Состояние
    menuItems,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    hasMenuData,
    
    // Методы
    loadMenu,
    getMenuBySection,
    getBreadcrumbs,
    isMenuItemActive,
    getPagesBySection,
    findPageByPath
  }
} 