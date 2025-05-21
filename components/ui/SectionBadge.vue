<template>
  <span 
    class="inline-flex items-center px-4 py-1.5 text-sm font-medium relative group"
    data-aos="fade-down"
    data-aos-duration="800"
  >
    <!-- Decorative line -->
    <div class="absolute -left-8 top-1/2 w-6 h-[1px] bg-primary-500/30"></div>
    <div class="absolute -right-8 top-1/2 w-6 h-[1px] bg-primary-500/30"></div>
    
    <!-- Icon -->
    <span 
      class="relative mr-2 text-primary-500 group-hover:scale-110 transition-transform duration-300"
    >
      <slot name="icon">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      </slot>
    </span>
    
    <!-- Text -->
    <span 
      class="relative text-primary-600 tracking-wider uppercase group-hover:text-primary-700 transition-colors duration-300"
    >
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script> 