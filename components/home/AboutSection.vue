<template>
  <section class="section bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                  <h3 class="font-semibold text-primary-900">Эксперт по иммиграции в США</h3>
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
              Иммиграция в США — сложный процесс.
            </h2>
            <p>Но он становится понятным и управляемым, если рядом есть тот, кто знает дорогу.</p>
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
            
            <!-- Fixed height container to prevent jumping -->
            <div class="prose prose-lg text-secondary-600">
              <div class="mb-4" v-html="tabs[activeTab].content"></div>
            </div>
          </div>

          <!-- Info Block -->
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <Icon name="ph:info" class="w-6 h-6 text-amber-600 mt-1" />
              </div>
              <div>
                <h3 class="font-semibold text-amber-900 mb-3">Важная информация</h3>
                <div class="space-y-2 text-amber-800">
                  <p class="flex items-start gap-2">
                    <span class="text-amber-600 mt-1">•</span>
                    <span>Я не заменяю адвоката.</span>
                  </p>
                  <p class="flex items-start gap-2">
                    <span class="text-amber-600 mt-1">•</span>
                    <span>Я не даю юридические советы.</span>
                  </p>
                  <p class="flex items-start gap-2">
                    <span class="text-amber-600 mt-1">•</span>
                    <span>Я помогаю вам разобраться в системе, сделать ваш путь к США понятным и подготовленным — чтобы вы пришли к цели уверенно и без стресса.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Expertise Areas -->
          <!-- <div class="grid grid-cols-2 gap-6">
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
          </div> -->
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
    content: `
      <div class="space-y-4">
        <div class="mb-4">
          <p class="text-lg leading-relaxed mb-4">
            Меня зовут <strong class="text-primary-600">Анжелика Фруман</strong>, и уже более <strong>15 лет</strong> я работаю в сфере иммиграции в США. В течение этого времени я сотрудничала с различными американскими иммиграционными адвокатами в качестве паралигла и административного сотрудника.
          </p>
          <p class="text-lg leading-relaxed mb-4">
            Моя роль заключалась в непосредственном взаимодействии с клиентами:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4 text-secondary-600">
            <li>подготовке документов</li>
            <li>заполнении форм</li>
            <li>общении с иммиграционными ведомствами</li>
            <li>поиске решений в нестандартных ситуациях</li>
          </ul>
          <p class="text-lg leading-relaxed mt-4">
            Этот опыт позволил мне глубоко понять, как устроены юридические процессы изнутри, и выявить, что действительно важно для клиентов: <em class="text-primary-600 font-medium">простота, поддержка и ощущение, что о них заботятся</em>.
          </p>
        </div>
      </div>
    `
  },
  {
    title: 'Миссия',
    content: `
      <div class="space-y-4">
        <div class="mb-4">
          <p class="text-lg leading-relaxed mb-4">
            Моя миссия — создать пространство, где каждый, кто мечтает о жизни в США, получает <strong class="text-primary-600">ясность, поддержку и реальный план действий</strong>. Я стремлюсь объединить всё необходимое в одном месте:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4 text-secondary-600 mb-4">
            <li>от подбора визы и подготовки документов</li>
            <li>до консультаций, образования</li>
            <li>и пошагового сопровождения</li>
          </ul>
          <div class="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
            <p class="text-lg leading-relaxed">
              Я верю, что иммиграция не должна быть хаотичной и пугающей. Она может быть <em class="text-primary-600 font-medium">понятной, законной и максимально эффективной</em>. Моя цель — чтобы ваш путь к иммиграции был осознанным и начался правильно.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    title: 'Подход',
    content: `
      <div class="space-y-6">
        <div class="mb-6">
          <p class="text-lg leading-relaxed mb-6">
            Я понимаю, что каждый клиент уникален, со своими потребностями, целями и финансовыми возможностями. Поэтому я предлагаю <strong class="text-primary-600">различные форматы сопровождения</strong>, чтобы каждый мог выбрать наиболее подходящий для себя:
          </p>
          
          <div class="grid gap-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 class="font-semibold text-primary-600 mb-2">Чек-лист</h4>
              <p class="text-secondary-600">если вы только начинаете и хотите понять, с чего начать.</p>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 class="font-semibold text-primary-600 mb-2">Сделай сам</h4>
              <p class="text-secondary-600">если вы готовы идти самостоятельно, но с чёткими инструкциями.</p>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 class="font-semibold text-primary-600 mb-2">Сопровождение эксперта</h4>
              <p class="text-secondary-600">если вам нужна поддержка на каждом этапе.</p>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 class="font-semibold text-primary-600 mb-2">Бот-помощник</h4>
              <p class="text-secondary-600">если вы предпочитаете автоматизированное пошаговое руководство 24/7.</p>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 class="font-semibold text-primary-600 mb-2">Сопровождение иммиграционным адвокатом</h4>
              <p class="text-secondary-600">если требуется полное юридическое представительство.</p>
            </div>
          </div>
          
          <div class="mt-6 bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-lg">
            <p class="text-lg leading-relaxed">
              Мой подход основан на <strong class="text-accent-600">честности, доступности и уважении к вашему выбору</strong>. Я стремлюсь быть рядом на каждом этапе вашего пути, обеспечивая поддержку и уверенность в каждом шаге.
            </p>
          </div>
        </div>
      </div>
    `
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