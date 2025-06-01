<template>
  <div>
    <!-- Floating CTA Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <button
        @click="showConsultationModal = true"
        class="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
      >
        <Icon name="ph:chat-circle-dots" size="24" />
        <span class="font-semibold">Бесплатная консультация</span>
        <Icon name="ph:arrow-right" size="20" class="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <!-- Hero Section для статьи -->
    <section class="relative bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-800 text-white overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-700/90 z-10"
        ></div>
        <NuxtImg
          ref="parallaxBg"
          src="/images/blog-bg.webp"
          alt="США"
          format="webp"
          class="w-full h-full object-cover scale-110 transform motion-safe:animate-subtle-zoom"
        />
      </div>
      
      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="mb-6 animate-fade-in">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <NuxtLink to="/blog" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Блог
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">{{ blogStore.currentPost?.title || 'Статья' }}</span>
              </li>
            </ol>
          </nav>
          
          <!-- Loading State -->
          <div v-if="blogStore.loading" class="animate-pulse">
            <div class="h-8 bg-gray-600 rounded w-3/4 mb-6"></div>
            <div class="h-12 bg-gray-600 rounded w-full mb-4"></div>
            <div class="h-4 bg-gray-600 rounded w-1/2"></div>
          </div>
          
          <!-- Article Header -->
          <div v-else-if="blogStore.currentPost">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
              {{ blogStore.currentPost.title }}
            </h1>
            
            <div class="flex items-center text-gray-200 mb-8 flex-wrap gap-4">
              <div class="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Icon name="ph:calendar" class="mr-2" size="18" />
                <span>{{ formatDate(blogStore.currentPost.published_at) }}</span>
              </div>
              <div class="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Icon name="ph:tag" class="mr-2" size="18" />
                <span>{{ getCategoryName(blogStore.currentPost.category) }}</span>
              </div>
              <div class="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <Icon name="ph:clock" class="mr-2" size="18" />
                <span>{{ readingTime }} мин чтения</span>
              </div>
            </div>
            
            <p class="text-xl text-gray-200 mb-8 leading-relaxed">
              {{ blogStore.currentPost.summary }}
            </p>

            <!-- Quick CTA in Hero -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold mb-2">Нужна персональная консультация?</h3>
                  <p class="text-gray-200 text-sm">Обсудите вашу ситуацию с экспертом BarristerCorp</p>
                </div>
                <button
                  @click="showConsultationModal = true"
                  class="bg-white text-secondary-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <Icon name="ph:phone" size="20" />
                  <span>Связаться</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <section class="section bg-white">
      <div class="container-custom">
        <!-- Loading State -->
        <div v-if="blogStore.loading" class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div class="lg:col-span-3 animate-pulse space-y-6">
              <div class="h-64 bg-gray-200 rounded-xl"></div>
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            <div class="animate-pulse space-y-6">
              <div class="h-48 bg-gray-200 rounded-xl"></div>
              <div class="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        <!-- Article Not Found -->
        <div v-else-if="!blogStore.currentPost" class="max-w-4xl mx-auto text-center py-20">
          <Icon name="ph:article" class="mx-auto text-gray-400 mb-6" size="80" />
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Статья не найдена</h2>
          <p class="text-gray-600 mb-8">
            Запрошенная статья не существует или была удалена.
          </p>
          <NuxtLink to="/blog" class="btn btn-primary">
            <Icon name="ph:arrow-left" class="mr-2" size="20" />
            Вернуться к блогу
          </NuxtLink>
        </div>

        <!-- Article Content -->
        <div v-else class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-3">
              <!-- Featured Image -->
              <div v-if="blogStore.currentPost.image" class="mb-12">
                <img 
                  :src="getImageUrl(blogStore.currentPost.image)"
                  :alt="blogStore.currentPost.title"
                  class="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                />
              </div>

              <!-- Article Body -->
              <div ref="articleContent" class="prose prose-lg max-w-none directus-content mb-12">
                <div v-html="blogStore.currentPost.content"></div>
              </div>

              <!-- CTA Section in Content -->
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-12 border border-primary-100">
                <div class="text-center">
                  <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ph:handshake" class="text-primary-600" size="32" />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-3">Получите персональную консультацию</h3>
                  <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Каждая ситуация уникальна. Наши эксперты помогут найти оптимальное решение именно для вас.
                  </p>
                  <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      @click="showConsultationModal = true"
                      class="btn btn-primary px-8 py-4 text-lg font-semibold"
                    >
                      <Icon name="ph:calendar-check" class="mr-2" size="24" />
                      Записаться на консультацию
                    </button>
                    <a
                      href="tel:+19362896191"
                      class="btn btn-outline px-8 py-4 text-lg font-semibold"
                    >
                      <Icon name="ph:phone" class="mr-2" size="24" />
                      Позвонить сейчас
                    </a>
                  </div>
                </div>
              </div>

              <!-- Article Footer -->
              <div class="pt-8 border-t border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-500">Поделиться:</span>
                    <div class="flex space-x-3">
                      <a 
                        :href="`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blogStore.currentPost.title)}`"
                        target="_blank"
                        class="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
                      >
                        <Icon name="ph:telegram-logo" size="24" />
                      </a>
                      <a 
                        :href="`https://wa.me/?text=${encodeURIComponent(blogStore.currentPost.title + ' ' + currentUrl)}`"
                        target="_blank"
                        class="text-gray-400 hover:text-green-500 transition-colors p-2 rounded-full hover:bg-green-50"
                      >
                        <Icon name="ph:whatsapp-logo" size="24" />
                      </a>
                      <button 
                        @click="copyLink"
                        class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
                        :title="linkCopied ? 'Скопировано!' : 'Копировать ссылку'"
                      >
                        <Icon :name="linkCopied ? 'ph:check' : 'ph:copy'" size="24" />
                      </button>
                    </div>
                  </div>
                  
                  <NuxtLink to="/blog" class="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                    <Icon name="ph:arrow-left" class="mr-1" size="18" />
                    Все статьи
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <!-- Contact Widget -->
              <div class="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 rounded-2xl mb-6 sticky lg:top-36 top-20">
                <div class="text-center">
                  <div class="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ph:chat-circle-dots" class="text-white" size="24" />
                  </div>
                  <h4 class="text-lg font-bold mb-2">Нужна помощь?</h4>
                  <p class="text-primary-100 text-sm mb-4">
                    Получите бесплатную консультацию эксперта
                  </p>
                  <button
                    @click="showConsultationModal = true"
                    class="w-full bg-white text-primary-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors mb-3"
                  >
                    Связаться с нами
                  </button>
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center justify-center">
                      <Icon name="ph:phone" class="mr-2" size="16" />
                      <a href="tel:+19362896191" class="hover:text-primary-200">+1 (936) 289-6191</a>
                    </div>
                    <div class="flex items-center justify-center">
                      <Icon name="ph:envelope" class="mr-2" size="16" />
                      <a href="mailto:main@barristercorp.com" class="hover:text-primary-200">main@barristercorp.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <h4 class="font-bold text-gray-800 mb-4 flex items-center">
                  <Icon name="ph:chart-line" class="mr-2 text-primary-600" size="20" />
                  BarristerCorp в цифрах
                </h4>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Успешных дел</span>
                    <span class="font-bold text-primary-600">5000+</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Лет опыта</span>
                    <span class="font-bold text-primary-600">15+</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Стран</span>
                    <span class="font-bold text-primary-600">50+</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Языков</span>
                    <span class="font-bold text-primary-600">10+</span>
                  </div>
                </div>
              </div>

              <!-- Related Services -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <h4 class="font-bold text-gray-800 mb-4 flex items-center">
                  <Icon name="ph:briefcase" class="mr-2 text-primary-600" size="20" />
                  Наши услуги
                </h4>
                <div class="space-y-3">
                  <NuxtLink to="/study" class="block text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors">
                    📚 Образование в США
                  </NuxtLink>
                  <NuxtLink to="/work" class="block text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors">
                    💼 Рабочие визы
                  </NuxtLink>
                  <NuxtLink to="/business" class="block text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors">
                    🏢 Бизнес иммиграция
                  </NuxtLink>
                  <NuxtLink to="/humanitarian" class="block text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors">
                    🤝 Гуманитарные программы
                  </NuxtLink>
                </div>
              </div>

              <!-- Quick Assessment -->
              <QuickAssessment @openConsultation="showConsultationModal = true" />
            </div>
          </div>

          <!-- Related Articles -->
          <div v-if="relatedPosts.length > 0" class="mt-20">
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Похожие статьи</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCard
                v-for="post in relatedPosts"
                :key="post.id"
                :title="post.title"
                :summary="post.summary"
                :imageUrl="getImageUrl(post.image)"
                :date="post.published_at"
                :category="getCategoryName(post.category)"
                :link="`/blog/${post.slug}`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Modal -->
    <div v-if="showConsultationModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          @click="showConsultationModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <Icon name="ph:x" size="24" />
        </button>
        
        <div class="text-center mb-6">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ph:chat-circle-dots" class="text-primary-600" size="32" />
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Бесплатная консультация</h3>
          <p class="text-gray-600">Обсудим вашу ситуацию и найдем оптимальное решение</p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-center space-x-4">
            <a
              href="tel:+19362896191"
              class="flex-1 bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center"
              @click="showConsultationModal = false"
            >
              <Icon name="ph:phone" class="mr-2" size="20" />
              Позвонить
            </a>
            <a
              href="mailto:main@barristercorp.com"
              class="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-semibold text-center hover:bg-gray-200 transition-colors flex items-center justify-center"
              @click="showConsultationModal = false"
            >
              <Icon name="ph:envelope" class="mr-2" size="20" />
              Email
            </a>
          </div>
          
          <div class="text-center text-sm text-gray-500">
            <p>Или запишитесь на удобное время:</p>
            <a href="https://calendly.com/barristercorp" target="_blank" class="text-primary-600 hover:text-primary-700 font-medium">
              Выбрать время для консультации →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useBlogStore } from '~/stores/blog'
