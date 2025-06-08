<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Детали оплаты</h2>
          <p class="text-xl text-gray-600">
            Прозрачная стоимость без скрытых платежей и гибкие условия оплаты
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Main Price Card -->
          <div
            class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-200"
          >
            <div
              class="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white text-center"
            >
              <h3 class="text-2xl font-bold mb-2">{{ serviceData.title }}</h3>
              <div class="flex items-center justify-center mb-4">
                <span class="text-6xl font-black">${{ serviceData.price }}</span>
              </div>
              <p class="text-primary-100">{{ serviceData.priceDescription }}</p>
            </div>

            <div class="p-8">
              <!-- Payment Options -->
              <h4 class="text-xl font-bold text-gray-800 mb-6">Способы оплаты</h4>
              <div class="space-y-4 mb-8">
                <div
                  v-for="option in serviceData.paymentOptions"
                  :key="option.title"
                  class="flex items-center p-4 bg-gray-50 rounded-xl"
                >
                  <Icon name="ph:check-circle" class="text-green-500 mr-3" size="20" />
                  <div>
                    <div class="font-semibold text-gray-800">{{ option.title }}</div>
                    <div class="text-sm text-gray-600">{{ option.description }}</div>
                  </div>
                </div>
              </div>

              <!-- Guarantees -->
              <h4 class="text-xl font-bold text-gray-800 mb-6">Гарантии</h4>
              <div class="space-y-3">
                <div
                  v-for="guarantee in serviceData.guarantees"
                  :key="guarantee"
                  class="flex items-center"
                >
                  <Icon name="ph:shield-check" class="text-blue-500 mr-3" size="18" />
                  <span class="text-gray-700">{{ guarantee }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Card -->
          <div class="space-y-8">
            <!-- Quick Order -->
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">🚀 Быстрый заказ</h3>
              <p class="mb-6 opacity-90">
                Начните уже сегодня! Первая консультация в подарок при заказе в течение 24 часов.
              </p>
              <button
                @click="$emit('openContact')"
                class="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Заказать сейчас
              </button>
            </div>

            <!-- Contact Info -->
            <div class="bg-white rounded-3xl p-8 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 mb-4">💬 Остались вопросы?</h3>
              <p class="text-gray-600 mb-6">
                Свяжитесь с нами для персональной консультации
              </p>
              <div class="space-y-4">
                <a
                  href="tel:+19362896191"
                  class="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Icon name="ph:phone" class="text-blue-600 mr-3" size="20" />
                  <div>
                    <div class="font-semibold text-gray-800">Позвонить</div>
                    <div class="text-sm text-gray-600">+1 (936) 289-6191</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/19362896191"
                  class="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Icon name="ph:whatsapp-logo" class="text-blue-600 mr-3" size="20" />
                  <div>
                    <div class="font-semibold text-gray-800">Написать в WhatsApp</div>
                    <div class="text-sm text-gray-600">+1 (936) 289-6191</div>
                  </div>
                </a>
                
                <button
                  @click="$emit('openContact')"
                  class="w-full flex items-center justify-center p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                >
                  <Icon name="ph:chat-circle" class="text-primary-600 mr-3" size="20" />
                  <div>
                    <div class="font-semibold text-gray-800">Запрос на звонок</div>
                    <!-- <div class="text-sm text-gray-600">Бесплатная консультация</div> -->
                  </div>
                </button>
              </div>
            </div>
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