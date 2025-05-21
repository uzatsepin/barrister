<template>
  <section class="relative min-h-[90vh] flex items-center bg-primary-700 text-white overflow-hidden">
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
      <div class="max-w-4xl">
        <h1 
          class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 
                 motion-safe:animate-title-slide-up [text-wrap:balance]"
        >
          {{ $t('home.hero.title') }}
        </h1>
        
        <p 
          class="text-xl md:text-2xl mb-8 text-gray-100 opacity-90 
                 motion-safe:animate-content-slide-up [text-wrap:balance]"
        >
          {{ $t('home.hero.subtitle') }}
        </p>

        <!-- Interactive Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 motion-safe:animate-cards-slide-up">
          <NuxtLink 
            v-for="(card, index) in serviceCards" 
            :key="index"
            :to="card.link"
            class="group bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 
                   hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-glow"
            @mousemove="handleCardHover"
            @mouseleave="handleCardLeave"
          >
            <div class="relative overflow-hidden">
              <Icon 
                :name="card.icon" 
                class="text-accent-400 mb-2 transform transition-transform duration-300 group-hover:scale-110" 
                size="32" 
              />
              <div class="absolute inset-0 bg-gradient-to-r from-accent-400/0 to-accent-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </div>
            <h3 class="text-lg font-semibold mb-1 group-hover:text-accent-400 transition-colors">{{ card.title }}</h3>
            <p class="text-sm text-gray-200 opacity-80">{{ card.description }}</p>
          </NuxtLink>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 motion-safe:animate-buttons-slide-up">
          <button 
            class="btn bg-accent-500 hover:bg-accent-600 text-white group relative overflow-hidden"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
          >
            <span class="relative z-10 flex items-center">
              {{ $t('home.hero.cta') }}
              <Icon name="ph:arrow-right" class="ml-2 transform group-hover:translate-x-1 transition-transform" size="20" />
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
              {{ $t('common.contactUs') }}
              <Icon name="ph:phone" class="ml-2 transform group-hover:rotate-12 transition-transform" size="20" />
            </span>
          </button>
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
    title: 'Учёба в США',
    description: 'Программы обучения и студенческие визы',
    icon: 'ph:student',
    link: '/study'
  },
  {
    title: 'Работа в США',
    description: 'Рабочие визы и поиск работодателя',
    icon: 'ph:briefcase',
    link: '/work'
  },
  {
    title: 'Бизнес в США',
    description: 'Открытие и покупка бизнеса',
    icon: 'ph:buildings',
    link: '/business'
  },
  {
    title: 'Гуманитарные программы',
    description: 'Убежище и защита в США',
    icon: 'ph:lifebuoy',
    link: '/humanitarian'
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