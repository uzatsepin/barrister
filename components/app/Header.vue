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
          <NuxtImg src="/logo.svg" alt="BarristerCorp" class="max-w-[140px]"/>
          <!-- <span
            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300"
          >
            BarristerCorp
          </span> -->
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
              href="https://api.whatsapp.com/send?phone=19362896191"
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

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

const { menuStructure, isContentLoading, isAllContentLoaded } = useContent()

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

provide("isMobileMenuOpen", isMobileMenuOpen);
provide("isSearchOpen", isSearchOpen);

const dynamicMenuItems = computed(() => {
  if (!isAllContentLoaded.value || menuStructure.value.length === 0) {
    return fallbackMenuItems
  }

  
  return menuStructure.value
    .sort((a, b) => {
      // Сортируем секции по order, затем по алфавиту
      const orderA = a.order || 0
      const orderB = b.order || 0
      
      if (orderA !== orderB) {
        return orderA - orderB
      }
      
      return a.title.localeCompare(b.title)
    })
    .map(section => ({
    key: section.slug,
    label: section.title,
    to: `/${section.slug}`,
    icon: getSectionIcon(section.slug),
    children: section.categories
      .filter(category => category.pages && category.pages.length > 0) // Показываем только категории с страницами
      .sort((a, b) => {
        // Сортируем категории по order, затем по алфавиту
        const orderA = a.order || 0
        const orderB = b.order || 0
        
        if (orderA !== orderB) {
          return orderA - orderB
        }
        
        return a.title.localeCompare(b.title)
      })
      .map(category => ({
        label: category.title,
        icon: getCategoryIcon(category.slug),
        children: category.pages
          .sort((a, b) => {
            // Сначала сортируем по order (по возрастанию)
            const orderA = a.order || 0
            const orderB = b.order || 0
            
            if (orderA !== orderB) {
              return orderA - orderB
            }
            
            // Если order одинаковый, сортируем по алфавиту
            return a.title.localeCompare(b.title)
          })
          .map(page => ({
            label: page.title,
            to: page.full_path,
            icon: getPageIcon(page.type)
          }))
      }))
  })).filter(section => section.children.length > 0) // Также убираем секции без категорий
})

const getSectionIcon = (slug) => {
  const icons = {
    study: 'ph:student',
    work: 'ph:briefcase',
    business: 'ph:buildings',
    humanitarian: 'ph:heart',
    estate: 'ph:house'
  }
  return icons[slug] || 'ph:folder'
}

const getCategoryIcon = (slug) => {
  const icons = {
    formats: 'ph:monitor',
    courses: 'ph:books',
    degree: 'ph:certificate',
    temporary: 'ph:clock',
    permanent: 'ph:user-check',
    employer: 'ph:buildings',
    temp: 'ph:briefcase',
    perm: 'ph:handshake',
    services: 'ph:gear'
  }
  return icons[slug] || 'ph:folder'
}

const getPageIcon = (type) => {
  const icons = {
    visa: 'ph:passport',
    program: 'ph:graduation-cap',
    service: 'ph:gear',
    info: 'ph:info',
    guide: 'ph:book-open'
  }
  return icons[type] || 'ph:file-text'
}

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


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isSearchOpen.value = false;
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const openSearch = () => {
  isSearchOpen.value = true;
  isMobileMenuOpen.value = false;
};

const closeSearch = () => {
  isSearchOpen.value = false;
};
</script>
