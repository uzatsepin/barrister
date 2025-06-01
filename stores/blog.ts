import { defineStore } from 'pinia'
import { useContentStore } from './content'
import type { BlogPost, BlogPostWithCategory, BlogCategory } from './content'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    currentPost: null as BlogPost | null,
    
    // Pagination
    currentPage: 1,
    postsPerPage: 9,
    
    // Filters
    selectedCategory: 'all',
    searchQuery: ''
  }),

  getters: {
    // Get content store
    contentStore(): any {
      return useContentStore()
    },

    // Get posts from content store
    posts(): BlogPost[] {
      return this.contentStore.blogPosts
    },

    // Get categories from content store
    categories(): BlogCategory[] {
      return this.contentStore.blogCategories
    },

    // Get loading state from content store
    loading(): boolean {
      return this.contentStore.isBlogLoading
    },

    // Get posts with categories from content store
    postsWithCategories(): BlogPostWithCategory[] {
      return this.contentStore.blogPostsWithCategories
    },

    // Filtered posts
    filteredPosts(): BlogPostWithCategory[] {
      let filtered = this.postsWithCategories

      // Filter by category
      if (this.selectedCategory !== 'all') {
        const categoryId = parseInt(this.selectedCategory)
        filtered = filtered.filter(post => post.category === categoryId)
      }

      // Filter by search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.summary.toLowerCase().includes(query)
        )
      }

      return filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    },

    // Posts for current page
    paginatedPosts(): BlogPostWithCategory[] {
      const filtered = this.filteredPosts
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return filtered.slice(start, end)
    },

    // Total pages
    totalPages(): number {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },

    // Latest posts for homepage from content store
    latestPosts(): BlogPostWithCategory[] {
      return this.contentStore.latestBlogPosts
    },

    // Total posts
    totalPosts(): number {
      return this.filteredPosts.length
    }
  },

  actions: {
    // Load categories (delegates to content store)
    async fetchCategories() {
      const contentStore = useContentStore()
      await contentStore.loadBlogCategories()
    },

    // Load posts (delegates to content store)
    async fetchPosts(limit?: number) {
      const contentStore = useContentStore()
      await contentStore.loadBlogPosts(limit)
    },

    // Load specific post by slug (delegates to content store)
    async fetchPostBySlug(slug: string): Promise<BlogPost | null> {
      const contentStore = useContentStore()
      const post = await contentStore.loadBlogPostBySlug(slug)
      
      if (post) {
        this.currentPost = post
      } else {
        this.currentPost = null
      }
      
      return post
    },

    // Set filters
    setCategory(categoryId: string) {
      this.selectedCategory = categoryId
      this.currentPage = 1 // Reset to first page
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1 // Reset to first page
    },

    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    // Clear filters
    clearFilters() {
      this.selectedCategory = 'all'
      this.searchQuery = ''
      this.currentPage = 1
    }
  }
}) 