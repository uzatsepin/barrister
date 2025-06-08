<template>
  <section
    class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div
      class="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-3xl"
    ></div>

    <div class="container-custom relative z-10">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full px-6 py-3 mb-6 font-semibold"
          >
            <Icon name="ph:package" class="mr-2" size="20" />
            Полная комплектация
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            Что входит в
            <span
              class="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
            >{{ serviceData.title }}</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Полный перечень того, что вы получите при заказе данной услуги. Никаких
            скрытых платежей!
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            v-for="item in serviceData.included"
            :key="item.title"
            class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2 relative overflow-hidden"
          >
            <!-- Hover Gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative z-10">
              <!-- Icon with Animation -->
              <div
                class="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <Icon
                  :name="item.icon"
                  class="text-green-600 group-hover:text-green-700"
                  size="28"
                />
              </div>

              <h3
                class="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300"
              >
                {{ item.title }}
              </h3>
              <p
                class="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
              >
                {{ item.description }}
              </p>

              <!-- Progress Bar Animation -->
              <div class="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Value Proposition -->
        <div
          class="bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute top-0 left-0 w-32 h-32 border border-white rounded-full"
            ></div>
            <div
              class="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"
            ></div>
            <div
              class="absolute bottom-10 left-1/4 w-16 h-16 border border-white rounded-full"
            ></div>
          </div>

          <div class="relative z-10">
            <h3 class="text-3xl md:text-4xl font-bold mb-4">
              💎 Общая стоимость услуг по отдельности:
              <span class="line-through opacity-75"
                >${{ Math.round(serviceData.price * 2.5) }}</span
              >
            </h3>
            <p class="text-xl mb-6 opacity-90">
              Вы экономите
              <span class="font-bold">${{ Math.round(serviceData.price * 1.5) }}</span>
              при покупке пакета!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="$emit('openContact')"
                class="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl"
              >
                <Icon name="ph:lightning" class="mr-2" size="20" />
                Заказать сейчас
              </button>
              <!-- <button
                class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                <Icon name="ph:calculator" class="mr-2" size="20" />
                Рассчитать экономию
              </button> -->
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

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style> 