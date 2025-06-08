<template>
  <section
    class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden min-h-screen flex items-center"
  >
    <!-- Animated Background with Particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary-700/90 to-primary-900/90 z-10"
      ></div>

      <!-- Floating Elements -->
      <div
        class="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float-slow"
      ></div>
      <div
        class="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-float-medium"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float-fast"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-float-slow"
      ></div>

      <!-- Gradient Orbs -->
      <div
        class="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-slow"
        style="animation-delay: 2s"
      ></div>
    </div>

    <!-- Floating CTA Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="$emit('openContact')"
        class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 animate-bounce-gentle"
      >
        <Icon name="ph:rocket-launch" size="24" />
      </button>
    </div>

    <div class="container-custom relative z-20 py-20 md:py-28">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left">
            <!-- Category Badge -->
            <div
              class="inline-flex items-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 hover:bg-white/20 transition-all duration-300"
            >
              <Icon :name="serviceData.badge.icon" class="mr-2 text-white" size="20" />
              <span class="text-white font-semibold">{{ serviceData.badge.text }}</span>
            </div>
            <!-- Urgency Badge -->
            <div class="flex flex-col gap-4">
              <div
                class="w-fit flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-4 py-2 mb-4 animate-pulse-gentle"
              >
                <Icon name="ph:fire" class="mr-2" size="16" />
                <span class="text-sm font-bold">🔥 Ограниченное предложение</span>
              </div>
            </div>

            <!-- Title with Typing Effect -->
            <h1
              class="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {{ serviceData.title }}
            </h1>

            <p class="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {{ serviceData.subtitle }}
            </p>

            <!-- Social Proof -->
            <div class="flex items-center justify-center lg:justify-start gap-6 mb-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ animatedClients }}+</div>
                <div class="text-sm text-gray-300">Довольных клиентов</div>
              </div>
              <div class="w-px h-12 bg-white/30"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ animatedSuccess }}%</div>
                <div class="text-sm text-gray-300">Успешных дел</div>
              </div>
              <div class="w-px h-12 bg-white/30"></div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ animatedYears }}+</div>
                <div class="text-sm text-gray-300">Лет опыта</div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                @click="$emit('openContact')"
                class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 flex items-center justify-center"
              >
                <Icon name="ph:rocket-launch" class="mr-2" size="20" />
                {{ serviceData.ctaText }}
              </button>
              <button
                @click="$emit('scrollToDetails')"
                class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-700 transition-all duration-300 flex items-center justify-center"
              >
                <Icon name="ph:info" class="mr-2" size="20" />
                Подробнее
              </button>
            </div>
          </div>

          <!-- Right Content - Interactive Price Card -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <!-- Glowing Effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur-2xl opacity-30 animate-pulse-slow"
              ></div>

              <!-- Price Card -->
              <div
                class="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105"
              >
                <div class="text-center">
                  <!-- Special Offer Badge -->
                  <div
                    class="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full px-4 py-2 mb-4 font-bold text-sm"
                  >
                    💥 СКИДКА 30%
                  </div>

                  <!-- Price -->
                  <div class="mb-4">
                    <div class="flex items-center justify-center gap-2 mb-2">
                      <span class="text-2xl text-gray-400 line-through"
                        >${{ Math.round(serviceData.price * 1.3) }}</span
                      >
                      <span class="text-5xl font-black text-white"
                        >${{ serviceData.price }}</span
                      >
                    </div>
                    <div class="text-gray-300">{{ serviceData.priceNote }}</div>
                  </div>

                  <!-- Value Props -->
                  <div class="space-y-3 mb-6">
                    <div
                      v-for="feature in serviceData.keyFeatures"
                      :key="feature.title"
                      class="flex items-center text-left bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300"
                    >
                      <Icon
                        :name="feature.icon"
                        class="text-green-400 mr-3 flex-shrink-0"
                        size="20"
                      />
                      <span class="text-white font-medium">{{ feature.title }}</span>
                    </div>
                  </div>

                  <!-- Timer -->
                  <div
                    class="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6"
                  >
                    <div class="text-red-300 text-sm mb-1">
                      Предложение действует до:
                    </div>
                    <div class="text-white font-bold text-lg">{{ countdown }}</div>
                  </div>

                  <!-- Action Button -->
                  <button
                    @click="$emit('openContact')"
                    class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    🚀 Заказать сейчас
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button
        @click="$emit('scrollToDetails')"
        class="text-white/60 hover:text-white transition-colors"
      >
        <Icon name="ph:caret-down" size="32" />
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  serviceData: {
    type: Object,
    required: true
  },
  animatedClients: {
    type: Number,
    default: 0
  },
  animatedSuccess: {
    type: Number,
    default: 0
  },
  animatedYears: {
    type: Number,
    default: 0
  },
  countdown: {
    type: String,
    default: ''
  }
});

defineEmits(['openContact', 'scrollToDetails']);
</script>

<style scoped>
/* Floating Animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(270deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes pulse-gentle {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s ease-in-out infinite;
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style> 