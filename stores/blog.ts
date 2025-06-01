import { defineStore } from 'pinia'

interface DirectusResponse<T> {
  data: T[]
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

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
    categories: [] as BlogCategory[],
    currentPost: null as BlogPost | null,
    loading: false,
    error: null as string | null,
    
    // Pagination
    currentPage: 1,
    totalPosts: 0,
    postsPerPage: 9,
    
    // Filters
    selectedCategory: 'all',
    searchQuery: ''
  }),

  getters: {
    // Получить посты с названиями категорий
    postsWithCategories: (state): BlogPostWithCategory[] => {
      return state.posts.map(post => ({
        ...post,
        category_name: state.categories.find(cat => cat.id === post.category)?.name || 'Без категории'
      }))
    },

    // Отфильтрованные посты
    filteredPosts: (state): BlogPostWithCategory[] => {
      const postsWithCats = state.posts.map(post => ({
        ...post,
        category_name: state.categories.find(cat => cat.id === post.category)?.name || 'Без категории'
      }))

      let filtered = postsWithCats

      // Фильтр по категории
      if (state.selectedCategory !== 'all') {
        const categoryId = parseInt(state.selectedCategory)
        filtered = filtered.filter(post => post.category === categoryId)
      }

      // Фильтр по поиску
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.summary.toLowerCase().includes(query)
        )
      }

      return filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    },

    // Посты для текущей страницы
    paginatedPosts(): BlogPostWithCategory[] {
      const filtered = this.filteredPosts
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return filtered.slice(start, end)
    },

    // Общее количество страниц
    totalPages(): number {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },

    // Последние посты для главной страницы
    latestPosts: (state): BlogPostWithCategory[] => {
      const postsWithCats = state.posts.map(post => ({
        ...post,
        category_name: state.categories.find(cat => cat.id === post.category)?.name || 'Без категории'
      }))
      
      return postsWithCats
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, 6)
    }
  },

  actions: {
    // Загрузить категории
    async fetchCategories() {
      try {
        this.loading = true
        this.error = null

        const response = await $fetch('/api/directus/items/blog_categories') as DirectusResponse<BlogCategory>
        this.categories = response.data || []
      } catch (error) {
        console.error('Error fetching blog categories:', error)
        this.error = 'Ошибка загрузки категорий'
      } finally {
        this.loading = false
      }
    },

    // Загрузить посты
    async fetchPosts(limit?: number) {
      try {
        this.loading = true
        this.error = null

        let url = '/api/directus/items/blog'
        if (limit) {
          url += `?limit=${limit}&sort=-published_at`
        } else {
          url += '?sort=-published_at'
        }

        const response = await $fetch(url) as DirectusResponse<BlogPost>
        
        if (limit) {
          // Если указан лимит, заменяем только эти посты (для главной страницы)
          this.posts = response.data || []
        } else {
          // Иначе загружаем все посты
          this.posts = response.data || []
        }
        
        this.totalPosts = response.data?.length || 0
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        this.error = 'Ошибка загрузки статей'
      } finally {
        this.loading = false
      }
    },

    // Загрузить конкретный пост по slug
    async fetchPostBySlug(slug: string) {
      try {
        this.loading = true
        this.error = null

        const response = await $fetch(`/api/directus/items/blog?filter[slug][_eq]=${slug}&limit=1`) as DirectusResponse<BlogPost>
        
        if (response.data && response.data.length > 0) {
          this.currentPost = response.data[0]
          return response.data[0]
        } else {
          this.currentPost = null
          return null
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        this.error = 'Ошибка загрузки статьи'
        this.currentPost = null
        return null
      } finally {
        this.loading = false
      }
    },

    // Установить фильтры
    setCategory(categoryId: string) {
      this.selectedCategory = categoryId
      this.currentPage = 1 // Сбрасываем на первую страницу
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1 // Сбрасываем на первую страницу
    },

    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    // Очистить состояние
    clearFilters() {
      this.selectedCategory = 'all'
      this.searchQuery = ''
      this.currentPage = 1
    }
  }
}) 