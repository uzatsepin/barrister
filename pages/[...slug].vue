<template>
  <div>
    <!-- Hero Section для Section Overview -->
    <section
      v-if="isSectonOverview"
      class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-primary-700/90 to-primary-900/90 z-10"></div>
      </div>
      
      <!-- Animated Background Elements -->
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
      
      <div class="container-custom relative z-20 py-20 md:py-28">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Breadcrumbs -->
          <nav class="mb-8">
            <ol class="flex items-center justify-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">{{ sectionData?.title || 'Секция' }}</span>
              </li>
            </ol>
          </nav>

          <!-- Section Content -->
          <div v-if="sectionData">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {{ sectionData.title }}
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              {{ getSectionDescription(sectionData.slug) }}
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">{{ sectionCategories.length }}</div>
                <div class="text-sm text-gray-200">{{ sectionCategories.length === 1 ? 'Категория' : 'Категорий' }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">{{ sectionPages.length }}</div>
                <div class="text-sm text-gray-200">{{ getPageWordForm(sectionPages.length) }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">15+</div>
                <div class="text-sm text-gray-200">Лет опыта</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">5000+</div>
                <div class="text-sm text-gray-200">Успешных дел</div>
              </div>
            </div>

            <!-- Quick CTA -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 class="text-xl font-semibold mb-3">Получите персональную консультацию</h3>
              <p class="text-gray-200 text-sm mb-4">Обсудите ваши планы с экспертом BarristerCorp</p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  @click="openContactModal"
                  class="bg-white text-primary-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Icon name="ph:calendar-check" class="mr-2" size="20" />
                  Записаться на консультацию
                </button>
                <a
                  href="tel:+19362896191"
                  class="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-800 transition-colors flex items-center justify-center"
                >
                  <Icon name="ph:phone" class="mr-2" size="20" />
                  Позвонить сейчас
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero Section для Category Overview -->
    <section
      v-else-if="isCategoryOverview"
      class="relative bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-800 text-white overflow-hidden"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-700/90 to-secondary-900/90 z-10"></div>
      </div>
      
      <!-- Animated Background Elements -->
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
      
      <div class="container-custom relative z-20 py-20 md:py-28">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Breadcrumbs -->
          <nav class="mb-8">
            <ol class="flex items-center justify-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <NuxtLink :to="`/${sectionData?.slug}`" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  {{ sectionData?.title || 'Секция' }}
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">{{ categoryData?.title || 'Категория' }}</span>
              </li>
            </ol>
          </nav>

          <!-- Category Content -->
          <div v-if="categoryData">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {{ categoryData.title }}
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
              {{ getCategoryDescription(categoryData.slug) }}
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">{{ categoryPages.length }}</div>
                <div class="text-sm text-gray-200">{{ getPageWordForm(categoryPages.length) }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">{{ sectionData?.title || 'Раздел' }}</div>
                <div class="text-sm text-gray-200">Основной раздел</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">15+</div>
                <div class="text-sm text-gray-200">Лет опыта</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div class="text-3xl font-bold mb-1">5000+</div>
                <div class="text-sm text-gray-200">Успешных дел</div>
              </div>
            </div>

            <!-- Quick CTA -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 class="text-xl font-semibold mb-3">Нужна персональная консультация?</h3>
              <p class="text-gray-200 text-sm mb-4">Обсудите ваши планы с экспертом BarristerCorp</p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  @click="openContactModal"
                  class="bg-white text-secondary-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Icon name="ph:calendar-check" class="mr-2" size="20" />
                  Записаться на консультацию
                </button>
                <a
                  href="tel:+19362896191"
                  class="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-secondary-800 transition-colors flex items-center justify-center"
                >
                  <Icon name="ph:phone" class="mr-2" size="20" />
                  Позвонить сейчас
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero Section для отдельных страниц (оригинальная) -->
    <section
      v-else
      class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden"
    >
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/20"></div>
        <div
          class="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900"
        ></div>
      </div>

      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/90 z-10"
        ></div>
        <NuxtImg
          ref="parallaxBg"
          src="/images/pages-bg.webp"
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
                  {{ $t("common.home") }}
                </NuxtLink>
              </li>
              <li
                v-for="(breadcrumb, index) in dynamicBreadcrumbs"
                :key="index"
                class="flex items-center"
              >
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <!-- Все промежуточные элементы и последний элемент как обычный текст -->
                <span 
                  :class="index === dynamicBreadcrumbs.length - 1 ? 'text-white font-medium' : 'text-gray-300'"
                >
                  {{ breadcrumb.label }}
                </span>
              </li>
            </ol>
          </nav>

          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            <span v-if="!loading">{{
              pageData?.name || pageData?.title || generateTitle()
            }}</span>
            <div v-else class="animate-pulse">
              <div class="h-12 md:h-16 bg-white/20 rounded w-3/4 mb-2"></div>
              <div class="h-12 md:h-16 bg-white/20 rounded w-1/2"></div>
            </div>
          </h1>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <button
              @click="openContactModal"
              class="btn bg-white text-primary-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="ph:chat-circle" class="mr-2" size="20" />
              {{ $t("common.getConsultation") }}
            </button>
            <button
              @click="scrollToContent"
              class="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              <Icon name="ph:arrow-down" class="mr-2" size="20" />
              {{ $t("common.learnMore") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ph:caret-down" class="text-white/60" size="24" />
      </div>
    </section>

    <!-- Categories Section для Section Overview -->
    <section v-if="isSectonOverview && sectionCategories.length > 0" class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Доступные категории</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите подходящую категорию для получения подробной информации
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            v-for="category in sectionCategories"
            :key="category.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            <div class="p-8">
              <div class="flex items-center mb-4">
                <div class="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <Icon :name="getCategoryIcon(category.slug)" class="text-primary-600" size="24" />
                </div>
                <h3 class="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {{ category.title }}
                </h3>
              </div>
              
              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ getCategoryDescription(category.slug) }}
              </p>

              <!-- Pages in Category -->
              <div class="space-y-2 mb-6">
                <div class="text-sm font-semibold text-gray-500 mb-3">
                  {{ getCategoryPages(category.id).length }} {{ getPageWordForm(getCategoryPages(category.id).length) }}:
                </div>
                <div class="space-y-1">
                  <NuxtLink
                    v-for="page in getCategoryPages(category.id).slice(0, 3)"
                    :key="page.id"
                    :to="`/${sectionData.slug}/${category.slug}/${page.slug}`"
                    class="block text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {{ page.title }}
                  </NuxtLink>
                  <div v-if="getCategoryPages(category.id).length > 3" class="text-sm text-gray-500 px-3 py-1">
                    +{{ getCategoryPages(category.id).length - 3 }} еще...
                  </div>
                </div>
              </div>

              <NuxtLink
                :to="`/${sectionData.slug}/${category.slug}`"
                class="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center group"
              >
                Подробнее
                <Icon name="ph:arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" size="20" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- All Pages Quick Access -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Все страницы раздела</h3>
            <p class="text-gray-600">Быстрый доступ ко всем материалам</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <NuxtLink
              v-for="page in sectionPages"
              :key="page.id"
              :to="`/${sectionData.slug}/${page.category_slug}/${page.slug}`"
              class="group flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <div class="bg-gray-100 group-hover:bg-primary-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors">
                <Icon name="ph:file-text" class="text-gray-600 group-hover:text-primary-600" size="18" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-800 group-hover:text-primary-600 transition-colors truncate">
                  {{ page.title }}
                </div>
                <div class="text-sm text-gray-500 truncate">
                  {{ getCategoryByPageId(page.category)?.title }}
                </div>
              </div>
              <Icon name="ph:arrow-right" class="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" size="16" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Pages Section для Category Overview -->
    <section v-if="isCategoryOverview && categoryPages.length > 0" class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Доступные материалы</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Подробная информация по каждому аспекту категории "{{ categoryData.title }}"
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="page in categoryPages"
            :key="page.id"
            :to="`/${sectionData.slug}/${categoryData.slug}/${page.slug}`"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            <div class="p-8">
              <div class="flex items-center mb-4">
                <div class="bg-secondary-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <Icon :name="getPageIcon(page.type)" class="text-secondary-600" size="24" />
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 group-hover:text-secondary-600 transition-colors leading-tight">
                    {{ page.title }}
                  </h3>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ getPageTypeName(page.type) }}
                  </div>
                </div>
              </div>
              
              <p v-if="page.seo?.meta_description" class="text-gray-600 mb-6 leading-relaxed">
                {{ page.seo.meta_description }}
              </p>
              <p v-else class="text-gray-600 mb-6 leading-relaxed">
                Подробная информация по теме "{{ page.title }}"
              </p>

              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>Подробнее</span>
                <Icon name="ph:arrow-right" class="group-hover:translate-x-1 transition-transform" size="16" />
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Back to Section -->
        <div class="text-center mt-16">
          <NuxtLink
            :to="`/${sectionData?.slug}`"
            class="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium text-lg"
          >
            <Icon name="ph:arrow-left" class="mr-2" size="20" />
            Вернуться к разделу "{{ sectionData?.title }}"
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Main Content для отдельных страниц (оригинальный) -->
    <section v-if="!isSectonOverview && !isCategoryOverview" ref="contentSection" class="section bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar Navigation -->
          <div class="lg:col-span-1">
            <div
              class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200"
            >
              <h3 class="text-xl font-bold text-secondary-800 mb-6 flex items-center">
                <Icon name="ph:list" class="mr-2 text-primary-600" size="24" />
                {{ $t("common.navigation") }}
              </h3>

              <div v-if="loading" class="animate-pulse space-y-3">
                <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                <div class="h-5 bg-gray-200 rounded w-full"></div>
                <div class="h-5 bg-gray-200 rounded w-5/6"></div>
                <div class="h-5 bg-gray-200 rounded w-4/6"></div>
                <div class="h-5 bg-gray-200 rounded w-full"></div>
                <div class="h-5 bg-gray-200 rounded w-3/5"></div>
              </div>

              <DynamicNavigation
                v-else
                :current-path="$route.path"
                :section="currentSection"
              />

              <!-- Quick Contact Card -->
              <div
                class="mt-8 bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200 shadow-sm"
              >
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon name="ph:headset" class="text-white" size="24" />
                  </div>
                  <h4 class="font-bold text-primary-700 mb-2">
                    {{ $t("common.needHelp") }}
                  </h4>
                  <p class="text-secondary-600 text-sm mb-4">
                    {{ $t("common.freeConsultation") }}
                  </p>
                  <button
                    @click="openContactModal"
                    class="btn btn-primary w-full text-sm font-semibold transform hover:scale-105 transition-all duration-200"
                  >
                    {{ $t("common.contactUs") }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="lg:col-span-3">
            <!-- Loading State -->
            <div v-if="loading" class="space-y-8">
              <UiContentLoader />
            </div>

            <!-- Actual Content -->
            <article v-else class="prose prose-lg max-w-none">
              <div
                v-if="pageData?.content"
                v-html="pageData.content"
                class="directus-content bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              ></div>

              <!-- Default content if no Directus data -->
              <div v-else class="space-y-8">
                <div
                  class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200"
                >
                  <h2
                    class="text-3xl font-bold text-secondary-800 mb-4 flex items-center"
                  >
                    <Icon
                      name="ph:graduation-cap"
                      class="mr-3 text-primary-600"
                      size="32"
                    />
                    {{ generateTitle() }}
                  </h2>
                  <p class="text-secondary-600 text-lg leading-relaxed">
                    {{ getDefaultDescription() }}
                  </p>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="feature in defaultFeatures"
                    :key="feature.title"
                    class="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div class="flex items-center mb-4">
                      <div
                        class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4"
                      >
                        <Icon :name="feature.icon" class="text-primary-600" size="24" />
                      </div>
                      <h3 class="text-xl font-semibold text-secondary-800">
                        {{ feature.title }}
                      </h3>
                    </div>
                    <p class="text-secondary-600">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section ref="contactSection" class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container-custom py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать путь к достижению цели?
          </h2>
          <p class="text-xl text-primary-100 mb-8">
            Наши эксперты помогут вам выбрать оптимальный путь и подготовить все необходимые документы
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openContactModal"
              class="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              <Icon name="ph:calendar-check" class="mr-2" size="24" />
              Бесплатная консультация
            </button>
            <a
              href="tel:+19362896191"
              class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors text-lg"
            >
              <Icon name="ph:phone" class="mr-2" size="24" />
              +1 (936) 289-6191
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

// Применяем middleware только к этой странице
definePageMeta({
  middleware: 'validate-section'
})

const route = useRoute();
const { t } = useI18n();

// Используем новый content composable
const { 
  menuStructure, 
  isContentLoading, 
  isAllContentLoaded,
  getBreadcrumbs, 
  getPageByPath,
  getSectionData,
  getCategoryData,
  loadContent
} = useContent();

// Используем контактный модал
const { openModal: openContactModal } = useContact();

// Refs for scrolling
const contentSection = ref(null);
const contactSection = ref(null);

// Page data
const pageData = ref(null);
const loading = ref(true);
const error = ref(null);

// Парсим URL структуру: /section/category/page
const urlParts = computed(() => {
  const slugArray = Array.isArray(route.params.slug)
    ? route.params.slug
    : [route.params.slug];
  return slugArray.filter(Boolean);
});

const sectionSlug = computed(() => urlParts.value[0] || "study");
const categorySlug = computed(() => urlParts.value[1] || null);
const pageSlug = computed(() => urlParts.value[2] || null);

// Определяем тип страницы
const isSectonOverview = computed(() => urlParts.value.length === 1);
const isCategoryOverview = computed(() => urlParts.value.length === 2);
const isPageDetail = computed(() => urlParts.value.length === 3);

// Определяем текущий раздел из URL
const currentSection = computed(() => sectionSlug.value);

// Данные из content store
const sectionData = computed(() => {
  return getSectionData(sectionSlug.value);
});

const categoryData = computed(() => {
  if (!categorySlug.value) return null;
  return getCategoryData(sectionSlug.value, categorySlug.value);
});

// Категории для текущей секции
const sectionCategories = computed(() => {
  return sectionData.value?.categories || [];
});

// Страницы для текущей секции
const sectionPages = computed(() => {
  if (!sectionData.value) return [];
  return sectionData.value.categories.flatMap(category => 
    category.pages.map(page => ({
      ...page,
      category_slug: category.slug
    }))
  );
});

// Страницы для текущей категории
const categoryPages = computed(() => {
  return categoryData.value?.pages || [];
});

// Получить страницы для конкретной категории
const getCategoryPages = (categoryId) => {
  const category = sectionCategories.value.find(cat => cat.id === categoryId);
  return category?.pages || [];
};

// Получить категорию по ID страницы
const getCategoryByPageId = (categoryId) => {
  return sectionCategories.value.find(cat => cat.id === categoryId);
};

// Описания секций
const getSectionDescription = (slug) => {
  const descriptions = {
    study: 'Образование в США — ваш путь к успешной карьере и новым возможностям',
    work: 'Трудоустройство в США — реализуйте свой профессиональный потенциал',
    business: 'Бизнес в США — создайте и развивайте свое дело в стране возможностей',
    humanitarian: 'Защита и статус — помощь в получении убежища и защиты в США',
    estate: 'Недвижимость в США — инвестируйте в американскую мечту'
  };
  return descriptions[slug] || 'Получите профессиональную помощь в достижении ваших целей';
};

// Описания категорий
const getCategoryDescription = (slug) => {
  const descriptions = {
    formats: 'Изучите различные форматы обучения в американских учебных заведениях и выберите подходящий вариант',
    courses: 'Языковые и профессиональные курсы для развития навыков и подготовки к поступлению',
    degree: 'Программы высшего образования и получения степеней в престижных университетах США',
    temporary: 'Временные рабочие визы для краткосрочного трудоустройства и стажировок',
    permanent: 'Постоянные рабочие визы и иммиграционные программы для долгосрочного проживания',
    employer: 'Визы для работодателей, инвесторов и предпринимателей',
    temp: 'Временные бизнес-визы и программы для развития бизнеса',
    perm: 'Постоянные инвестиционные визы для серьезных вложений',
    services: 'Дополнительные услуги и всесторонняя поддержка на всех этапах'
  };
  return descriptions[slug] || 'Подробная информация и профессиональная помощь по данной категории';
};

// Иконки для категорий
const getCategoryIcon = (slug) => {
  const icons = {
    formats: 'ph:graduation-cap',
    courses: 'ph:book-open',
    degree: 'ph:certificate',
    temporary: 'ph:clock',
    permanent: 'ph:user-check',
    employer: 'ph:buildings',
    temp: 'ph:briefcase',
    perm: 'ph:handshake',
    services: 'ph:gear'
  };
  return icons[slug] || 'ph:folder';
};

// Иконки для типов страниц
const getPageIcon = (type) => {
  const icons = {
    visa: 'ph:passport',
    program: 'ph:graduation-cap',
    service: 'ph:gear',
    info: 'ph:info',
    guide: 'ph:book-open'
  };
  return icons[type] || 'ph:file-text';
};

// Названия типов страниц
const getPageTypeName = (type) => {
  const names = {
    visa: 'Виза',
    program: 'Программа',
    service: 'Услуга',
    info: 'Информация',
    guide: 'Руководство'
  };
  return names[type] || 'Материал';
};

// Склонение слова "страница"
const getPageWordForm = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'страница';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'страницы';
  } else {
    return 'страниц';
  }
};

