<template>
  <section class="relative min-h-[90vh] py-16 flex items-center bg-primary-700 text-white overflow-hidden">
    <!-- Background with parallax effect -->
    <div 
      class="absolute inset-0 overflow-hidden"
      @mousemove="handleParallax"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/90 z-10"></div>
      <img 
        ref="parallaxBg"
        src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="США" 
        class="w-full h-full object-cover scale-110 transform motion-safe:animate-subtle-zoom"
      />
    </div>

    <!-- Floating Elements -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div 
        v-for="(particle, index) in particles" 
        :key="index"
        class="absolute rounded-full bg-white/10 backdrop-blur-sm"
        :style="{
          width: particle.size + 'px',
          height: particle.size + 'px',
          left: particle.x + '%',
          top: particle.y + '%',
          animationDelay: particle.delay + 'ms',
        }"
        :class="'animate-float-' + ((index % 3) + 1)"
      ></div>
    </div>

    <!-- Content -->
    <div class="container-custom relative z-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Expert Info -->
        <div class="order-2 lg:order-1">
          <div class="flex flex-col lg:flex-row items-center gap-8 mb-12 motion-safe:animate-title-slide-up">
            <div class="relative group">
              <NuxtImg
                format="webp"
                width="192"
                height="192" 
                src="/images/angelika-seo.webp"
                alt="Angelika Fruman"
                class="w-48 h-48 rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-all duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-2xl"></div>
              <!-- Experience Badge -->
              <div class="absolute -right-4 -bottom-4 bg-white rounded-xl shadow-xl p-3 z-20 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500">
                <div class="flex items-center gap-2">
                  <Icon name="ph:clock-fill" class="text-primary-500" size="20" />
                  <span class="font-semibold text-primary-900">15+ лет</span>
                </div>
              </div>
            </div>
            <div class="text-center lg:text-left">
              <h2 class="text-3xl font-bold mb-2">Анжелика Фруман</h2>
              <p class="text-xl text-accent-400 font-medium mb-2">CEO и Эксперт по визам</p>
              <p class="text-gray-200 text-lg">Специалист по иммиграционному консалтингу</p>
            </div>
          </div>

          <div class="space-y-6 mb-8">
            <p 
              class="text-xl md:text-2xl text-gray-100 opacity-90 
                     motion-safe:animate-content-slide-up [text-wrap:balance]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Здравствуйте! Я — Анжелика Фруман, эксперт с более чем 15-летним опытом в оформлении виз и миграционной поддержке. Как основатель и CEO компании, я помогаю клиентам по всему миру успешно проходить визовые процессы. Моя миссия — сделать иммиграцию понятной, доступной и максимально эффективной.
            </p>
          </div>

          <!-- TrustPilot Rating -->
          <div class="flex items-center gap-6 mb-8 motion-safe:animate-content-slide-up p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="flex items-center gap-3">
              <Icon name="ph:star-fill" class="text-[#00b67a] w-8 h-8" />
              <div>
                <span class="text-2xl font-bold">4.6</span>
                <span class="text-sm text-gray-300 ml-1">/ 5.0</span>
              </div>
            </div>
            <div class="h-12 w-[1px] bg-white/20"></div>
            <div>
              <p class="font-medium">Проверенный эксперт</p>
              <p class="text-sm text-gray-300">На основе 18 отзывов клиентов</p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 motion-safe:animate-buttons-slide-up">
            <button 
              class="btn bg-accent-500 hover:bg-accent-600 text-white group relative overflow-hidden"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
            >
              <span class="relative z-10 flex items-center">
                Записаться на консультацию
                <Icon name="ph:calendar" class="ml-2 transform group-hover:scale-110 transition-transform" size="20" />
              </span>
              <div 
                ref="buttonGlow" 
                class="absolute inset-0 bg-white/20 blur-xl transition-transform duration-300 opacity-0 group-hover:opacity-100"
              ></div>
            </button>
            <button 
              class="btn bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 group"
            >
              <span class="flex items-center">
                Связаться со мной
                <Icon name="ph:phone" class="ml-2 transform group-hover:rotate-12 transition-transform" size="20" />
              </span>
            </button>
          </div>
        </div>

        <!-- Right Column - Service Cards -->
        <div class="order-1 lg:order-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 motion-safe:animate-cards-slide-up">
            <div 
              v-for="(card, index) in serviceCards" 
              :key="index"
              class="group bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 
                     hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-glow"
              @mousemove="handleCardHover"
              @mouseleave="handleCardLeave"
              :data-aos="'fade-up'"
              :data-aos-delay="500 + (index * 100)"
            >
              <div class="relative overflow-hidden">
                <Icon 
                  :name="card.icon" 
                  class="text-accent-400 mb-4 transform transition-transform duration-300 group-hover:scale-110" 
                  size="40" 
                />
                <div class="absolute inset-0 bg-gradient-to-r from-accent-400/0 to-accent-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
              <h3 class="text-xl font-semibold mb-2 group-hover:text-accent-400 transition-colors">{{ card.title }}</h3>
              <p class="text-gray-200 opacity-80">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
    <div class="absolute -bottom-1 left-0 w-full">
      <svg class="w-full h-auto fill-gray-50" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C280,100 720,0 1440,50 L1440,100 L0,100 Z"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const buttonGlow = ref(null);
