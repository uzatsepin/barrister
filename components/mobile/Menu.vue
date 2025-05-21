<template>
  <div class="py-2">
    <div v-for="(menu, index) in menuItems" :key="index" class="border-b border-gray-100 last:border-b-0">
      <div 
        class="py-3 flex justify-between items-center cursor-pointer"
        @click="toggleSubmenu(menu.key)"
      >
        <span class="font-medium">{{ $t(menu.label) }}</span>
        <Icon 
          :name="openSubmenu === menu.key ? 'ph:caret-up' : 'ph:caret-down'" 
          size="20" 
          class="text-primary-600"
        />
      </div>
      
      <div v-if="openSubmenu === menu.key" class="pb-3 pl-4 animate-slide-down">
        <div v-for="(submenu, subIndex) in menu.children" :key="subIndex" class="mb-3">
          <div class="font-medium text-primary-600 mb-1">{{ $t(submenu.label) }}</div>
          <div v-for="(item, itemIndex) in submenu.children" :key="itemIndex" class="pl-2">
            <NuxtLink 
              :to="item.to" 
              class="block py-1 text-sm text-secondary-700 hover:text-primary-600"
              @click="$emit('close')"
            >
              {{ $t(item.label) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div class="py-3 border-b border-gray-100">
      <NuxtLink 
        to="/blog" 
        class="block font-medium text-secondary-700 hover:text-primary-600"
        @click="$emit('close')"
      >
        {{ $t('header.blog') }}
      </NuxtLink>
    </div>
    
    <div class="py-3">
      <NuxtLink 
        to="/contacts" 
        class="block font-medium text-secondary-700 hover:text-primary-600"
        @click="$emit('close')"
      >
        {{ $t('header.contacts') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});

defineEmits(['close']);

const openSubmenu = ref(null);

const toggleSubmenu = (key) => {
  if (openSubmenu.value === key) {
    openSubmenu.value = null;
  } else {
    openSubmenu.value = key;
  }
};
</script>