<template>
  <section ref="contactSection" class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
    <div class="container-custom py-16">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Готовы начать путь к достижению цели?
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Наши эксперты помогут вам выбрать оптимальный путь и подготовить все необходимые документы
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="$emit('openContact')"
            class="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            <Icon name="ph:calendar-check" class="mr-2" size="24" />
            Консультация эксперта
          </button>
          <a
            href="tel:+19362896191"
            class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors text-lg"
          >
            <Icon name="ph:phone" class="mr-2" size="24" />
            +1 (936) 289-6191
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

defineEmits(['openContact']);

const contactSection = ref(null);

defineExpose({
  contactSection
});
</script> 