import { useRoute } from 'vue-router'

const route = useRoute()
const blogStore = useBlogStore()
const linkCopied = ref(false)
const showConsultationModal = ref(false)
const articleContent = ref(null)
const emailSubscription = ref('')
const subscribing = ref(false)

const slug = computed(() => {
  if (Array.isArray(route.params.slug)) {
    return route.params.slug.join('/')
  }
  return route.params.slug
})

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

// Время чтения (примерно 120 слов в минуту)
const readingTime = computed(() => {
  if (!blogStore.currentPost?.content) return 0
  const wordsPerMinute = 120
  const textContent = blogStore.currentPost.content.replace(/<[^>]*>/g, '')
  const wordCount = textContent.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

// Похожие статьи (из той же категории)
const relatedPosts = computed(() => {
  if (!blogStore.currentPost) return []
  
  return blogStore.posts
    .filter(post => 
      post.id !== blogStore.currentPost.id && 
      post.category === blogStore.currentPost.category
    )
    .slice(0, 3)
})

// Получение названия категории
const getCategoryName = (categoryId) => {
  const category = blogStore.categories.find(cat => cat.id === categoryId)
  return category?.name || 'Без категории'
}

// Форматирование даты
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Получение URL изображения
const getImageUrl = (imageId) => {
  const config = useRuntimeConfig()
  return `${config.public.directusUrl}/assets/${imageId}?width=1200&height=600&fit=cover&format=webp`
}

// Копирование ссылки
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Ошибка копирования:', error)
  }
}

