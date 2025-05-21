<template>
  <div class="py-2 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm">
    <div class="flex items-center space-x-4">
      <a 
        href="tel:+18001234567" 
        class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <Icon name="ph:phone" class="text-secondary-500 mr-1.5" size="18"/>
        <span>+1 (800) 123-4567</span>
      </a>
      <a 
        href="mailto:info@barristercorp.com" 
        class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <Icon name="ph:envelope" class="text-secondary-500 mr-1.5" size="18"/>
        <span>info@barristercorp.com</span>
      </a>
    </div>
    <div class="flex items-center space-x-3 mt-2 sm:mt-0">
      <button 
        @click="$emit('open-search')" 
        class="text-secondary-600 hover:text-primary-600 transition-colors p-2 hover:bg-primary-50 rounded-full"
      >
        <Icon name="ph:magnifying-glass" size="20" />
      </button>
      <NuxtLink 
        to="/contacts" 
        class="btn btn-primary btn-sm flex items-center"
      >
        <Icon name="ph:calendar" class="mr-2" size="18" />
        {{ $t('common.contactUs') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineEmits(['open-search']);
</script> 