<template>
  <footer class="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -right-1/3 top-0 w-2/3 h-2/3 bg-gradient-to-br from-primary-500/5 to-primary-700/5 rounded-full blur-3xl"></div>
      <div class="absolute -left-1/3 bottom-0 w-2/3 h-2/3 bg-gradient-to-tr from-accent-500/5 to-accent-700/5 rounded-full blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
    </div>

    <!-- Main Content -->
    <div class="container-custom relative pt-20 pb-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-12 mb-16">
        <!-- Company Info -->
        <div class="lg:col-span-4" data-aos="fade-up">
          <div class="mb-8">
            <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300">
              BarristerCorp
            </h2>
            <p class="mt-4 text-gray-300 leading-relaxed">
              Barrister — это не «подача». Это путь.
            </p>  
            <p class="text-gray-300 leading-relaxed">
              С планом. С поддержкой. С результатом.
            </p>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <div class="flex items-center group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                <Icon name="ph:map-pin" class="text-primary-400" size="20" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-300">Адрес</h4>
                <p class="text-white">6939 3030 NorthWest ExpressWay, STE, 200B Oklahoma city, OK 73112 USA</p>
              </div>
            </div>

            <div class="flex items-center group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                <Icon name="ic:baseline-whatsapp" class="text-primary-400" size="20" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-300">Телефон</h4>
                <a href="https://api.whatsapp.com/send?phone=19362896191" class="text-white hover:text-primary-400 transition-colors">+1 (936) 289‑6191</a>
              </div>
            </div>

            <div class="flex items-center group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-primary-500/20 transition-colors">
                <Icon name="ph:envelope" class="text-primary-400" size="20" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-300">Email</h4>
                <a href="mailto:main@barristercorp.com" class="text-white hover:text-primary-400 transition-colors">main@barristercorp.com</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
          <h3 class="text-lg font-semibold mb-6 flex items-center">
            <Icon name="ph:graduation-cap" class="mr-2 text-primary-400" size="24" />
            {{ $t('header.study') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in studyLinks" :key="link.to">
              <NuxtLink 
                :to="link.to" 
                class="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-400/50 mr-2 group-hover:scale-150 transition-transform"></span>
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
          <h3 class="text-lg font-semibold mb-6 flex items-center">
            <Icon name="ph:briefcase" class="mr-2 text-primary-400" size="24" />
            {{ $t('header.work') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in workLinks" :key="link.to">
              <NuxtLink 
                :to="link.to" 
                class="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-400/50 mr-2 group-hover:scale-150 transition-transform"></span>
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2" data-aos="fade-up" data-aos-delay="300">
          <h3 class="text-lg font-semibold mb-6 flex items-center">
            <Icon name="ph:buildings" class="mr-2 text-primary-400" size="24" />
            {{ $t('header.business') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in businessLinks" :key="link.to">
              <NuxtLink 
                :to="link.to" 
                class="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-400/50 mr-2 group-hover:scale-150 transition-transform"></span>
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <!-- <div class="lg:col-span-2" data-aos="fade-up" data-aos-delay="400">
          <h3 class="text-lg font-semibold mb-6 flex items-center">
            <Icon name="ph:envelope" class="mr-2 text-primary-400" size="24" />
            Подписка
          </h3>
          <form @submit.prevent="subscribeNewsletter" class="space-y-3">
            <div class="relative">
              <input 
                type="email" 
                v-model="email"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ваш email"
                required
              />
            </div>
            <button 
              type="submit" 
              class="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center group"
            >
              <span>Подписаться</span>
              <Icon name="ph:paper-plane-right" class="ml-2 transform group-hover:translate-x-1 transition-transform" size="18" />
            </button>
          </form>
        </div> -->
      </div>

      <!-- Social Links -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <a 
          v-for="social in socialLinks" 
          :key="social.name"
          :href="social.url" 
          class="w-12 h-12 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.name"
        >
          <Icon :name="social.icon" class="text-white group-hover:text-primary-400 transition-colors" size="24" />
        </a>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10" data-aos="fade-up" data-aos-delay="500">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} BarristerCorp. {{ $t('footer.rights') }}
          </div>
          
          <div class="flex flex-wrap justify-center gap-6">
            <NuxtLink 
              v-for="link in legalLinks" 
              :key="link.to"
              :to="link.to" 
              class="text-gray-400 text-sm hover:text-primary-400 transition-colors"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const subscribeNewsletter = () => {
  // Newsletter subscription logic
  alert('Спасибо за подписку!');
  email.value = '';
};

const socialLinks = [
  { name: 'Telegram', icon: 'ph:telegram-logo', url: 'https://t.me/barristercorp_us' },
  { name: 'Instagram', icon: 'ph:instagram-logo', url: 'https://www.instagram.com/immigration_usa_angelika/' },
];

const studyLinks = [
  { label: 'study.online', to: '/study/online' },
  { label: 'study.offline', to: '/study/offline' },
  { label: 'study.language', to: '/study/courses/language' },
  { label: 'study.professional', to: '/study/courses/professional' }
];

const workLinks = [
  { label: 'work.temporary', to: '/work/temporary' },
  { label: 'work.permanent', to: '/work/permanent' },
  { label: 'work.qualified', to: '/work/employer/qualified' },
  { label: 'work.unqualified', to: '/work/employer/unqualified' }
];

const businessLinks = [
  { label: 'business.registration', to: '/business/services/registration' },
  { label: 'business.bankAccount', to: '/business/services/bank-account' },
  { label: 'business.purchase', to: '/business/services/purchase' }
];

const legalLinks = [
  { label: 'footer.privacy', to: '/privacy' },
  { label: 'footer.terms', to: '/terms' },
  { label: 'footer.legalInfo', to: '/legal' },
  { label: 'footer.sitemap', to: '/sitemap' }
];
</script>