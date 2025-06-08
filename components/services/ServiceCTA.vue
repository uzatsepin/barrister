<template>
  <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
    <div class="container-custom py-16">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Готовы начать?</h2>
        <p class="text-xl text-primary-100 mb-8">
          {{ serviceData.finalCta.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="$emit('openContact')"
            class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg shadow-2xl"
          >
            <Icon name="ph:rocket-launch" class="mr-2" size="24" />
            {{ serviceData.finalCta.primaryButton }}
          </button>
          <a
            href="tel:+19362896191"
            class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors text-lg"
          >
            <Icon name="ph:phone" class="mr-2" size="24" />
            +1 (936) 289-6191
          </a>
        </div>

        <!-- Trust indicators -->
        <div class="mt-12 flex items-center justify-center gap-8 opacity-70">
          <div class="flex items-center">
            <Icon name="ph:shield-check" class="mr-2" size="20" />
            <span class="text-sm">100% конфиденциально</span>
          </div>
          <div class="flex items-center">
            <Icon name="ph:clock" class="mr-2" size="20" />
            <span class="text-sm">Быстрый ответ</span>
          </div>
          <div class="flex items-center">
            <Icon name="ph:star" class="mr-2" size="20" />
            <span class="text-sm">15+ лет опыта</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  serviceData: {
    type: Object,
    required: true
  }
});

defineEmits(['openContact']);
</script> 