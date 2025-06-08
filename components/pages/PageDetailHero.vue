<template>
  <section
    class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden"
  >
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-black/20"></div>
      <div
        class="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900"
      ></div>
    </div>

    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/90 z-10"
      ></div>
      <NuxtImg
        ref="parallaxBg"
        src="/images/pages-bg.webp"
        alt="США"
        format="webp"
        class="w-full h-full object-cover scale-110 transform motion-safe:animate-subtle-zoom"
      />
    </div>

    <div class="container-custom relative z-10 py-20 md:py-28">
      <div class="max-w-4xl">
        <!-- Breadcrumbs -->
        <nav class="mb-6 animate-fade-in">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                {{ $t("common.home") }}
              </NuxtLink>
            </li>
            <li
              v-for="(breadcrumb, index) in dynamicBreadcrumbs"
              :key="index"
              class="flex items-center"
            >
              <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
              <!-- Все промежуточные элементы и последний элемент как обычный текст -->
              <span 
                :class="index === dynamicBreadcrumbs.length - 1 ? 'text-white font-medium' : 'text-gray-300'"
              >
                {{ breadcrumb.label }}
              </span>
            </li>
          </ol>
        </nav>

        <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
          <span v-if="!loading">{{ title }}</span>
          <div v-else class="animate-pulse">
            <div class="h-12 md:h-16 bg-white/20 rounded w-3/4 mb-2"></div>
            <div class="h-12 md:h-16 bg-white/20 rounded w-1/2"></div>
          </div>
        </h1>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
          <button
            @click="$emit('openContact')"
            class="btn bg-white text-primary-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Icon name="ph:chat-circle" class="mr-2" size="20" />
            {{ $t("common.getConsultation") }}
          </button>
          <button
            @click="$emit('scrollToContent')"
            class="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            <Icon name="ph:arrow-down" class="mr-2" size="20" />
            {{ $t("common.learnMore") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <Icon name="ph:caret-down" class="text-white/60" size="24" />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  title: {
    type: String,
    required: true
  },
  dynamicBreadcrumbs: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['openContact', 'scrollToContent']);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 