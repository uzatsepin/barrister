<template>
  <nav class="hidden lg:flex space-x-1">
    <div 
      v-for="(menu, index) in menuItems" 
      :key="index" 
      class="relative group"
      @mouseenter="handleMouseEnter(menu.key)"
      @mouseleave="handleMouseLeave"
    >
      <button 
        class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold flex items-center transition-colors duration-200"
        @click="handleMenuClick(menu.key)"
        :class="{ 'text-primary-700 bg-primary-50': activeMenu === menu.key }"
      >
        <Icon :name="menu.icon" class="mr-2" size="20" />
        {{ $t(menu.label) }}
        <Icon 
          name="ph:caret-down" 
          class="ml-1 transition-transform duration-200" 
          :class="{ 'rotate-180': activeMenu === menu.key }"
        />
      </button>
      
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div 
          v-if="activeMenu === menu.key"
          class="absolute top-full left-0 min-w-[280px] bg-white shadow-xl rounded-lg py-3 px-2 z-50 border border-gray-100"
        >
          <template v-for="(submenu, subIndex) in menu.children" :key="subIndex">
            <div class="px-2 py-1">
              <div class="font-semibold text-primary-600 mb-1.5 text-sm px-2 flex items-center">
                <Icon :name="submenu.icon" class="mr-2" size="16" />
                {{ $t(submenu.label) }}
              </div>
              <div v-for="(item, itemIndex) in submenu.children" :key="itemIndex" class="pl-2">
                <NuxtLink 
                  :to="item.to" 
                  class="block py-1.5 px-2 text-sm text-secondary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors duration-200 flex items-center"
                  @click="activeMenu = null"
                >
                  <Icon :name="item.icon || 'ph:arrow-right'" class="mr-2 opacity-60" size="16" />
                  {{ $t(item.label) }}
                </NuxtLink>
              </div>
            </div>
            <div v-if="subIndex < menu.children.length - 1" class="border-b border-gray-200 mx-2 my-1.5"></div>
          </template>
        </div>
      </transition>
    </div>
    
    <NuxtLink 
      to="/blog" 
      class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
    >
      <Icon name="ph:newspaper" class="mr-2" size="20" />
      {{ $t('header.blog') }}
    </NuxtLink>
    
    <NuxtLink 
      to="/contacts" 
      class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
    >
      <Icon name="ph:phone-call" class="mr-2" size="20" />
      {{ $t('header.contacts') }}
    </NuxtLink>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});

const activeMenu = ref(null);
let closeTimeout = null;

const handleMouseEnter = (menuKey) => {
  console.log('handleMouseEnter', menuKey);
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  activeMenu.value = menuKey;
};

const handleMouseLeave = () => {
  closeTimeout = setTimeout(() => {
    activeMenu.value = null;
  }, 150);
};

const handleMenuClick = (menuKey) => {
  console.log('handleMenuClick', menuKey);
  activeMenu.value = activeMenu.value === menuKey ? null : menuKey;
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.group')) {
    activeMenu.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (closeTimeout) {
    clearTimeout(closeTimeout);
  }
});
</script> 