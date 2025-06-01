import { defineStore } from 'pinia'

interface DirectusResponse<T> {
  data: T[]
}

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

export interface BlogCategory {
  id: number
  name: string
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
}

export interface BlogPost {
  id: number
  status: string
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  title: string
  summary: string
  content: string
  published_at: string
  slug: string
  image: string
  seo: {
    title: string
    meta_description: string
    og_image: string
  }
  category: number
}

export interface BlogPostWithCategory extends BlogPost {
  category_name: string
}

export const useContentStore = defineStore('content', {
  state: () => ({
    // Content data
    sections: [] as DirectusSection[],
    categories: [] as DirectusCategory[],
    pages: [] as DirectusPage[],
    blogCategories: [] as BlogCategory[],
    blogPosts: [] as BlogPost[],
    
    // Loading states
    sectionsLoading: false,
    categoriesLoading: false,
    pagesLoading: false,
    blogCategoriesLoading: false,
    blogPostsLoading: false,
    
    // Error states
    sectionsError: null as string | null,
    categoriesError: null as string | null,
    pagesError: null as string | null,
    blogCategoriesError: null as string | null,
    blogPostsError: null as string | null,
    
    // Data loaded flags
    sectionsLoaded: false,
    categoriesLoaded: false,
    pagesLoaded: false,
    blogCategoriesLoaded: false,
    blogPostsLoaded: false,
    
    // Cache timestamps
    lastSectionsLoad: 0,
    lastCategoriesLoad: 0,
    lastPagesLoad: 0,
    lastBlogCategoriesLoad: 0,
    lastBlogPostsLoad: 0
  }),

  getters: {
    // Loading state
    isContentLoading: (state) => {
      return state.sectionsLoading || state.categoriesLoading || state.pagesLoading
    },

    isBlogLoading: (state) => {
      return state.blogCategoriesLoading || state.blogPostsLoading
    },

    isAllContentLoaded: (state) => {
      return state.sectionsLoaded && state.categoriesLoaded && state.pagesLoaded
    },

    // Menu structure
    menuStructure: (state): MenuSection[] => {
      if (!state.sectionsLoaded || !state.categoriesLoaded || !state.pagesLoaded) {
        return getFallbackMenu()
      }

      try {
        // Группируем категории по разделам
        const categoriesBySection = new Map<number, DirectusCategory[]>()
        state.categories.forEach(category => {
          if (!categoriesBySection.has(category.section)) {
            categoriesBySection.set(category.section, [])
          }
          categoriesBySection.get(category.section)!.push(category)
        })

        // Группируем страницы по категориям
        const pagesByCategory = new Map<number, DirectusPage[]>()
        state.pages.forEach(page => {
          if (!pagesByCategory.has(page.category)) {
            pagesByCategory.set(page.category, [])
          }
          pagesByCategory.get(page.category)!.push(page)
        })

        // Строим полную структуру меню
        const menuStructure: MenuSection[] = state.sections.map(section => {
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

        return menuStructure
      } catch (error) {
        console.error('Error building menu structure:', error)
        return getFallbackMenu()
      }
    },

    // Blog data with categories
    blogPostsWithCategories: (state): BlogPostWithCategory[] => {
      return state.blogPosts.map(post => ({
        ...post,
        category_name: state.blogCategories.find(cat => cat.id === post.category)?.name || 'Без категории'
      }))
    },

    // Latest blog posts for homepage
    latestBlogPosts(): BlogPostWithCategory[] {
      return this.blogPostsWithCategories
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, 6)
    },

    // Find section by slug
    getSectionBySlug: (state) => (slug: string): DirectusSection | null => {
      return state.sections.find(s => s.slug === slug) || null
    },

    // Find category by slug and section
    getCategoryBySlug: (state) => (sectionId: number, slug: string): DirectusCategory | null => {
      return state.categories.find(c => c.section === sectionId && c.slug === slug) || null
    },

    // Find page by slug and category
    getPageBySlug: (state) => (categoryId: number, slug: string): DirectusPage | null => {
      return state.pages.find(p => p.category === categoryId && p.slug === slug) || null
    },

    // Find page by path
    getPageByPath(): (sectionSlug: string, categorySlug: string, pageSlug: string) => MenuPage | null {
      return (sectionSlug: string, categorySlug: string, pageSlug: string): MenuPage | null => {
        const menuSection = this.menuStructure.find(s => s.slug === sectionSlug)
        if (!menuSection) return null

        const category = menuSection.categories.find(c => c.slug === categorySlug)
        if (!category) return null

        return category.pages.find(p => p.slug === pageSlug) || null
      }
    },

    // Get categories by section slug
    getCategoriesBySection(): (sectionSlug: string) => MenuCategory[] {
      return (sectionSlug: string): MenuCategory[] => {
        const section = this.menuStructure.find(s => s.slug === sectionSlug)
        return section?.categories || []
      }
    },

    // Find blog post by slug
    getBlogPostBySlug: (state) => (slug: string): BlogPost | null => {
      return state.blogPosts.find(p => p.slug === slug) || null
    }
  },

  actions: {
    // Check if data needs refresh (cache for 5 minutes)
    needsRefresh(lastLoadTime: number): boolean {
      const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
      return Date.now() - lastLoadTime > CACHE_DURATION
    },

    // Load all content data
    async loadAllContent(force = false) {
      const promises = []

      if (force || !this.sectionsLoaded || this.needsRefresh(this.lastSectionsLoad)) {
        promises.push(this.loadSections())
      }

      if (force || !this.categoriesLoaded || this.needsRefresh(this.lastCategoriesLoad)) {
        promises.push(this.loadCategories())
      }

      if (force || !this.pagesLoaded || this.needsRefresh(this.lastPagesLoad)) {
        promises.push(this.loadPages())
      }

      if (promises.length > 0) {
        await Promise.all(promises)
      }
    },

    // Load all blog data
    async loadAllBlogData(force = false) {
      const promises = []

      if (force || !this.blogCategoriesLoaded || this.needsRefresh(this.lastBlogCategoriesLoad)) {
        promises.push(this.loadBlogCategories())
      }

      if (force || !this.blogPostsLoaded || this.needsRefresh(this.lastBlogPostsLoad)) {
        promises.push(this.loadBlogPosts())
      }

      if (promises.length > 0) {
        await Promise.all(promises)
      }
    },

    // Load sections
    async loadSections() {
      if (this.sectionsLoading) return
      
      try {
        this.sectionsLoading = true
        this.sectionsError = null

        const { data } = await useAsyncData('directus-sections', () =>
          $fetch<DirectusResponse<DirectusSection>>('/api/directus/items/sections', {
            params: {
              sort: ['order'],
              fields: ['id', 'title', 'slug', 'order']
            }
          }),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data) {
          this.sections = data.value.data
          this.sectionsLoaded = true
          this.lastSectionsLoad = Date.now()
        }
      } catch (error) {
        console.error('Error loading sections:', error)
        this.sectionsError = error instanceof Error ? error.message : 'Unknown error'
      } finally {
        this.sectionsLoading = false
      }
    },

    // Load categories
    async loadCategories() {
      if (this.categoriesLoading) return

      try {
        this.categoriesLoading = true
        this.categoriesError = null

        const { data } = await useAsyncData('directus-categories', () =>
          $fetch<DirectusResponse<DirectusCategory>>('/api/directus/items/categories', {
            params: {
              sort: ['order'],
              fields: ['id', 'title', 'slug', 'section', 'order']
            }
          }),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data) {
          this.categories = data.value.data
          this.categoriesLoaded = true
          this.lastCategoriesLoad = Date.now()
        }
      } catch (error) {
        console.error('Error loading categories:', error)
        this.categoriesError = error instanceof Error ? error.message : 'Unknown error'
      } finally {
        this.categoriesLoading = false
      }
    },

    // Load pages
    async loadPages() {
      if (this.pagesLoading) return

      try {
        this.pagesLoading = true
        this.pagesError = null

        const { data } = await useAsyncData('directus-pages', () =>
          $fetch<DirectusResponse<DirectusPage>>('/api/directus/items/pages', {
            params: {
              filter: {
                is_published: { _eq: true }
              },
              sort: ['title'],
              fields: [
                'id', 'title', 'slug', 'content', 'section', 'category', 
                'is_published', 'type', 'seo'
              ]
            }
          }),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data) {
          this.pages = data.value.data
          this.pagesLoaded = true
          this.lastPagesLoad = Date.now()
        }
      } catch (error) {
        console.error('Error loading pages:', error)
        this.pagesError = error instanceof Error ? error.message : 'Unknown error'
      } finally {
        this.pagesLoading = false
      }
    },

    // Load blog categories
    async loadBlogCategories() {
      if (this.blogCategoriesLoading) return

      try {
        this.blogCategoriesLoading = true
        this.blogCategoriesError = null

        const { data } = await useAsyncData('directus-blog-categories', () =>
          $fetch<DirectusResponse<BlogCategory>>('/api/directus/items/blog_categories'),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data) {
          this.blogCategories = data.value.data
          this.blogCategoriesLoaded = true
          this.lastBlogCategoriesLoad = Date.now()
        }
      } catch (error) {
        console.error('Error loading blog categories:', error)
        this.blogCategoriesError = error instanceof Error ? error.message : 'Unknown error'
      } finally {
        this.blogCategoriesLoading = false
      }
    },

    // Load blog posts
    async loadBlogPosts(limit?: number) {
      if (this.blogPostsLoading && !limit) return // Allow limited requests

      try {
        this.blogPostsLoading = true
        this.blogPostsError = null

        const cacheKey = limit ? `directus-blog-posts-${limit}` : 'directus-blog-posts'
        
        let url = '/api/directus/items/blog'
        if (limit) {
          url += `?limit=${limit}&sort=-published_at`
        } else {
          url += '?sort=-published_at'
        }

        const { data } = await useAsyncData(cacheKey, () =>
          $fetch<DirectusResponse<BlogPost>>(url),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data) {
          if (limit) {
            // For limited requests (like homepage), just update posts if we don't have any
            if (this.blogPosts.length === 0) {
              this.blogPosts = data.value.data
            }
          } else {
            // For full load, replace all posts
            this.blogPosts = data.value.data
            this.blogPostsLoaded = true
            this.lastBlogPostsLoad = Date.now()
          }
        }
      } catch (error) {
        console.error('Error loading blog posts:', error)
        this.blogPostsError = error instanceof Error ? error.message : 'Unknown error'
      } finally {
        this.blogPostsLoading = false
      }
    },

    // Load specific blog post by slug
    async loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
      // First check if we already have this post
      const existingPost = this.getBlogPostBySlug(slug)
      if (existingPost) {
        return existingPost
      }

      try {
        const { data } = await useAsyncData(`blog-post-${slug}`, () =>
          $fetch<DirectusResponse<BlogPost>>(`/api/directus/items/blog?filter[slug][_eq]=${slug}&limit=1`),
          {
            server: true,
            lazy: false
          }
        )

        if (data.value?.data && data.value.data.length > 0) {
          const post = data.value.data[0]
          
          // Add to store if not already there
          const existingIndex = this.blogPosts.findIndex(p => p.id === post.id)
          if (existingIndex === -1) {
            this.blogPosts.push(post)
          } else {
            this.blogPosts[existingIndex] = post
          }
          
          return post
        }

        return null
      } catch (error) {
        console.error('Error loading blog post by slug:', error)
        return null
      }
    },

    // Initialize all data
    async initialize() {
      await Promise.all([
        this.loadAllContent(),
        this.loadAllBlogData()
      ])
    }
  }
})

// Fallback menu function
function getFallbackMenu(): MenuSection[] {
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