// Динамические хлебные крошки из меню
const dynamicBreadcrumbs = computed(() => {
  if (!isAllContentLoaded.value) return [];
  return getBreadcrumbs(route.path);
});

// Дефолтные особенности зависят от раздела
const defaultFeatures = computed(() => {
  const section = currentSection.value;
  const baseKey =
    section === "study"
      ? "study"
      : section === "work"
      ? "work"
      : section === "business"
      ? "business"
      : section === "humanitarian"
      ? "humanitarian"
      : section === "estate"
      ? "estate"
      : "common";

  return [
    {
      icon: "ph:certificate",
      title: t(`${baseKey}.feature1Title`),
      description: t(`${baseKey}.feature1Description`),
    },
    {
      icon: "ph:users",
      title: t(`${baseKey}.feature2Title`),
      description: t(`${baseKey}.feature2Description`),
    },
    {
      icon: "ph:clock",
      title: t(`${baseKey}.feature3Title`),
      description: t(`${baseKey}.feature3Description`),
    },
    {
      icon: "ph:shield-check",
      title: t(`${baseKey}.feature4Title`),
      description: t(`${baseKey}.feature4Description`),
    },
  ];
});

const processSteps = computed(() => {
  const section = currentSection.value;
  const baseKey =
    section === "study"
      ? "study"
      : section === "work"
      ? "work"
      : section === "business"
      ? "business"
      : section === "humanitarian"
      ? "humanitarian"
      : section === "estate"
      ? "estate"
      : "common";

  return [
    {
      title: "Консультация",
      description: "Определяем ваши цели и подбираем подходящие программы",
    },
    {
      title: "Подготовка",
      description: "Готовим все необходимые документы и переводы",
    },
    {
      title: "Подача",
      description: "Подаем документы в выбранные учебные заведения",
    },
    {
      title: "Виза",
      description: "Помогаем получить студенческую визу и готовимся к отъезду",
    },
  ];
});

