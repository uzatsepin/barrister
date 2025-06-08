<template>
  <section class="py-20 bg-white relative">
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Как проходит процесс</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Прозрачный план работы с четкими этапами и сроками
          </p>
        </div>

        <!-- Process Steps -->
        <div class="relative">
          <!-- Process Line -->
          <div
            class="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-primary-400 to-primary-600 hidden md:block"
          ></div>

          <div class="space-y-12">
            <div
              v-for="(step, index) in serviceData.process"
              :key="step.title"
              class="flex items-start"
            >
              <!-- Step Number -->
              <div class="relative flex-shrink-0 mr-8">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                >
                  {{ index + 1 }}
                </div>
                <div
                  v-if="index < serviceData.process.length - 1"
                  class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                  <Icon name="ph:arrow-down" class="text-primary-400" size="24" />
                </div>
              </div>

              <!-- Step Content -->
              <div class="flex-1 bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-2xl font-bold text-gray-800">{{ step.title }}</h3>
                  <span class="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {{ step.duration }}
                  </span>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
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
</script> 