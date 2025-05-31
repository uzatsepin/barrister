<template>
  <header class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="container-custom">
      <!-- Top Bar - Hide on Mobile -->
      <div class="hidden sm:block">
        <TopBar @open-search="openSearch" />
      </div>

      <!-- Main Navigation -->
      <div class="py-3 sm:py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center group gap-2">
          <NuxtImg src="/logo.svg" alt="BarristerCorp" class="w-12 h-12" />
          <span
            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300"
          >
            BarristerCorp
          </span>
        </NuxtLink>

        <!-- Desktop Menu -->
        <MainNavigation
          :menu-items="dynamicMenuItems"
          @menu-hover="(item) => console.log('Menu hover:', item)"
          @menu-click="(item) => console.log('Menu click:', item)"
        />

        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-secondary-600 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-full transition-all duration-300"
          :class="{ transform: true }"
        >
          <div class="relative w-6 h-6">
            <div
              class="absolute inset-0 transition-all duration-300"
              :class="
                isMobileMenuOpen
                  ? 'opacity-0 rotate-180 scale-0'
                  : 'opacity-100 rotate-0 scale-100'
              "
            >
              <Icon name="ph:list-bold" size="24" />
            </div>
            <div
              class="absolute inset-0 transition-all duration-300"
              :class="
                isMobileMenuOpen
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 rotate-180 scale-0'
              "
            >
              <Icon name="ph:x-bold" size="24" />
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 bg-white z-40">
        <!-- Mobile Header -->
        <div
          class="h-[60px] sm:h-[98px] border-b border-gray-100 flex items-center justify-between px-4"
        >
          <NuxtLink to="/" class="flex items-center group" @click="closeMobileMenu">
            <span
              class="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300"
            >
              BarristerCorp
            </span>
          </NuxtLink>
          <button
            @click="closeMobileMenu"
            class="p-2 hover:bg-primary-50 rounded-full transition-colors"
          >
            <Icon name="ph:x-bold" class="text-secondary-600" size="24" />
          </button>
        </div>

        <!-- Mobile Menu Content -->
        <div
          class="container-custom h-[calc(100vh-60px)] sm:h-[calc(100vh-98px)] overflow-y-auto pb-safe"
        >
          <!-- Mobile Contact Info -->
          <div class="py-4 space-y-3 border-b border-gray-100">
            <a
              href="tel:+19362896191"
              class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mr-3"
              >
                <Icon name="ic:baseline-whatsapp" class="text-primary-500" size="20" />
              </div>
              <span class="font-medium">+1 (936) 289‑6191</span>
            </a>
            <a
              href="mailto:main@barristercorp.com"
              class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <div
                class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mr-3"
              >
                <Icon name="ph:envelope" class="text-primary-500" size="20" />
              </div>
              <span class="font-medium">main@barristercorp.com</span>
            </a>
          </div>

          <MobileMenu :menu-items="dynamicMenuItems" @close="closeMobileMenu" />

          <!-- Mobile Actions -->
          <div class="mt-6 space-y-4 pb-24">
            <button
              @click="openSearch"
              class="w-full bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <Icon name="ph:magnifying-glass" class="mr-2" size="20" />
              {{ $t("common.search") }}
            </button>
            <NuxtLink
              to="/contacts"
              class="w-full bg-primary-600 text-white hover:bg-primary-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              @click="closeMobileMenu"
            >
              <Icon name="ph:calendar" class="mr-2" size="20" />
              {{ $t("common.contactUs") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Search Modal -->
    <SearchModal :is-open="isSearchOpen" @close="closeSearch" />
  </header>

  <!-- Spacer for fixed header - Responsive -->
  <div class="h-[60px] sm:h-[98px]"></div>
</template>

<script setup>
import { ref, provide, onMounted, watch, computed } from "vue";
import TopBar from "./header/TopBar.vue";
import MainNavigation from "./header/MainNavigation.vue";
import MobileMenu from "./header/MobileMenu.vue";
import SearchModal from "./header/SearchModal.vue";

console.log("Header component initializing...");

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

// Используем composable для работы с меню
const { menuItems, loading: menuLoading, loadMenu, hasMenuData } = useMenu()

// Watch for mobile menu state to toggle body scroll
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Provide these values to child components
provide("isMobileMenuOpen", isMobileMenuOpen);
provide("isSearchOpen", isSearchOpen);

// Преобразуем формат меню из Directus в формат компонентов
const dynamicMenuItems = computed(() => {
  if (!hasMenuData.value) return fallbackMenuItems
  
  return menuItems.value.map(section => transformMenuSection(section))
})

// Функция для преобразования раздела меню
const transformMenuSection = (section) => {
  return {
    key: section.slug,
    label: section.title,
    to: `/${section.slug}`,
    icon: getSectionIcon(section.slug),
    children: section.categories?.map(category => transformMenuCategory(category, section.slug)) || []
  }
}

// Функция для преобразования категории меню
const transformMenuCategory = (category, sectionSlug) => {
  return {
    label: category.title,
    icon: getCategoryIcon(category.slug),
    children: category.pages?.map(page => ({
      label: page.title,
      to: page.full_path,
      icon: getPageIcon(page.type)
    })) || []
  }
}

// Функции для получения иконок (можно настроить по желанию)
const getSectionIcon = (sectionSlug) => {
  const icons = {
    study: 'ph:student',
    work: 'ph:briefcase', 
    business: 'ph:building-office',
    humanitarian: 'ph:shield-check',
    estate: 'ph:house'
  }
  return icons[sectionSlug] || 'ph:circle'
}

const getCategoryIcon = (categorySlug) => {
  const icons = {
    'formats': 'ph:monitor',
    'courses': 'ph:books',
    'degree': 'ph:graduation-cap',
    'temporary': 'ph:clock',
    'permanent': 'ph:calendar',
    'employer': 'ph:magnifying-glass',
    'temp': 'ph:lightning',
    'perm': 'ph:shield-check',
    'services': 'ph:gear',
    'humanitarian': 'ph:heart',
    'estate': 'ph:house'
  }
  return icons[categorySlug] || 'ph:folder'
}

const getPageIcon = (pageType) => {
  return pageType === 'page' ? 'ph:file-text' : 'ph:circle'
}

// Fallback меню на случай если Directus недоступен
const fallbackMenuItems = [
  {
    key: "study",
    label: "Учёба в США",
    to: "/study",
    icon: "ph:student",
    children: [
      {
        label: "Форматы обучения",
        icon: "ph:monitor",
        children: [
          { label: "Онлайн", to: "/study/formats/online", icon: "ph:desktop" },
          { label: "Оффлайн", to: "/study/formats/offline", icon: "ph:buildings" },
        ],
      },
      {
        label: "Курсы",
        icon: "ph:books",
        children: [
          { label: "Языковые курсы", to: "/study/courses/language", icon: "ph:translate" },
          { label: "Профессиональные курсы", to: "/study/courses/professional", icon: "ph:certificate" },
        ],
      },
    ],
  },
  {
    key: "work",
    label: "Работа в США",
    to: "/work",
    icon: "ph:briefcase",
    children: [
      {
        label: "Временная работа",
        icon: "ph:clock",
        children: [
          { label: "O-1 — Выдающиеся способности", to: "/work/temporary/o1", icon: "ph:star" },
          { label: "H-1B — Для специалистов", to: "/work/temporary/h1b", icon: "ph:graduation-cap" },
        ],
      },
    ],
  },
];

console.log("Dynamic menu items computed:", dynamicMenuItems);

const toggleMobileMenu = () => {
  console.log("Toggling mobile menu");
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isSearchOpen.value = false;
  }
};

const closeMobileMenu = () => {
  console.log("Closing mobile menu");
  isMobileMenuOpen.value = false;
};

const openSearch = () => {
  console.log("Opening search modal");
  isSearchOpen.value = true;
  isMobileMenuOpen.value = false;
};

const closeSearch = () => {
  console.log("Closing search modal");
  isSearchOpen.value = false;
};

onMounted(async () => {
  console.log("Header component mounted");
  
  // Загружаем меню при инициализации
  try {
    await loadMenu()
    console.log("Menu loaded successfully:", menuItems.value)
  } catch (error) {
    console.error("Failed to load menu, using fallback:", error)
  }
});
</script>
