<template>
  <header class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="container-custom">
      <!-- Top Bar -->
      <TopBar @open-search="openSearch" />
      
      <!-- Main Navigation -->
      <div class="py-4 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center group">
          <span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300">
            BarristerCorp
          </span>
        </NuxtLink>
        
        <!-- Desktop Menu -->
        <MainNavigation :menu-items="mainMenuItems" />
        
        <button 
          @click="toggleMobileMenu" 
          class="lg:hidden text-secondary-600 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-full transition-colors"
        >
          <Icon :name="isMobileMenuOpen ? 'ph:x' : 'ph:list'" size="24" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden absolute w-full bg-white shadow-xl animate-slide-down border-t border-gray-200"
    >
      <div class="container-custom py-4">
        <MobileMenu 
          :menu-items="mainMenuItems" 
          @close="closeMobileMenu" 
        />
      </div>
    </div>
    
    <!-- Search Modal -->
    <SearchModal 
      :is-open="isSearchOpen"
      @close="closeSearch"
    />
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-[98px]"></div>
</template>

<script setup>
import { ref, provide } from 'vue';
import TopBar from './header/TopBar.vue';
import MainNavigation from './header/MainNavigation.vue';
import MobileMenu from './header/MobileMenu.vue';
import SearchModal from './header/SearchModal.vue';

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

// Provide these values to child components
provide('isMobileMenuOpen', isMobileMenuOpen);
provide('isSearchOpen', isSearchOpen);

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
  console.log('Opening search...');
  isSearchOpen.value = true;
  isMobileMenuOpen.value = false;
};

const closeSearch = () => {
  isSearchOpen.value = false;
};

const mainMenuItems = [
  {
    key: 'study',
    label: 'header.study',
    to: '/study',
    icon: 'ph:student',
    children: [
      {
        label: 'study.format',
        icon: 'ph:monitor',
        children: [
          { label: 'study.online', to: '/study/online', icon: 'ph:desktop' },
          { label: 'study.offline', to: '/study/offline', icon: 'ph:buildings' }
        ]
      },
      {
        label: 'study.courses',
        icon: 'ph:books',
        children: [
          { label: 'study.language', to: '/study/courses/language', icon: 'ph:translate' },
          { label: 'study.professional', to: '/study/courses/professional', icon: 'ph:certificate' }
        ]
      },
      {
        label: 'study.degree',
        icon: 'ph:graduation-cap',
        children: [
          { label: 'study.bachelor', to: '/study/degree/bachelor' },
          { label: 'study.master', to: '/study/degree/master' },
          { label: 'study.phd', to: '/study/degree/phd' }
        ]
      },
      {
        label: 'study.visa',
        icon: 'ph:identification-card',
        children: [
          { label: 'services.checklist', to: '/study/visa/checklist', icon: 'ph:check-square' },
          { label: 'services.selfService', to: '/study/visa/self-service', icon: 'ph:user-gear' },
          { label: 'services.paralegal', to: '/study/visa/paralegal', icon: 'ph:scales' },
          { label: 'services.attorney', to: '/study/visa/attorney', icon: 'ph:gavel' },
          { label: 'services.chatbot', to: '/study/visa/chatbot', icon: 'ph:robot' }
        ]
      }
    ]
  },
  {
    key: 'work',
    label: 'header.work',
    to: '/work',
    icon: 'ph:briefcase',
    children: [
      {
        label: 'work.temporary',
        icon: 'ph:clock',
        children: [
          { label: 'J-1', to: '/work/temporary/j1' },
          { label: 'O-1', to: '/work/temporary/o1' },
          { label: 'H-1B', to: '/work/temporary/h1b' },
          { label: 'R-1', to: '/work/temporary/r1' }
        ]
      },
      {
        label: 'work.permanent',
        icon: 'ph:house',
        children: [
          { label: 'EB-1', to: '/work/permanent/eb1' },
          { label: 'EB-2', to: '/work/permanent/eb2' },
          { label: 'EB-3', to: '/work/permanent/eb3' },
          { label: 'EB-4', to: '/work/permanent/eb4' }
        ]
      },
      {
        label: 'work.additional',
        icon: 'ph:plus-circle',
        children: [
          { label: 'work.qualified', to: '/work/employer/qualified' },
          { label: 'work.unqualified', to: '/work/employer/unqualified' }
        ]
      }
    ]
  },
  {
    key: 'business',
    label: 'header.business',
    to: '/business',
    icon: 'ph:buildings',
    children: [
      {
        label: 'business.tempVisa',
        icon: 'ph:clock',
        children: [
          { label: 'L-1', to: '/business/temp/l1' },
          { label: 'E-2', to: '/business/temp/e2' }
        ]
      },
      {
        label: 'business.permVisa',
        icon: 'ph:house',
        children: [
          { label: 'EB-1', to: '/business/perm/eb1' },
          { label: 'EB-5', to: '/business/perm/eb5' }
        ]
      },
      {
        label: 'business.additional',
        icon: 'ph:plus-circle',
        children: [
          { label: 'business.registration', to: '/business/services/registration', icon: 'ph:file-text' },
          { label: 'business.bankAccount', to: '/business/services/bank-account', icon: 'ph:bank' },
          { label: 'business.purchase', to: '/business/services/purchase', icon: 'ph:handshake' }
        ]
      }
    ]
  },
  {
    key: 'humanitarian',
    label: 'header.humanitarian',
    to: '/humanitarian',
    icon: 'ph:lifebuoy',
    children: [
      {
        label: 'humanitarian.title',
        icon: 'ph:heart',
        children: [
          { label: 'humanitarian.asylum', to: '/humanitarian/asylum', icon: 'ph:shield' },
          { label: 'humanitarian.refugee', to: '/humanitarian/refugee', icon: 'ph:users' },
          { label: 'humanitarian.tps', to: '/humanitarian/tps', icon: 'ph:flag' }
        ]
      }
    ]
  }
];
</script>