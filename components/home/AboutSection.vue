<template>
  <section class="section bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image Column -->
        <div class="relative group" data-aos="fade-right">
          <!-- Main Image with Overlay -->
          <div class="relative overflow-hidden rounded-2xl">
            <NuxtImg 
              src="/images/angelika-about.webp" 
              alt="Анжелика Фруман за работой" 
              class="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-primary-900/20 to-transparent"></div>
            
            <!-- Expertise Badge -->
            <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 transform group-hover:translate-y-[-8px] transition-all duration-500">
              <div class="flex items-center gap-3">
                <Icon name="ph:certificate" class="text-primary-500 w-10 h-10" />
                <div>
                  <h3 class="font-semibold text-primary-900">Сертифицированный эксперт</h3>
                  <p class="text-sm text-primary-600">Иммиграционное право и визовые процессы</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Achievement Cards -->
          <div class="absolute -right-6 top-1/4 space-y-4">
            <div 
              v-for="(achievement, index) in achievements"
              :key="index"
              class="bg-white rounded-xl shadow-xl p-4 transform hover:translate-x-2 hover:scale-105 transition-all duration-500 cursor-pointer group relative"
              @mouseenter="activeAchievement = index"
              @mouseleave="activeAchievement = null"
            >
              <div class="flex items-center gap-3">
                <Icon :name="achievement.icon" :class="activeAchievement === index ? 'text-accent-500' : 'text-primary-500'" size="24" />
                <div>
                  <div class="font-semibold text-secondary-800">{{ achievement.value }}</div>
                  <div class="text-sm text-secondary-600">{{ achievement.label }}</div>
                </div>
              </div>
              <!-- Tooltip -->
              <div 
                v-if="activeAchievement === index"
                class="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white rounded-lg shadow-xl p-3 w-48 
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10"
              >
                <p class="text-sm text-secondary-700">{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Column -->
        <div data-aos="fade-left" class="space-y-8">
          <!-- Section Header -->
          <div>
            <h4 class="text-primary-600 font-semibold mb-2">Обо мне</h4>
            <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-6">
              Экспертиза, которая меняет жизни
            </h2>
          </div>

          <!-- Interactive Tabs -->
          <div class="space-y-4">
            <div class="flex space-x-4 border-b border-gray-200">
              <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="px-4 py-2 text-lg font-medium transition-colors duration-300 relative"
                :class="activeTab === index ? 'text-primary-600' : 'text-secondary-400 hover:text-secondary-600'"
                @click="activeTab = index"
              >
                {{ tab.title }}
                <div 
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform origin-left transition-transform duration-300"
                  :class="activeTab === index ? 'scale-x-100' : 'scale-x-0'"
                ></div>
              </button>
            </div>
            
            <div class="prose prose-lg text-secondary-600">
              <p class="mb-4" v-html="tabs[activeTab].content"></p>
            </div>
          </div>
          
          <!-- Expertise Areas -->
          <div class="grid grid-cols-2 gap-6">
            <div 
              v-for="(area, index) in expertiseAreas" 
              :key="index"
              class="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              :data-aos="'fade-up'"
              :data-aos-delay="index * 100"
              @mouseenter="activeExpertise = index"
              @mouseleave="activeExpertise = null"
            >
              <div class="flex items-center mb-3">
                <Icon 
                  :name="area.icon" 
                  :class="[
                    'mr-3 transform transition-all duration-300',
                    activeExpertise === index ? 'text-accent-500 scale-110' : 'text-primary-500'
                  ]"
                  size="32" 
                />
                <h3 class="font-semibold text-lg text-secondary-900">{{ area.title }}</h3>
              </div>
              <p class="text-secondary-600 text-sm">{{ area.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref(0);
const activeExpertise = ref(null);
const activeAchievement = ref(null);

const tabs = [
  {
    title: 'Опыт',
    content: 'С более чем 15-летним опытом в сфере иммиграционного права и визовых процессов, я помогла тысячам клиентов осуществить их мечту о жизни и работе в США. Мой подход сочетает глубокую экспертизу с индивидуальным вниманием к каждому случаю.'
  },
  {
    title: 'Миссия',
    content: 'Я основала эту компанию с четкой миссией: сделать иммиграционный процесс прозрачным, эффективным и успешным для каждого клиента. Независимо от того, ищете ли вы визу EB-1, планируете учиться в США или хотите открыть здесь свой бизнес, я и моя команда готовы поддержать вас на каждом этапе.'
  },
  {
    title: 'Подход',
    content: 'Мой подход основан на трех принципах: индивидуальное внимание к каждому случаю, прозрачность всех процессов и постоянная поддержка клиента. Я лично курирую каждый случай и всегда доступна для своих клиентов.'
  }
];

const achievements = [
  {
    value: '98%',
    label: 'Успешных дел',
    icon: 'ph:trophy',
    description: 'Подтвержденный показатель успешных визовых заявлений и апелляций'
  },
  {
    value: '3500+',
    label: 'Довольных клиентов',
    icon: 'ph:users',
    description: 'Клиенты со всего мира, которым мы помогли осуществить их мечты'
  },
  {
    value: '15+',
    label: 'Лет опыта',
    icon: 'ph:clock',
    description: 'Более 15 лет специализации в иммиграционном праве и визовых процессах'
  }
];

const expertiseAreas = [
  {
    title: 'Визовая стратегия',
    description: 'Индивидуальные стратегии получения визы на основе вашей уникальной ситуации и целей',
    icon: 'ph:strategy'
  },
  {
    title: 'Ведение дел',
    description: 'Полная поддержка на протяжении всего иммиграционного процесса',
    icon: 'ph:folder-user'
  },
  {
    title: 'Юридическая экспертиза',
    description: 'Глубокое знание иммиграционного законодательства и текущих правил',
    icon: 'ph:scales'
  },
  {
    title: 'История успеха',
    description: 'Подтвержденный опыт успешных визовых заявлений и апелляций',
    icon: 'ph:chart-line-up'
  }
];
</script>

<style scoped>
.prose {
  max-width: 65ch;
}

/* Smooth tab transitions */
.tab-content-enter-active,
.tab-content-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.tab-content-enter-from,
.tab-content-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style> 