// Methods
const generateTitle = () => {
  if (pageData.value?.title) return pageData.value.title;

  // Fallback на основе URL
  return pageSlug.value
    ? pageSlug.value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : sectionData.value?.title || 'Страница';
};

const getDefaultDescription = () => {
  const section = currentSection.value;
  return t(`${section}.defaultDescription`) || t("common.defaultDescription");
};

const scrollToContact = () => {
  openContactModal();
};

const scrollToContent = () => {
  contentSection.value?.scrollIntoView({ behavior: "smooth" });
};

const fetchPageData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Убеждаемся что контент загружен
    if (!isAllContentLoaded.value) {
      await loadContent();
    }

    // Если это section или category overview, просто показываем данные из store
    if (isSectonOverview.value || isCategoryOverview.value) {
      // Проверяем что section существует
      if (!sectionData.value) {
        throw createError({
          statusCode: 404,
          statusMessage: `Секция не найдена: ${route.path}`
        });
      }

      // Для category overview проверяем что category существует
      if (isCategoryOverview.value && !categoryData.value) {
        throw createError({
          statusCode: 404,
          statusMessage: `Категория не найдена: ${route.path}`
        });
      }

      // SEO для overview страниц
      const title = isCategoryOverview.value 
        ? `${categoryData.value.title} - ${sectionData.value.title} | BarristerCorp`
        : `${sectionData.value.title} | BarristerCorp`;
      
      const description = isCategoryOverview.value
        ? getCategoryDescription(categoryData.value.slug)
        : getSectionDescription(sectionData.value.slug);

      useHead({
        title,
        meta: [
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
        ],
      });

      loading.value = false;
      return;
    }

    // Для отдельных страниц - получаем из store
    const data = getPageByPath(
      sectionSlug.value,
      categorySlug.value,
      pageSlug.value
    );

    if (data) {
      pageData.value = data;

      // SEO Meta
      useHead({
        title: data.seo?.title || `${data.title || generateTitle()} | BarristerCorp`,
        meta: [
          {
            name: "description",
            content: data.seo?.meta_description || getDefaultDescription(),
          },
          {
            property: "og:title",
            content:
              data.seo?.title || `${data.title || generateTitle()} | BarristerCorp`,
          },
          {
            property: "og:description",
            content: data.seo?.meta_description || getDefaultDescription(),
          },
          {
            property: "og:image",
            content: "/images/default-og.jpg",
          },
        ],
      });
    } else {
      console.warn("Page not found:", route.path);
      // Если страница не найдена - показываем 404
      throw createError({
        statusCode: 404,
        statusMessage: `Страница не найдена: ${route.path}`
      });
    }
  } catch (err) {
    console.error("Error fetching page data:", err);
    error.value = err;

    // Если это не ошибка 404, то показываем fallback SEO
    if (err.statusCode !== 404) {
      useHead({
        title: `${generateTitle()} | BarristerCorp`,
        meta: [
          {
            name: "description",
            content: getDefaultDescription(),
          },
        ],
      });
    } else {
      // Для 404 пробрасываем ошибку дальше
      throw err;
    }
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchPageData();
});
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
