<template>
  <div>
    <!-- Hero Section для Section Overview -->
    <SectionOverviewHero
      v-if="isSectonOverview"
      :section-data="sectionData"
      :section-categories="sectionCategories"
      :section-pages="sectionPages"
      :section-description="getSectionDescription(sectionData.slug)"
      :page-word-form="getPageWordForm(sectionPages.length)"
      @open-contact="openContactModal"
    />

    <!-- Hero Section для Category Overview -->
    <CategoryOverviewHero
      v-else-if="isCategoryOverview"
      :section-data="sectionData"
      :category-data="categoryData"
      :category-pages="categoryPages"
      :category-description="getCategoryDescription(categoryData.slug)"
      :page-word-form="getPageWordForm(categoryPages.length)"
      @open-contact="openContactModal"
    />

    <!-- Hero Section для отдельных страниц -->
    <PageDetailHero
      v-else
      :title="pageData?.name || pageData?.title || generateTitle()"
      :dynamic-breadcrumbs="dynamicBreadcrumbs"
      :loading="loading"
      @open-contact="openContactModal"
      @scroll-to-content="scrollToContent"
    />

    <!-- Categories Section для Section Overview -->
    <SectionCategories
      v-if="isSectonOverview && sectionCategories.length > 0"
      :section-data="sectionData"
      :section-categories="sectionCategories"
      :section-pages="sectionPages"
      :get-category-icon="getCategoryIcon"
      :get-category-description="getCategoryDescription"
      :get-category-pages="getCategoryPages"
      :get-page-word-form="getPageWordForm"
      :get-category-by-page-id="getCategoryByPageId"
    />

    <!-- Pages Section для Category Overview -->
    <CategoryPages
      v-if="isCategoryOverview && categoryPages.length > 0"
      :section-data="sectionData"
      :category-data="categoryData"
      :category-pages="categoryPages"
      :get-page-icon="getPageIcon"
      :get-page-type-name="getPageTypeName"
    />

    <!-- Main Content для отдельных страниц -->
    <PageContent
      v-if="!isSectonOverview && !isCategoryOverview"
      ref="pageContentRef"
      :page-data="pageData"
      :loading="loading"
      :current-path="$route.path"
      :current-section="currentSection"
      :title="generateTitle()"
      :default-description="getDefaultDescription()"
      :default-features="defaultFeatures"
      @open-contact="openContactModal"
    />

    <!-- Service Formats Section для отдельных страниц -->
    <ServiceFormats v-if="!isSectonOverview && !isCategoryOverview && pageData?.isVisa" />

    <!-- Contact Section -->
    <ContactSection 
      ref="contactSectionRef"
      @open-contact="openContactModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

// Импорт компонентов страниц
import SectionOverviewHero from "@/components/pages/SectionOverviewHero.vue";
import CategoryOverviewHero from "@/components/pages/CategoryOverviewHero.vue";
import PageDetailHero from "@/components/pages/PageDetailHero.vue";
import SectionCategories from "@/components/pages/SectionCategories.vue";
import CategoryPages from "@/components/pages/CategoryPages.vue";
import PageContent from "@/components/pages/PageContent.vue";
import ServiceFormats from "@/components/pages/ServiceFormats.vue";
import ContactSection from "@/components/pages/ContactSection.vue";

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
const pageContentRef = ref(null);
const contactSectionRef = ref(null);

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

