<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900"></div>
      </div>
      
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="mb-6 animate-fade-in">
            <ol class="flex items-center space-x-2 text-sm text-gray-200">
              <li>
                <NuxtLink to="/" class="hover:text-white transition-colors">
                  {{ $t('common.home') }}
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2" size="16" />
                <NuxtLink to="/study" class="hover:text-white transition-colors">
                  {{ $t('study.title') }}
                </NuxtLink>
              </li>
              <li v-for="(segment, index) in breadcrumbs" :key="index" class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2" size="16" />
                <span class="text-white capitalize">{{ segment }}</span>
              </li>
            </ol>
          </nav>
          
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            {{ pageData?.name || generateTitle() }}
          </h1>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <button 
              @click="scrollToContact"
              class="btn bg-white text-primary-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="ph:chat-circle" class="mr-2" size="20" />
              {{ $t('common.getConsultation') }}
            </button>
            <button 
              @click="scrollToContent"
              class="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              <Icon name="ph:arrow-down" class="mr-2" size="20" />
              {{ $t('common.learnMore') }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ph:caret-down" class="text-white/60" size="24" />
      </div>
    </section>

    <!-- Main Content -->
    <section ref="contentSection" class="section bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar Navigation -->
          <div class="lg:col-span-1">
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
              <h3 class="text-xl font-bold text-secondary-800 mb-6 flex items-center">
                <Icon name="ph:list" class="mr-2 text-primary-600" size="24" />
                {{ $t('common.navigation') }}
              </h3>
              
              <StudyNavigation :current-path="$route.path" />
              
              <!-- Quick Contact Card -->
              <div class="mt-8 bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200 shadow-sm">
                <div class="text-center">
                  <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="ph:headset" class="text-white" size="24" />
                  </div>
                  <h4 class="font-bold text-primary-700 mb-2">{{ $t('common.needHelp') }}</h4>
                  <p class="text-secondary-600 text-sm mb-4">{{ $t('common.freeConsultation') }}</p>
                  <button 
                    @click="scrollToContact"
                    class="btn btn-primary w-full text-sm font-semibold transform hover:scale-105 transition-all duration-200"
                  >
                    {{ $t('common.contactUs') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Content Area -->
          <div class="lg:col-span-3">
            <!-- Content from Directus -->
            <article class="prose prose-lg max-w-none">
              <div v-if="pageData?.content" v-html="pageData.content" class="directus-content bg-white p-8 rounded-xl shadow-sm border border-gray-100"></div>
              
              <!-- Default content if no Directus data -->
              <div v-else class="space-y-8">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                  <h2 class="text-3xl font-bold text-secondary-800 mb-4 flex items-center">
                    <Icon name="ph:graduation-cap" class="mr-3 text-primary-600" size="32" />
                    {{ generateTitle() }}
                  </h2>
                  <p class="text-secondary-600 text-lg leading-relaxed">
                    {{ $t('study.defaultDescription') }}
                  </p>
                </div>
                
                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="feature in defaultFeatures" :key="feature.title" 
                       class="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex items-center mb-4">
                      <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon :name="feature.icon" class="text-primary-600" size="24" />
                      </div>
                      <h3 class="text-xl font-semibold text-secondary-800">{{ feature.title }}</h3>
                    </div>
                    <p class="text-secondary-600">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </article>
            
            <!-- Interactive Elements -->
            <div class="mt-12 space-y-8">
              <!-- Statistics -->
              <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
                <h3 class="text-2xl font-bold mb-6 text-center">{{ $t('study.ourResults') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">500+</div>
                    <div class="text-primary-100">{{ $t('study.successfulCases') }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">95%</div>
                    <div class="text-primary-100">{{ $t('study.successRate') }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">10+</div>
                    <div class="text-primary-100">{{ $t('study.yearsExperience') }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Process Steps -->
              <div class="bg-gray-50 rounded-xl p-8">
                <h3 class="text-2xl font-bold text-secondary-800 mb-8 text-center">{{ $t('study.ourProcess') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div v-for="(step, index) in processSteps" :key="index" class="text-center">
                    <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {{ index + 1 }}
                    </div>
                    <h4 class="font-semibold text-secondary-800 mb-2">{{ step.title }}</h4>
                    <p class="text-secondary-600 text-sm">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section ref="contactSection" class="section bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              {{ $t('contact.title') }}
            </h2>
            <p class="text-xl text-secondary-600">
              {{ $t('contact.subtitle') }}
            </p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
const { fetchStudyPage } = useDirectus()

// Refs for scrolling
const contentSection = ref(null)
const contactSection = ref(null)

// Page data from Directus
const pageData = ref(null)
const loading = ref(true)
const error = ref(null)

// Computed properties
const breadcrumbs = computed(() => {
  if (!route.params.slug) return []
  const slugArray = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
  return slugArray.map(segment => segment.replace(/-/g, ' '))
})

const defaultFeatures = computed(() => [
  {
    icon: 'ph:certificate',
    title: t('study.feature1Title'),
    description: t('study.feature1Description')
  },
  {
    icon: 'ph:users',
    title: t('study.feature2Title'),
    description: t('study.feature2Description')
  },
  {
    icon: 'ph:clock',
    title: t('study.feature3Title'),
    description: t('study.feature3Description')
  },
  {
    icon: 'ph:shield-check',
    title: t('study.feature4Title'),
    description: t('study.feature4Description')
  }
])

const processSteps = computed(() => [
  {
    title: t('study.step1Title'),
    description: t('study.step1Description')
  },
  {
    title: t('study.step2Title'),
    description: t('study.step2Description')
  },
  {
    title: t('study.step3Title'),
    description: t('study.step3Description')
  },
  {
    title: t('study.step4Title'),
    description: t('study.step4Description')
  }
])

// Methods
const generateTitle = () => {
  if (!route.params.slug) return t('study.title')
  
  const slugArray = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
  const lastSegment = slugArray[slugArray.length - 1]
  
  // Convert slug to readable title
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const scrollToContact = () => {
  contactSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContent = () => {
  contentSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const fetchPageData = async () => {
  try {
    loading.value = true
    
    // Build the slug path
    const slugArray = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
    const slugPath = slugArray.join('/')
    
    // Fetch from Directus API using composable
    const data = await fetchStudyPage(slugPath)
    
    if (data) {
      pageData.value = data
      
      useHead({
        title: data.seo?.title || `${data.name || data.title || generateTitle()} | BarristerCorp`,
        meta: [
          {
            name: 'description',
            content: data.seo?.meta_description || t('study.defaultMetaDescription')
          },
          {
            property: 'og:title',
            content: data.seo?.title || `${data.name || data.title || generateTitle()} | BarristerCorp`
          },
          {
            property: 'og:description',
            content: data.seo?.meta_description || t('study.defaultMetaDescription')
          },
          {
            property: 'og:image',
            content: '/images/default-study-og.jpg'
          }
        ]
      })
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchPageData()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.delay-200 {
  animation-delay: 0.2s;
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 