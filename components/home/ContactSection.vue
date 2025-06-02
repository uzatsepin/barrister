<template>
  <section class="section bg-white relative overflow-hidden">
    <!-- Enhanced Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-primary-100 rounded-full blur-2xl"></div>
    </div>

    <!-- Decorative geometric shapes -->
    <div class="absolute top-20 right-20 w-4 h-4 bg-accent-400 rounded-full opacity-20 animate-bounce" style="animation-delay: 0.5s;"></div>
    <div class="absolute bottom-32 left-16 w-6 h-6 bg-primary-400 rotate-45 opacity-20 animate-bounce" style="animation-delay: 1.5s;"></div>
    <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-accent-500 rounded-full opacity-30 animate-pulse" style="animation-delay: 2s;"></div>

    <div class="container-custom relative">
      <UiSectionHeading 
        :title="$t('contact.title')" 
        :subtitle="$t('contact.description')" 
        badge="Свяжитесь с нами"
      >
        <template #badge-icon>
          <Icon name="ph:phone-call" class="w-4 h-4" />
        </template>
      </UiSectionHeading>
      
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative z-10 border border-gray-100 group hover:shadow-3xl transition-all duration-500" data-aos="fade-right">
            <!-- Gradient border effect -->
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            
            <div class="relative z-10">
              <div class="flex items-center mb-8">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ph:calendar-check" class="text-white" size="28" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-1">
                    {{ $t('contact.schedule') }}
                  </h3>
                  <p class="text-gray-600 text-sm">Заполните форму ниже</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Main Info Card -->
          <div class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group hover:shadow-3xl transition-all duration-500" data-aos="fade-left">
            <!-- Enhanced decorative background -->
            <div class="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute -left-20 -bottom-20 w-40 h-40 bg-accent-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700" style="transition-delay: 0.2s;"></div>
            <div class="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div class="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-300/50 rounded-full animate-pulse"></div>
            
            <div class="relative z-10">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                  <Icon name="ph:headset" class="text-white" size="24" />
                </div>
                <h3 class="text-2xl font-bold">{{ $t('contact.title') }}</h3>
              </div>
              
              <ul class="space-y-6">
                <li class="flex items-center group/item hover:translate-x-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="100">
                  <div class="w-14 h-14 min-w-14 min-h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg group-hover/item:bg-white/20 transition-colors duration-300">
                    <Icon name="ph:map-pin" class="text-white" size="24" />
                  </div>
                  <div>
                    <div class="text-white/80 text-sm mb-1 font-medium">Наш офис:</div>
                    <div class="font-semibold text-sm leading-tight">6939 3030 NorthWest ExpressWay, STE, 200B<br />Oklahoma city, OK 73112 USA</div>
                  </div>
                </li>
                
                <li class="flex items-center group/item hover:translate-x-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
                  <div class="w-14 h-14 min-w-14 min-h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg group-hover/item:bg-white/20 transition-colors duration-300">
                    <Icon name="ph:envelope" class="text-white" size="24" />
                  </div>
                  <div>
                    <div class="text-white/80 text-sm mb-1 font-medium">Email:</div>
                    <a href="mailto:main@barristercorp.com" class="font-semibold hover:text-accent-200 transition-colors duration-300">main@barristercorp.com</a>
                  </div>
                </li>
                
                <li class="flex items-center group/item hover:translate-x-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="300">
                  <div class="w-14 h-14 min-w-14 min-h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg group-hover/item:bg-white/20 transition-colors duration-300">
                    <Icon name="ic:baseline-whatsapp" class="text-white" size="24" />
                  </div>
                  <div>
                    <div class="text-white/80 text-sm mb-1 font-medium">Телефон:</div>
                    <a href="https://api.whatsapp.com/send?phone=19362896191" class="font-semibold hover:text-accent-200 transition-colors duration-300">+1 (936) 289‑6191</a>
                  </div>
                </li>
                
                <li class="flex items-center group/item hover:translate-x-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="400">
                  <div class="w-14 h-14 min-w-14 min-h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg group-hover/item:bg-white/20 transition-colors duration-300">
                    <Icon name="ph:clock" class="text-white" size="24" />
                  </div>
                  <div>
                    <div class="text-white/80 text-sm mb-1 font-medium">Режим работы:</div>
                    <div class="font-semibold text-sm">Пн-Пт: 9:00 - 18:00<br />Сб: 10:00 - 14:00</div>
                  </div>
                </li>
              </ul>
              
              <!-- Social Media -->
              <div class="mt-8" data-aos="fade-up" data-aos-delay="500">
                <div class="font-semibold mb-4 flex items-center">
                  <Icon name="ph:share-network" class="mr-2" size="20" />
                  Социальные сети:
                </div>
                <div class="flex space-x-3">
                  <a 
                    v-for="social in socialLinks" 
                    :key="social.name"
                    :href="social.url" 
                    class="w-12 h-12 min-w-12 min-h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent-500 hover:scale-110 transition-all duration-300 shadow-lg group/social"
                    target="_blank"
                    rel="noopener noreferrer"
                    :title="social.name"
                  >
                    <Icon :name="social.icon" size="20" class="group-hover/social:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions Card -->
          <div class="bg-gradient-to-br from-accent-500 to-accent-600 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500" data-aos="fade-up" data-aos-delay="600">
            <div class="absolute -right-16 -top-16 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                  <Icon name="ph:lightning" class="text-white" size="20" />
                </div>
                <h4 class="text-lg font-bold">Быстрая связь</h4>
              </div>
              
              <div class="space-y-3">
                <a 
                  href="https://api.whatsapp.com/send?phone=19362896191" 
                  class="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group/quick"
                  target="_blank"
                >
                  <Icon name="ic:baseline-whatsapp" class="mr-3 group-hover/quick:scale-110 transition-transform duration-300" size="20" />
                  <span class="font-medium">WhatsApp чат</span>
                  <Icon name="ph:arrow-right" class="ml-auto group-hover/quick:translate-x-1 transition-transform duration-300" size="16" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const socialLinks = [
  { name: 'Telegram', icon: 'ph:telegram-logo', url: 'https://t.me/barristercorp_us' },
  { name: 'Instagram', icon: 'ph:instagram-logo', url: 'https://www.instagram.com/immigration_usa_angelika/' },
  { name: 'YouTube', icon: 'ph:youtube-logo', url: 'https://www.youtube.com/@AngelikaFruman' },
];
</script>

<style scoped>
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover .animate-float {
  animation: float 3s ease-in-out infinite;
}
</style> 