// Подписка на рассылку
const subscribeToNewsletter = async () => {
  if (!emailSubscription.value) return
  
  subscribing.value = true
  
  // Имитация отправки (можно заменить на реальный API)
  setTimeout(() => {
    subscribing.value = false
    emailSubscription.value = ''
    alert('Спасибо за подписку! Вы будете получать актуальную информацию об иммиграции.')
  }, 1000)
}

// SEO
watchEffect(() => {
  if (blogStore.currentPost) {
    const post = blogStore.currentPost
    const seoTitle = post.seo?.title || post.title
    const seoDescription = post.seo?.meta_description || post.summary
    
    useHead({
      title: `${seoTitle} | BarristerCorp`,
      meta: [
        {
          name: 'description',
          content: seoDescription
        },
        {
          property: 'og:title',
          content: seoTitle
        },
        {
          property: 'og:description',
          content: seoDescription
        },
        {
          property: 'og:image',
          content: post.seo?.og_image 
            ? `${useRuntimeConfig().public.directusUrl}/assets/${post.seo.og_image}`
            : getImageUrl(post.image)
        },
        {
          property: 'og:url',
          content: currentUrl.value
        },
        {
          property: 'article:published_time',
          content: post.published_at
        },
        {
          property: 'article:author',
          content: 'BarristerCorp'
        }
      ]
    })
  }
})

// Загрузка данных
onMounted(async () => {
  // Загружаем категории и текущую статью
  await Promise.all([
    blogStore.fetchCategories(),
    blogStore.fetchPostBySlug(slug.value)
  ])
  
  // Если статья найдена, загружаем все посты для похожих статей
  if (blogStore.currentPost) {
    await blogStore.fetchPosts()
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style> 