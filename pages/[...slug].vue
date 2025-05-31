<template>
  <div>
    <!-- Hero Section -->
    <section
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
              @click="scrollToContact"
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

    <!-- Main Content -->
    <section ref="contentSection" class="section bg-white">
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
                    @click="scrollToContact"
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

            <!-- Interactive Elements -->
            <div class="mt-12 space-y-8">
              <!-- Statistics -->
              <div
                class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white"
              >
                <h3 class="text-2xl font-bold mb-6 text-center">Наши результаты</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">500+</div>
                    <div class="text-primary-100">Успешных кейсов</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">95%</div>
                    <div class="text-primary-100">Процент успеха</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">15+</div>
                    <div class="text-primary-100">Лет опыта</div>
                  </div>
                </div>
              </div>

              <!-- Process Steps -->
              <div class="bg-gray-50 rounded-xl p-8">
                <h3 class="text-2xl font-bold text-secondary-800 mb-8 text-center">
                  Как мы работаем?
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div
                    v-for="(step, index) in processSteps"
                    :key="index"
                    class="text-center"
                  >
                    <div
                      class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                    >
                      {{ index + 1 }}
                    </div>
                    <h4 class="font-semibold text-secondary-800 mb-2">
                      {{ step.title }}
                    </h4>
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
    <section
      ref="contactSection"
      class="section bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              {{ $t("contact.title") }}
            </h2>
            <p class="text-xl text-secondary-600">
              {{ $t("contact.subtitle") }}
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();
const { fetchPageByPath } = useDirectus();
const { getBreadcrumbs, loadMenu, hasMenuData } = useMenu();

// Refs for scrolling
const contentSection = ref(null);
const contactSection = ref(null);

// Page data from Directus
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
const categorySlug = computed(() => urlParts.value[1] || "formats");
const pageSlug = computed(() => urlParts.value[2] || "online");

// Определяем текущий раздел из URL
const currentSection = computed(() => sectionSlug.value);

// Динамические хлебные крошки из меню
const dynamicBreadcrumbs = computed(() => {
  if (!hasMenuData.value) return [];
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
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getDefaultDescription = () => {
  const section = currentSection.value;
  return t(`${section}.defaultDescription`) || t("common.defaultDescription");
};

const scrollToContact = () => {
  contactSection.value?.scrollIntoView({ behavior: "smooth" });
};

const scrollToContent = () => {
  contentSection.value?.scrollIntoView({ behavior: "smooth" });
};

const fetchPageData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Убеждаемся что меню загружено для хлебных крошек
    if (!hasMenuData.value) {
      await loadMenu();
    }

    // Fetch from Directus API using new 3-table structure
    const data = await fetchPageByPath(
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
      // Устанавливаем базовое SEO для страниц которых нет в Directus
      useHead({
        title: `${generateTitle()} | BarristerCorp`,
        meta: [
          {
            name: "description",
            content: getDefaultDescription(),
          },
        ],
      });
    }
  } catch (err) {
    console.error("Error fetching page data:", err);
    error.value = err;

    // Fallback SEO
    useHead({
      title: `${generateTitle()} | BarristerCorp`,
      meta: [
        {
          name: "description",
          content: getDefaultDescription(),
        },
      ],
    });
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
