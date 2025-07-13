<template>
  <section class="py-24 bg-white relative overflow-hidden" id="about-company">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -right-1/4 bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h4 class="text-primary-600 font-semibold mb-2">О компании</h4>
        <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-6">
          Barrister — международное сообщество экспертов
        </h2>
        <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
          Работаем только с проверенными специалистами США для достижения ваших иммиграционных целей
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <!-- Feature Card 1 -->
        <div 
          class="group bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="100"
          @mouseenter="activeCard = 0"
          @mouseleave="activeCard = null"
        >
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 min-w-16 min-h-16 bg-primary-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-primary-900">Только США. Только проверенные специалисты.</h3>
          </div>
          <div class="space-y-4 text-secondary-700">
            <p>
              <strong class="text-primary-600">Barrister</strong> — это международное сообщество ведущих иммиграционных экспертов, и в его рамках я работаю исключительно с теми, кто профессионально сопровождает процессы именно в США.
            </p>
            <div class="bg-white/70 rounded-lg p-4 border-l-4 border-primary-500">
              <p class="text-sm">
                Здесь нет случайных участников — только компании и адвокаты, которые доказали свою квалификацию и качество на практике: успешными кейсами, безупречной репутацией и прозрачной работой с клиентами.
              </p>
            </div>
            <p class="font-medium text-primary-700">
              Если в вашем кейсе нужна дополнительная проверка, сложная стратегия или участие лицензированного адвоката из США — я подключаю коллег из сети Barrister.
            </p>
          </div>
        </div>

        <!-- Feature Card 2 -->
        <div 
          class="group bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="200"
          @mouseenter="activeCard = 1"
          @mouseleave="activeCard = null"
        >
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 min-w-16 min-h-16 bg-accent-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:strategy" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-accent-900">Мы делаем больше, чем просто визы</h3>
          </div>
          <div class="space-y-4 text-secondary-700">
            <p>
              Иммиграция в США — это не просто анкеты и формы. Это <strong class="text-accent-600">долгосрочное решение</strong>, которое влияет на семью, карьеру, будущее. Поэтому подход здесь другой:
            </p>
            <div class="bg-white/70 rounded-lg p-4 border-l-4 border-accent-500">
              <p class="text-sm">
                Мы не просто готовим документы — мы выстраиваем стратегию. Так, чтобы вы не остались без статуса через полгода. Чтобы не оказались в тупике с визой. Чтобы с самого начала двигались правильно.
              </p>
            </div>
          </div>
        </div>

        <!-- Feature Card 3 -->
        <div 
          class="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="300"
          @mouseenter="activeCard = 2"
          @mouseleave="activeCard = null"
        >
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 min-w-16 min-h-16 bg-secondary-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:user-focus" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-secondary-900">Только то, что нужно именно вам</h3>
          </div>
          <div class="space-y-4 text-secondary-700">
            <p>
              У каждого клиента — свой уровень подготовки, цели и бюджет. Поэтому в <strong class="text-secondary-600">Barrister</strong> и в моей практике нет универсального варианта.
            </p>
            <div class="space-y-3">
              <div class="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                <Icon name="ph:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p class="text-sm">Кому-то подойдёт самостоятельная подача с грамотной проверкой</p>
              </div>
              <div class="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                <Icon name="ph:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p class="text-sm">Кому-то — сопровождение паралигала</p>
              </div>
              <div class="flex items-start gap-3 bg-white/70 rounded-lg p-3">
                <Icon name="ph:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p class="text-sm">А кто-то хочет, чтобы всё оформлял адвокат</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Stats Section -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12" data-aos="fade-up">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="group">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:users-three" class="w-10 h-10 text-white" />
            </div>
            <div class="text-3xl font-bold text-white mb-2" ref="expertsCount">50+</div>
            <p class="text-primary-100">Проверенных экспертов в сети</p>
          </div>
          <div class="group">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:calendar" class="w-10 h-10 text-white" />
            </div>
            <div class="text-3xl font-bold text-white mb-2" ref="countriesCount">15+</div>
            <p class="text-primary-100">Лет на рынке</p>
          </div>
          <div class="group">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="ph:trophy" class="w-10 h-10 text-white" />
            </div>
            <div class="text-3xl font-bold text-white mb-2" ref="successRate">98%</div>
            <p class="text-primary-100">Успешных кейсов</p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16" data-aos="fade-up">
        <h3 class="text-2xl font-bold text-secondary-800 mb-4">
          Готовы начать свой путь к иммиграции в США?
        </h3>
        <p class="text-secondary-600 mb-8 max-w-2xl mx-auto">
          Получите персональную консультацию и узнайте, какой формат сопровождения подходит именно вам
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/consultation" 
            class="inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Получить консультацию
            <Icon name="ph:arrow-right" class="w-5 h-5" />
          </NuxtLink>
          <NuxtLink 
            to="/services" 
            class="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors"
          >
            Узнать о услугах
            <Icon name="ph:list" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeCard = ref(null);
const expertsCount = ref(null);
const countriesCount = ref(null);
const successRate = ref(null);

// Animated counter function
const animateCounter = (element, target, suffix = '') => {
  if (!element) return;
  
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 30);
};

onMounted(() => {
  // Animate counters when component mounts
  setTimeout(() => {
    animateCounter(expertsCount.value, 50, '+');
    animateCounter(countriesCount.value, 15, '+');
    animateCounter(successRate.value, 98, '%');
  }, 500);
});
</script>

<style scoped>
/* Custom animations for cards */
.group:hover .bg-primary-500,
.group:hover .bg-accent-500,
.group:hover .bg-secondary-500 {
  transform: scale(1.1) rotate(5deg);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s ease;
}

/* Custom gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style> 