<template>
  <div>
    <NuxtLink
      v-if="item.slug"
      :to="item.slug"
      class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
      :class="[
        isActive 
          ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600' 
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
      ]"
    >
      <Icon v-if="item.icon" :name="item.icon" class="mr-3" size="18" />
      <span>{{ item.label }}</span>
    </NuxtLink>
    
    <!-- Группа без ссылки -->
    <div 
      v-else
      class="flex items-center px-3 py-2 text-sm font-semibold text-gray-700"
    >
      <Icon v-if="item.icon" :name="item.icon" class="mr-3" size="18" />
      <span>{{ item.label }}</span>
    </div>
    
    <!-- Дочерние элементы -->
    <div v-if="item.children && item.children.length > 0" class="ml-4 mt-1 space-y-1">
      <NavigationItem 
        v-for="child in item.children" 
        :key="child.id"
        :item="child"
        :current-path="currentPath"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  currentPath: {
    type: String,
    required: true
  }
})

// Проверяем активность пункта меню
const isActive = computed(() => {
  if (!props.item.slug) return false
  
  // Точное совпадение
  if (props.item.slug === props.currentPath) return true
  
  // Проверяем дочерние элементы
  if (props.item.children && props.item.children.length > 0) {
    return props.item.children.some(child => 
      child.slug === props.currentPath || 
      (child.children && child.children.some(grandchild => grandchild.slug === props.currentPath))
    )
  }
  
  return false
})
</script> 