<template>
  <div class="text-center max-w-3xl mx-auto mb-16">
    <!-- Badge -->
    <div class="mb-6" v-if="badge">
      <UiSectionBadge data-aos="fade-down" data-aos-duration="800">
        <template #icon>
          <slot name="badge-icon" />
        </template>
        {{ badge }}
      </UiSectionBadge>
    </div>

    <!-- Title -->
    <div class="relative inline-block" data-aos="fade-up" data-aos-duration="1000">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 relative z-10">
        {{ title }}
      </h2>
      <!-- Decorative elements -->
      <div class="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl -skew-y-2 z-0"></div>
    </div>

    <!-- Subtitle -->
    <div 
      v-if="subtitle" 
      class="mt-6 relative"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <!-- Decorative line -->
      <div class="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-[2px] bg-primary-500/30"></div>
      <p class="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto pt-6">
        {{ subtitle }}
      </p>
    </div>

    <!-- Optional description -->
    <div 
      v-if="$slots.default"
      class="mt-6 text-secondary-600 prose prose-lg mx-auto"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.prose {
  max-width: 65ch;
}

/* Hover animation for title */
h2 {
  @apply transition-transform duration-300;
}

.relative:hover h2 {
  @apply -translate-y-0.5;
}

/* Hover animation for decorative background */
.relative:hover .bg-gradient-to-r {
  @apply skew-y-0 scale-105;
  transition: all 0.3s ease-out;
}
</style>