const scrollToContent = () => {
  pageContentRef.value?.contentSection?.scrollIntoView({ behavior: "smooth" });
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

      const keywords = isCategoryOverview.value
        ? `${categoryData.value.title}, ${sectionData.value.title}, иммиграция США, BarristerCorp`
        : `${sectionData.value.title}, иммиграция США, виза в США, BarristerCorp`;

      // SEO Meta Tags
      useSeoMeta({
        title,
        description,
        keywords,
        author: 'BarristerCorp',
        robots: 'index, follow',
        
        // Open Graph
        ogTitle: title,
        ogDescription: description,
        ogImage: '/images/og-section.jpg',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogType: 'website',
        ogUrl: `https://barristercorp.com${route.path}`,
        ogSiteName: 'BarristerCorp',
        
        // Twitter Card
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: '/images/og-section.jpg'
      });

      // Additional head config with structured data
      useHead({
        title,
        link: [
          {
            rel: 'canonical',
            href: `https://barristercorp.com${route.path}`
          }
        ],
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': isCategoryOverview.value ? 'CollectionPage' : 'WebPage',
              name: title,
              description: description,
              url: `https://barristercorp.com${route.path}`,
              publisher: {
                '@type': 'Organization',
                name: 'BarristerCorp',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://barristercorp.com/images/logo.png'
                }
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: dynamicBreadcrumbs.value.map((breadcrumb, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: breadcrumb.label,
                  item: breadcrumb.url ? `https://barristercorp.com${breadcrumb.url}` : undefined
                }))
              },
              mainEntity: {
                '@type': 'Service',
                name: isCategoryOverview.value ? categoryData.value.title : sectionData.value.title,
                description: description,
                provider: {
                  '@type': 'Organization',
                  name: 'BarristerCorp'
                },
                areaServed: {
                  '@type': 'Country',
                  name: 'United States'
                }
              }
            })
          }
        ]
      });

      // OG Image for section/category pages
      defineOgImage({
        component: 'Section',
        props: {
          title: isCategoryOverview.value ? categoryData.value.title : sectionData.value.title,
          description: description,
          type: isCategoryOverview.value ? 'Категория' : 'Раздел',
          icon: isCategoryOverview.value ? getCategoryIcon(categoryData.value.slug) : getCategoryIcon(sectionData.value.slug),
          pagesCount: isCategoryOverview.value ? categoryPages.value.length : sectionPages.value.length
        }
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

      const pageTitle = data.seo?.title || `${data.title || generateTitle()} | BarristerCorp`;
      const pageDescription = data.seo?.meta_description || getDefaultDescription();
      const pageKeywords = data.seo?.keywords || `${data.title || generateTitle()}, ${sectionData.value?.title}, иммиграция США, виза в США, BarristerCorp`;

      // SEO Meta Tags
      useSeoMeta({
        title: pageTitle,
        description: pageDescription,
        keywords: pageKeywords,
        author: 'BarristerCorp',
        robots: 'index, follow',
        
        // Article specific meta for pages
        articleAuthor: 'BarristerCorp',
        articleSection: sectionData.value?.title,
        articleTag: [data.title || generateTitle(), sectionData.value?.title, 'иммиграция'],
        
        // Open Graph
        ogTitle: pageTitle,
        ogDescription: pageDescription,
        ogImage: data.image || '/images/default-og.jpg',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogType: 'article',
        ogUrl: `https://barristercorp.com${route.path}`,
        ogSiteName: 'BarristerCorp',
        
        // Twitter Card
        twitterCard: 'summary_large_image',
        twitterTitle: pageTitle,
        twitterDescription: pageDescription,
        twitterImage: data.image || '/images/default-og.jpg'
      });

      // Additional head config with structured data
      useHead({
        title: pageTitle,
        link: [
          {
            rel: 'canonical',
            href: `https://barristercorp.com${route.path}`
          }
        ],
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: data.title || generateTitle(),
              description: pageDescription,
              image: data.image || '/images/default-og.jpg',
              url: `https://barristercorp.com${route.path}`,
              datePublished: data.created_at || new Date().toISOString(),
              dateModified: data.updated_at || data.created_at || new Date().toISOString(),
              author: {
                '@type': 'Organization',
                name: 'BarristerCorp',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://barristercorp.com/images/logo.png'
                }
              },
              publisher: {
                '@type': 'Organization',
                name: 'BarristerCorp',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://barristercorp.com/images/logo.png'
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://barristercorp.com${route.path}`
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: dynamicBreadcrumbs.value.map((breadcrumb, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: breadcrumb.label,
                  item: breadcrumb.url ? `https://barristercorp.com${breadcrumb.url}` : undefined
                }))
              },
              about: {
                '@type': 'Service',
                name: data.title || generateTitle(),
                description: pageDescription,
                provider: {
                  '@type': 'Organization',
                  name: 'BarristerCorp'
                },
                areaServed: {
                  '@type': 'Country',
                  name: 'United States'
                }
              }
            })
          }
        ]
      });

      // OG Image for individual pages
      defineOgImage({
        component: 'PageDetail',
        props: {
          title: data.title || generateTitle(),
          description: pageDescription,
          section: sectionData.value?.title,
          category: categoryData.value?.title,
          type: data.isVisa ? 'Виза' : 'Информация',
          image: data.image
        }
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
      const fallbackTitle = `${generateTitle()} | BarristerCorp`;
      const fallbackDescription = getDefaultDescription();

      useSeoMeta({
        title: fallbackTitle,
        description: fallbackDescription,
        robots: 'noindex, nofollow',
        ogTitle: fallbackTitle,
        ogDescription: fallbackDescription
      });

      useHead({
        title: fallbackTitle,
        link: [
          {
            rel: 'canonical',
            href: `https://barristercorp.com${route.path}`
          }
        ]
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


