<template>
  <section class="section bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <SectionHeading 
        :title="$t('home.services.title')" 
        :subtitle="$t('home.services.description')" 
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Card decoration -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          <!-- Icon -->
          <div class="relative">
            <div 
              class="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300"
            >
              <Icon :name="service.icon" class="text-white" size="28" />
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative">
            <h3 class="text-xl font-bold text-secondary-800 mb-3">{{ service.title }}</h3>
            <p class="text-secondary-600 mb-4">{{ service.description }}</p>
            
            <!-- Features list -->
            <ul class="space-y-2 mb-6">
              <li 
                v-for="(feature, fIndex) in service.features" 
                :key="fIndex"
                class="flex items-start"
              >
                <Icon name="ph:check-circle" class="text-primary-500 mr-2 mt-1 flex-shrink-0" size="18" />
                <span class="text-sm text-secondary-700">{{ feature }}</span>
              </li>
            </ul>
            
            <!-- Link -->
            <NuxtLink 
              :to="service.link"
              class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group/link"
            >
              <span>{{ $t('common.readMore') }}</span>
              <Icon 
                name="ph:arrow-right" 
                class="ml-1 transform group-hover/link:translate-x-1 transition-transform" 
                size="20" 
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Учёба в США',
    description: 'Подберем оптимальную программу обучения и поможем со всеми этапами поступления',
    icon: 'ph:student',
    link: '/study',
    features: [
      'Языковые и профессиональные курсы',
      'Программы Bachelor, Master, PhD',
      'Помощь с документами для визы F-1',
      'Поддержка во время обучения'
    ]
  },
  {
    title: 'Работа в США',
    description: 'Поможем получить рабочую визу и найти работодателя в соответствии с вашей квалификацией',
    icon: 'ph:briefcase',
    link: '/work',
    features: [
      'Временные визы (J-1, O-1, H-1B)',
      'Постоянные визы (EB-1, EB-2, EB-3)',
      'Поиск работодателя',
      'Подготовка документов'
    ]
  },
  {
    title: 'Бизнес в США',
    description: 'Сопровождение в открытии, покупке и регистрации бизнеса, получении визы инвестора',
    icon: 'ph:buildings',
    link: '/business',
    features: [
      'Регистрация компании',
      'Открытие банковского счета',
      'Визы L-1 и E-2',
      'Покупка готового бизнеса'
    ]
  },
  {
    title: 'Гуманитарные программы',
    description: 'Предоставляем юридическую поддержку для получения убежища и защиты в США',
    icon: 'ph:lifebuoy',
    link: '/humanitarian',
    features: [
      'Asylum (Убежище)',
      'Refugee (Беженец)',
      'TPS (Временная защита)',
      'Юридическое сопровождение'
    ]
  }
];
</script> 