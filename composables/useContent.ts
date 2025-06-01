import { computed } from 'vue'
import { useContentStore } from '~/stores/content'
import type { MenuSection, MenuCategory, MenuPage, BlogPost, BlogPostWithCategory } from '~/stores/content'

export const useContent = () => {
  const contentStore = useContentStore()

  // Content loading and initialization
  const initializeContent = async () => {
    await contentStore.initialize()
  }

  const loadContent = async (force = false) => {
    await contentStore.loadAllContent(force)
  }

  const loadBlogData = async (force = false) => {
    await contentStore.loadAllBlogData(force)
  }

  // Menu and navigation
  const menuStructure = computed(() => contentStore.menuStructure)
  const isContentLoading = computed(() => contentStore.isContentLoading)
  const isAllContentLoaded = computed(() => contentStore.isAllContentLoaded)

  // Get menu by section
  const getMenuBySection = (sectionSlug: string): MenuCategory[] => {
    return contentStore.getCategoriesBySection(sectionSlug)
  }

  // Get breadcrumbs for a path
  const getBreadcrumbs = (currentPath: string) => {
    const breadcrumbs: Array<{ label: string; slug?: string }> = []
    
    // Parse path: /section/category/page
    const pathParts = currentPath.split('/').filter(Boolean)
    
    if (pathParts.length === 0) return breadcrumbs
    
    const sectionSlug = pathParts[0]
    const categorySlug = pathParts[1] 
    const pageSlug = pathParts[2]
    
    // Find section
    const section = menuStructure.value.find(s => s.slug === sectionSlug)
    if (section) {
      breadcrumbs.push({ 
        label: section.title, 
        slug: `/${section.slug}` 
      })
      
      // Find category
      if (categorySlug) {
        const category = section.categories.find(c => c.slug === categorySlug)
        if (category) {
          breadcrumbs.push({ 
            label: category.title, 
            slug: `/${section.slug}/${category.slug}` 
          })
          
          // Find page
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

  // Check if menu item is active
  const isMenuItemActive = (itemPath: string, currentPath: string): boolean => {
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
  }

  // Get all pages for a section (flat list)
  const getPagesBySection = (sectionSlug: string): MenuPage[] => {
    const section = menuStructure.value.find(s => s.slug === sectionSlug)
    if (!section) return []
    
    return section.categories.flatMap(category => category.pages)
  }

  // Find page by full path
  const findPageByPath = (path: string): MenuPage | null => {
    const pathParts = path.split('/').filter(Boolean)
    
    if (pathParts.length !== 3) return null
    
    const [sectionSlug, categorySlug, pageSlug] = pathParts
    
    const section = menuStructure.value.find(s => s.slug === sectionSlug)
    if (!section) return null
    
    const category = section.categories.find(c => c.slug === categorySlug)
    if (!category) return null
    
    return category.pages.find(p => p.slug === pageSlug) || null
  }

  // Get page by path directly from store
  const getPageByPath = (sectionSlug: string, categorySlug: string, pageSlug: string): MenuPage | null => {
    return contentStore.getPageByPath(sectionSlug, categorySlug, pageSlug)
  }

  // Section helpers
  const getSectionBySlug = (slug: string) => {
    return contentStore.getSectionBySlug(slug)
  }

  const getSectionData = (slug: string) => {
    return menuStructure.value.find(section => section.slug === slug)
  }

  const getCategoryData = (sectionSlug: string, categorySlug: string) => {
    const section = getSectionData(sectionSlug)
    if (!section) return null
    return section.categories.find(cat => cat.slug === categorySlug)
  }

  // Blog functionality
  const blogPosts = computed(() => contentStore.blogPosts)
  const blogCategories = computed(() => contentStore.blogCategories)
  const blogPostsWithCategories = computed(() => contentStore.blogPostsWithCategories)
  const latestBlogPosts = computed(() => contentStore.latestBlogPosts)
  const isBlogLoading = computed(() => contentStore.isBlogLoading)

  const loadBlogPosts = async (limit?: number) => {
    await contentStore.loadBlogPosts(limit)
  }

  const loadBlogCategories = async () => {
    await contentStore.loadBlogCategories()
  }

  const loadBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    return await contentStore.loadBlogPostBySlug(slug)
  }

  const getBlogPostBySlug = (slug: string): BlogPost | null => {
    return contentStore.getBlogPostBySlug(slug)
  }

  // Legacy compatibility methods (to replace useDirectus and useMenu gradually)
  const loadMenu = async () => {
    await loadContent()
  }

  const hasMenuData = computed(() => isAllContentLoaded.value)
  const menuItems = computed(() => menuStructure.value)

  const fetchPageByPath = async (sectionSlug: string, categorySlug: string, pageSlug: string): Promise<MenuPage | null> => {
    // Ensure content is loaded
    if (!isAllContentLoaded.value) {
      await loadContent()
    }
    
    return getPageByPath(sectionSlug, categorySlug, pageSlug)
  }

  return {
    // Initialization
    initializeContent,
    loadContent,
    loadBlogData,

    // Menu and navigation
    menuStructure,
    menuItems, // Legacy compatibility
    isContentLoading,
    isAllContentLoaded,
    hasMenuData, // Legacy compatibility
    getMenuBySection,
    getBreadcrumbs,
    isMenuItemActive,
    getPagesBySection,
    findPageByPath,
    getPageByPath,
    fetchPageByPath, // Legacy compatibility

    // Section and page helpers
    getSectionBySlug,
    getSectionData,
    getCategoryData,

    // Blog
    blogPosts,
    blogCategories,
    blogPostsWithCategories,
    latestBlogPosts,
    isBlogLoading,
    loadBlogPosts,
    loadBlogCategories,
    loadBlogPostBySlug,
    getBlogPostBySlug,

    // Legacy compatibility
    loadMenu
  }
} 