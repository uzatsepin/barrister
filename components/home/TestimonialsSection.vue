<template>
  <section class="section bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <SectionHeading :title="$t('home.testimonials.title')" />
      
      <!-- Testimonials Slider -->
      <div class="relative">
        <!-- Navigation Buttons -->
        <button 
          @click="prevSlide" 
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 text-secondary-600 hover:text-primary-600"
        >
          <Icon name="ph:caret-left-bold" size="24" />
        </button>
        
        <button 
          @click="nextSlide" 
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 text-secondary-600 hover:text-primary-600"
        >
          <Icon name="ph:caret-right-bold" size="24" />
        </button>

        <!-- Testimonials Grid -->
        <div 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-12"
          :class="{ 'pointer-events-none': isAnimating }"
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
        >
          <div 
            v-for="(testimonial, index) in visibleTestimonials" 
            :key="testimonial.id"
            class="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500"
            :class="getSlideClasses(index)"
          >
            <!-- Quote Icon -->
            <div class="mb-4">
              <div class="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="ph:quotes" class="text-primary-500" size="24" />
              </div>
            </div>
            
            <!-- Content -->
            <blockquote class="mb-6">
              <p class="text-secondary-600 text-lg leading-relaxed mb-4">{{ testimonial.text }}</p>
            </blockquote>
            
            <!-- Author -->
            <div class="flex items-center">
              <img 
                :src="testimonial.avatarUrl" 
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <div class="font-semibold text-secondary-800">{{ testimonial.name }}</div>
                <div class="text-sm text-secondary-600">{{ testimonial.position }}</div>
              </div>
              <div class="ml-auto flex">
                <Icon 
                  v-for="star in 5" 
                  :key="star"
                  name="ph:star-fill" 
                  :class="star <= testimonial.rating ? 'text-accent-400' : 'text-gray-300'"
                  size="20" 
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="(_, index) in Math.ceil(testimonials.length / 3)" 
            :key="index"
            @click="goToSlide(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-primary-600 w-6' : 'bg-gray-300 hover:bg-primary-400'"
          ></button>
        </div>
      </div>
      
      <!-- CTA Button -->
      <div class="text-center mt-12">
        <button class="btn btn-outline">
          {{ $t('common.readMore') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const testimonials = [
  {
    id: 1,
    name: 'Анна Смирнова',
    position: 'Студентка MBA',
    text: 'Благодаря BarristerCorp я смогла поступить в престижную бизнес-школу в США и получить студенческую визу без проблем. Весь процесс был очень понятным и комфортным.',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Игорь Петров',
    position: 'IT-специалист',
    text: 'С помощью команды BarristerCorp я получил рабочую визу H-1B и переехал в Калифорнию. Профессионалы своего дела, рекомендую всем, кто хочет работать в США!',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Елена Козлова',
    position: 'Предприниматель',
    text: 'Открыла свой бизнес в США благодаря BarristerCorp. Компания помогла с регистрацией бизнеса, открытием счета и получением визы E-2. Профессиональный подход и внимание к деталям.',
    rating: 4,
    avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Михаил Иванов',
    position: 'Врач',
    text: 'Получил возможность работать врачом в США благодаря помощи BarristerCorp. Они помогли с подтверждением квалификации и получением всех необходимых документов.',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Ольга Новикова',
    position: 'Дизайнер',
    text: 'Мечтала о работе в креативной индустрии США, и BarristerCorp сделали это возможным. Помогли получить визу O-1 и найти первых клиентов.',
    rating: 5,
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const currentSlide = ref(0);
const isAnimating = ref(false);

const visibleTestimonials = computed(() => {
  const start = currentSlide.value * 3;
  return testimonials.slice(start, start + 3);
});

const getSlideClasses = (index) => {
  if (isAnimating.value) {
    return 'animate-slide-fade-out';
  }
  return 'animate-slide-fade-in';
};

const animateSlideChange = async () => {
  isAnimating.value = true;
  await new Promise(resolve => setTimeout(resolve, 300));
  isAnimating.value = false;
};

const nextSlide = async () => {
  await animateSlideChange();
  currentSlide.value = (currentSlide.value + 1) % Math.ceil(testimonials.length / 3);
};

const prevSlide = async () => {
  await animateSlideChange();
  currentSlide.value = currentSlide.value === 0 
    ? Math.ceil(testimonials.length / 3) - 1 
    : currentSlide.value - 1;
};

const goToSlide = async (index) => {
  await animateSlideChange();
  currentSlide.value = index;
};

// Add automatic sliding
let slideInterval = null;

onMounted(() => {
  // Start automatic sliding
  startAutoSlide();
});

onBeforeUnmount(() => {
  // Clean up interval when component is destroyed
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const pauseAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const resumeAutoSlide = () => {
  if (!slideInterval) {
    startAutoSlide();
  }
};
</script>

<style scoped>
@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.animate-slide-fade-in {
  animation: slideFadeIn 0.5s ease-out forwards;
}

.animate-slide-fade-out {
  animation: slideFadeOut 0.3s ease-in forwards;
}
</style> 