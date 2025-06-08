<template>
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p class="text-xl text-gray-600">
            Ответы на популярные вопросы о данной услуге
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in serviceData.faq"
            :key="index"
            class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-300 transition-colors"
          >
            <button
              @click="toggleFAQ(index)"
              class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 class="text-lg font-semibold text-gray-800 pr-4">
                {{ faq.question }}
              </h3>
              <Icon
                name="ph:caret-down"
                class="text-gray-500 transform transition-transform duration-300"
                :class="{ 'rotate-180': openFAQIndex === index }"
                size="20"
              />
            </button>
            <div
              v-show="openFAQIndex === index"
              class="px-6 pb-6 text-gray-600 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>

        <!-- CTA after FAQ -->
        <div class="text-center mt-16">
          <div class="bg-primary-50 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Не нашли ответ на ваш вопрос?
            </h3>
            <p class="text-gray-600 mb-6">
              Задайте вопрос нашему эксперту и получите персональную консультацию
            </p>
            <button
              @click="$emit('openContact')"
              class="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <Icon name="ph:chat-circle" class="mr-2" size="20" />
              Задать вопрос эксперту
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  serviceData: {
    type: Object,
    required: true
  }
});

defineEmits(['openContact']);

const openFAQIndex = ref(null);

const toggleFAQ = (index) => {
  openFAQIndex.value = openFAQIndex.value === index ? null : index;
};
</script> 