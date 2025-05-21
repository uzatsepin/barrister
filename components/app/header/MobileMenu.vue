<template>
  <div class="space-y-4 overflow-y-auto">
    <div v-for="menu in menuItems" :key="menu.key" class="space-y-2">
      <button 
        class="w-full text-left px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold flex items-center justify-between transition-colors duration-200"
        @click="toggleMenu(menu.key)"
      >
        <div class="flex items-center">
          <Icon :name="menu.icon" class="mr-2" size="20" />
          {{ $t(menu.label) }}
        </div>
        <Icon 
          name="ph:caret-down" 
          class="transition-transform duration-200" 
          :class="{ 'rotate-180': openMenus.includes(menu.key) }"
        />
      </button>

      <div 
        v-show="openMenus.includes(menu.key)" 
        class="pl-4 space-y-2 overflow-hidden transition-all duration-200"
      >
        <div v-for="submenu in menu.children" :key="submenu.label" class="space-y-1">
          <div class="font-semibold text-primary-600 px-4 py-1 flex items-center">
            <Icon :name="submenu.icon" class="mr-2" size="16" />
            {{ $t(submenu.label) }}
          </div>
          <NuxtLink 
            v-for="item in submenu.children" 
            :key="item.to"
            :to="item.to" 
            class="block px-4 py-1.5 text-sm text-secondary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors duration-200 flex items-center"
            @click="$emit('close')"
          >
            <Icon :name="item.icon || 'ph:arrow-right'" class="mr-2 opacity-60" size="16" />
            {{ $t(item.label) }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 my-4"></div>

    <NuxtLink 
      to="/blog" 
      class="block px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
      @click="$emit('close')"
    >
      <Icon name="ph:newspaper" class="mr-2" size="20" />
      {{ $t('header.blog') }}
    </NuxtLink>

    <NuxtLink 
      to="/contacts" 
      class="block px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
      @click="$emit('close')"
    >
      <Icon name="ph:phone-call" class="mr-2" size="20" />
      {{ $t('header.contacts') }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});

defineEmits(['close']);

const openMenus = ref([]);

const toggleMenu = (menuKey) => {
  const index = openMenus.value.indexOf(menuKey);
  if (index === -1) {
    openMenus.value.push(menuKey);
  } else {
    openMenus.value.splice(index, 1);
  }
};
</script> 