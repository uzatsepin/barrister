<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <svg class="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="mb-6 animate-fade-in">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">Контакты</span>
              </li>
            </ol>
          </nav>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
                Свяжитесь 
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-200">
                  с нами
                </span>
              </h1>
              
              <p class="text-xl text-gray-200 mb-8 leading-relaxed">
                Получите профессиональную консультацию по вопросам иммиграции в США от экспертов с многолетним опытом
              </p>

              <!-- Quick Stats -->
              <div class="grid grid-cols-3 gap-6 mb-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-accent-300 mb-1">500+</div>
                  <div class="text-sm text-gray-300">Успешных дел</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-accent-300 mb-1">15+</div>
                  <div class="text-sm text-gray-300">Лет опыта</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-accent-300 mb-1">24/7</div>
                  <div class="text-sm text-gray-300">Поддержка</div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=19362896191" 
                  class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  target="_blank"
                >
                  <Icon name="ic:baseline-whatsapp" class="mr-2" size="20" />
                  WhatsApp
                </a>
                <a 
                  href="tel:+19362896191" 
                  class="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Icon name="ph:phone" class="mr-2" size="20" />
                  Позвонить
                </a>
              </div>
            </div>

            <!-- Contact Info Cards -->
            <div class="space-y-4">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div class="flex items-center mb-3">
                  <div class="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mr-4">
                    <Icon name="ph:map-pin" class="text-white" size="24" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">Офис в США</h3>
                    <p class="text-gray-300 text-sm">Oklahoma City, OK</p>
                  </div>
                </div>
                <p class="text-gray-200 text-sm">
                  6939 3030 NorthWest ExpressWay, STE, 200B Oklahoma city, OK 73112 USA
                </p>
              </div>

              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div class="flex items-center mb-3">
                  <div class="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mr-4">
                    <Icon name="ph:clock" class="text-white" size="24" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg">Режим работы</h3>
                    <p class="text-gray-300 text-sm">По времени США (CST)</p>
                  </div>
                </div>
                <div class="text-gray-200 text-sm space-y-1">
                  <p>Понедельник - Пятница: 9:00 - 18:00</p>
                  <p>Суббота: 10:00 - 14:00</p>
                  <p>Воскресенье: Выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Способы связи
          </h2>
          <p class="text-xl text-gray-600">
            Выберите удобный для вас способ связи
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <!-- WhatsApp -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="ic:baseline-whatsapp" class="text-green-600" size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">WhatsApp</h3>
            <p class="text-gray-600 text-sm mb-4 text-center">Быстрые ответы и консультации</p>
            <a 
              href="https://api.whatsapp.com/send?phone=19362896191" 
              class="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              target="_blank"
            >
              Написать
            </a>
          </div>

          <!-- Email -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="ph:envelope" class="text-blue-600" size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">Email</h3>
            <p class="text-gray-600 text-sm mb-4 text-center">Подробные консультации</p>
            <a 
              href="mailto:main@barristercorp.com" 
              class="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Написать
            </a>
          </div>

          <!-- Phone -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="ph:phone" class="text-purple-600" size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">Телефон</h3>
            <p class="text-gray-600 text-sm mb-4 text-center">Прямая связь с экспертом</p>
            <a 
              href="tel:+19362896191" 
              class="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Позвонить
            </a>
          </div>

          <!-- Telegram -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div class="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="ph:telegram-logo" class="text-cyan-600" size="32" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">Telegram</h3>
            <p class="text-gray-600 text-sm mb-4 text-center">Мгновенные сообщения</p>
            <a 
              href="https://t.me/barristercorp_us" 
              class="block w-full text-center bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
              target="_blank"
            >
              Написать
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="section bg-white">
      <div class="container-custom">
        <ContactForm />
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section bg-gray-50">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p class="text-xl text-gray-600">
              Ответы на популярные вопросы о наших услугах
            </p>
          </div>

          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button 
                @click="toggleFAQ(index)"
                class="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 class="text-lg font-semibold text-gray-900 pr-4">{{ faq.question }}</h3>
                <Icon 
                  name="ph:caret-down" 
                  class="text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': faq.isOpen }"
                  size="20" 
                />
              </button>
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.isOpen" class="px-6 pb-6">
                  <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SEO
useHead({
  title: 'Контакты | BarristerCorp - Профессиональная помощь в иммиграции в США',
  meta: [
    {
      name: 'description',
      content: 'Свяжитесь с экспертами BarristerCorp для получения консультации по визам, обучению и иммиграции в США. WhatsApp, телефон, email - выберите удобный способ связи.'
    },
    {
      property: 'og:title',
      content: 'Контакты | BarristerCorp'
    },
    {
      property: 'og:description',
      content: 'Профессиональная помощь в иммиграции в США. Свяжитесь с нами для консультации.'
    }
  ]
})

// FAQ data
const faqs = ref([
  {
    question: 'Сколько стоит консультация?',
    answer: 'Первичная консультация абсолютно бесплатная. Мы обсудим ваш случай, ответим на вопросы и предложим оптимальный план действий.',
    isOpen: false
  },
  {
    question: 'Как долго длится процесс получения визы?',
    answer: 'Сроки зависят от типа визы и индивидуальных обстоятельств. Туристические визы обычно оформляются за 2-4 недели, рабочие и учебные - от 1 до 6 месяцев.',
    isOpen: false
  },
  {
    question: 'Можете ли вы гарантировать получение визы?',
    answer: 'Мы не можем гарантировать 100% результат, так как окончательное решение принимает консульство. Однако наш опыт и профессионализм значительно повышают шансы на успех.',
    isOpen: false
  },
  {
    question: 'Работаете ли вы с клиентами из других стран?',
    answer: 'Да, мы работаем с клиентами по всему миру. Большинство консультаций проводится онлайн, что позволяет нам помогать людям независимо от их местоположения.',
    isOpen: false
  },
  {
    question: 'Какие документы нужны для начала работы?',
    answer: 'Базовый набор включает паспорт, фотографии, справки о доходах и образовании. Точный список зависит от типа визы и будет предоставлен после консультации.',
    isOpen: false
  }
])

const toggleFAQ = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}
</style>