const parallaxBg = ref(null);

// Generate random floating particles
const particles = Array.from({ length: 20 }, () => ({
  size: Math.random() * 20 + 10,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2000
}));

const handleMouseMove = (e) => {
  if (!buttonGlow.value) return;
  
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  buttonGlow.value.style.transform = `translate(${x}px, ${y}px)`;
};

const handleMouseLeave = () => {
  if (!buttonGlow.value) return;
  buttonGlow.value.style.transform = 'translate(50%, 50%)';
};

const handleParallax = (e) => {
  if (!parallaxBg.value) return;
  
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  parallaxBg.value.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
};

const handleCardHover = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
};

const handleCardLeave = (e) => {
  const card = e.currentTarget;
  card.style.transform = '';
};

const serviceCards = [
  {
    title: 'EB-1 Visa',
    description: 'Expert guidance for extraordinary ability visas',
    icon: 'ph:star',
    link: '/eb1'
  },
  {
    title: 'EB-2 NIW',
    description: 'National Interest Waiver consultation',
    icon: 'ph:flag',
    link: '/eb2-niw'
  },
  {
    title: 'Business Immigration',
    description: 'L-1, E-2, and investor visas',
    icon: 'ph:buildings',
    link: '/business'
  },
  {
    title: 'Student Visas',
    description: 'F-1 and M-1 visa assistance',
    icon: 'ph:student',
    link: '/study'
  }
];
</script>

<style scoped>
@keyframes subtle-zoom {
  from { transform: scale(1.1); }
  to { transform: scale(1.15); }
}

@keyframes title-slide-up {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes content-slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  60% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes cards-slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  40% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes buttons-slide-up {
  0% { transform: translateY(30px); opacity: 0; }
  80% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, -25px); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -15px); }
}

.animate-subtle-zoom {
  animation: subtle-zoom 20s alternate infinite ease-in-out;
}

.animate-title-slide-up {
  animation: title-slide-up 1s forwards ease-out;
}

.animate-content-slide-up {
  animation: content-slide-up 1.4s forwards ease-out;
}

.animate-cards-slide-up {
  animation: cards-slide-up 1.8s forwards ease-out;
}

.animate-buttons-slide-up {
  animation: buttons-slide-up 2s forwards ease-out;
}

.animate-float-1 {
  animation: float-1 6s infinite ease-in-out;
}

.animate-float-2 {
  animation: float-2 8s infinite ease-in-out;
}

.animate-float-3 {
  animation: float-3 10s infinite ease-in-out;
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}
</style> 