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
          :menu-items="mainMenuItems"
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

          <MobileMenu :menu-items="mainMenuItems" @close="closeMobileMenu" />

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
import { ref, provide, onMounted, watch } from "vue";
import TopBar from "./header/TopBar.vue";
import MainNavigation from "./header/MainNavigation.vue";
import MobileMenu from "./header/MobileMenu.vue";
import SearchModal from "./header/SearchModal.vue";

console.log("Header component initializing...");

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

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

const mainMenuItems = [
  {
    key: "study",
    label: "header.study",
    to: "/study",
    icon: "ph:student",
    children: [
      {
        label: "Форматы обучения",
        icon: "ph:monitor",
        children: [
          { label: "Онлайн", to: "/study/online", icon: "ph:desktop" },
          { label: "Офлайн", to: "/study/offline", icon: "ph:buildings" },
        ],
      },
      {
        label: "Курсы",
        icon: "ph:books",
        children: [
          {
            label: "Языковые курсы",
            to: "/study/courses/language",
            icon: "ph:translate",
          },
          {
            label: "Профессиональные курсы",
            to: "/study/courses/professional",
            icon: "ph:certificate",
          },
          {
            label: "Высшее образование",
            to: "/study/courses/children",
            icon: "ph:graduation-cap",
          },
          {
            label: "Студенческие визы",
            to: "/study/courses/children",
            icon: "ph:identification-card",
          },
        ],
      },
      {
        label: "Академическая степень",
        icon: "ph:graduation-cap",
        children: [
          { label: "Bachelor (BA)", to: "/study/degree/bachelor" },
          { label: "Master (MBA)", to: "/study/degree/master" },
          { label: "PhD", to: "/study/degree/phd" },
        ],
      },
      {
        label: "study.visa",
        icon: "ph:identification-card",
        children: [
          { label: "Чек-лист", to: "/study/visa/checklist", icon: "ph:check-square" },
          { label: "Сделай сам", to: "/study/visa/self-service", icon: "ph:user-gear" },
          {
            label: "Сопровождение паралегала",
            to: "/study/visa/paralegal",
            icon: "ph:scales",
          },
          {
            label: "Сопровождение паралегала и адвоката",
            to: "/study/visa/attorney",
            icon: "ph:gavel",
          },
          { label: "Бот", to: "/study/visa/chatbot", icon: "ph:robot" },
        ],
      },
    ],
  },
  {
    key: "Работа в США",
    label: "header.work",
    to: "/work",
    icon: "ph:briefcase",
    children: [
      {
        label: "Временная работа",
        icon: "ph:clock",
        children: [
          { label: "O-1 — Выдающиеся способности", to: "/work/temporary/o1" },
          { label: "H-1B — Для специалистов", to: "/work/temporary/h1b" },
          { label: "R-1 — Религиозные работники", to: "/work/temporary/r1" },
          { label: "J-1 — Обмен и стажировка", to: "/work/temporary/j1" },
        ],
      },
      {
        label: "Постоянная работа",
        icon: "ph:house",
        children: [
          { label: "EB-1", to: "/work/permanent/eb1" },
          { label: "EB-2", to: "/work/permanent/eb2" },
          { label: "EB-3", to: "/work/permanent/eb3" },
          { label: "EB-4", to: "/work/permanent/eb4" },
        ],
      },
      {
        label: "Поиск работы",
        icon: "ph:plus-circle",
        children: [
          { label: "Квалифицированный труд", to: "/work/employer/qualified" },
          { label: "Неквалифицированный труд", to: "/work/employer/unqualified" },
        ],
      },
      {
        label: "Дополнительные услуги",
        icon: "ph:identification-card",
        children: [
          { label: "Чек-лист", to: "/study/visa/checklist", icon: "ph:check-square" },
          { label: "Сделай сам", to: "/study/visa/self-service", icon: "ph:user-gear" },
          {
            label: "Сопровождение паралегала",
            to: "/study/visa/paralegal",
            icon: "ph:scales",
          },
          {
            label: "Сопровождение паралегала и адвоката",
            to: "/study/visa/attorney",
            icon: "ph:gavel",
          },
          { label: "Бот", to: "/study/visa/chatbot", icon: "ph:robot" },
        ],
      },
    ],
  },
  {
    key: "Бизнес в США",
    label: "header.business",
    to: "/business",
    icon: "ph:buildings",
    children: [
      {
        label: "Временные визы",
        icon: "ph:clock",
        children: [
          { label: "L-1", to: "/business/temp/l1" },
          { label: "E-2", to: "/business/temp/e2" },
        ],
      },
      {
        label: "Постоянные визы",
        icon: "ph:house",
        children: [
          { label: "EB-1 (через бизнес)", to: "/business/perm/eb1" },
          { label: "EB-5 (инвестиционный)", to: "/business/perm/eb5" },
        ],
      },
      {
        label: "Дополнительный сервис",
        icon: "ph:plus-circle",
        children: [
          {
            label: "business.registration",
            to: "/business/services/registration",
            icon: "ph:file-text",
          },
          {
            label: "business.bankAccount",
            to: "/business/services/bank-account",
            icon: "ph:bank",
          },
          {
            label: "business.purchase",
            to: "/business/services/purchase",
            icon: "ph:handshake",
          },
        ],
      },
      {
        label: "Дополнительные услуги",
        icon: "ph:identification-card",
        children: [
          { label: "Чек-лист", to: "/study/visa/checklist", icon: "ph:check-square" },
          { label: "Сделай сам", to: "/study/visa/self-service", icon: "ph:user-gear" },
          {
            label: "Сопровождение паралегала",
            to: "/study/visa/paralegal",
            icon: "ph:scales",
          },
          {
            label: "Сопровождение паралегала и адвоката",
            to: "/study/visa/attorney",
            icon: "ph:gavel",
          },
          { label: "Бот", to: "/study/visa/chatbot", icon: "ph:robot" },
        ],
      },
    ],
  },
  {
    key: "humanitarian",
    label: "Защита и статус",
    to: "/humanitarian",
    icon: "ph:lifebuoy",
    children: [
      {
        label: "Защита и статус",
        icon: "ph:heart",
        children: [
          { label: "humanitarian.asylum", to: "/humanitarian/asylum", icon: "ph:shield" },
          {
            label: "humanitarian.refugee",
            to: "/humanitarian/refugee",
            icon: "ph:users",
          },
          { label: "humanitarian.tps", to: "/humanitarian/tps", icon: "ph:flag" },
        ],
      },
      {
        label: "Дополнительные услуги",
        icon: "ph:identification-card",
        children: [
          { label: "Чек-лист", to: "/study/visa/checklist", icon: "ph:check-square" },
          { label: "Сделай сам", to: "/study/visa/self-service", icon: "ph:user-gear" },
          {
            label: "Сопровождение паралегала",
            to: "/study/visa/paralegal",
            icon: "ph:scales",
          },
          {
            label: "Сопровождение паралегала и адвоката",
            to: "/study/visa/attorney",
            icon: "ph:gavel",
          },
          { label: "Бот", to: "/study/visa/chatbot", icon: "ph:robot" },
        ],
      },
    ],
  },
  {
    key: "estate",
    label: "Недвижимость в США",
    to: "/estate",
    icon: "ph:house",
    children: [
      {
        label: "Недвижимость в США",
        icon: "ph:heart",
        children: [
          { label: "Для инвестиций", to: "/estate/investment", icon: "ph:bank" },
          { label: "Для проживания", to: "/estate/life", icon: "ph:house" },
        ],
      },
      {
        label: "Дополнительные услуги",
        icon: "ph:identification-card",
        children: [
          { label: "Чек-лист", to: "/study/visa/checklist", icon: "ph:check-square" },
          { label: "Сделай сам", to: "/study/visa/self-service", icon: "ph:user-gear" },
          {
            label: "Сопровождение паралегала",
            to: "/study/visa/paralegal",
            icon: "ph:scales",
          },
          {
            label: "Сопровождение паралегала и адвоката",
            to: "/study/visa/attorney",
            icon: "ph:gavel",
          },
          { label: "Бот", to: "/study/visa/chatbot", icon: "ph:robot" },
        ],
      },
    ],
  },
];

console.log("Main menu items:", mainMenuItems);

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

onMounted(() => {
  console.log("Header component mounted");
});
</script>
