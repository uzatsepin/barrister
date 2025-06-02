<template>
  <div
    class="py-2 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm"
  >
    <div class="flex items-center space-x-4">
      <a
        href="https://api.whatsapp.com/send?phone=19362896191"
        class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <Icon name="ic:baseline-whatsapp" class="text-secondary-500 mr-1.5" size="18" />
        <span>+1 (936) 289‑6191</span>
      </a>
      <a
        href="mailto:info@barristercorp.com"
        class="flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <Icon name="ph:envelope" class="text-secondary-500 mr-1.5" size="18" />
        <span>main@barristercorp.com</span>
      </a>
    </div>
    <div class="flex items-center space-x-4">
      <NuxtLink
        to="/blog"
        class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
      >
        <Icon name="ph:newspaper" class="mr-2" size="20" />
        Блог
      </NuxtLink>
      <a
        href="/#testimonials"
        class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
      >
        <Icon name="ph:star" class="mr-2" size="20" />
        Отзывы
      </a>
      <a
        href="/#about-company"
        class="px-4 py-2 text-secondary-700 hover:text-primary-700 hover:bg-primary-50 rounded-md font-semibold transition-colors duration-200 flex items-center"
      >
        <Icon name="ph:building" class="mr-2" size="20" />
        О компании
      </a>
    </div>
    <div class="flex items-center space-x-3 mt-2 sm:mt-0">
      <button
        @click="$emit('open-search')"
        class="text-secondary-600 hover:text-primary-600 transition-colors p-2 hover:bg-primary-50 rounded-full"
      >
        <Icon name="ph:magnifying-glass" size="20" />
      </button>
      <NuxtLink to="/contacts" class="btn btn-primary btn-sm flex items-center">
        <Icon name="ph:calendar" class="mr-2" size="18" />
        {{ $t("common.contactUs") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineEmits(["open-search"]);

</script>
