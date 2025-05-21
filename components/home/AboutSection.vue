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
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <img 
            src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="BarristerCorp офис" 
            class="rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-95 transition-transform duration-500"
          />
          <!-- Floating elements -->
          <div class="absolute -right-6 -bottom-6 bg-white rounded-xl shadow-xl p-4 z-20 transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
            <div class="flex items-center space-x-2">
              <Icon name="ph:users" class="text-primary-500" size="24" />
              <div class="text-sm">
                <div class="font-semibold text-secondary-800">3500+</div>
                <div class="text-secondary-600">довольных клиентов</div>
              </div>
            </div>
          </div>
          <div class="absolute -left-6 -top-6 bg-white rounded-xl shadow-xl p-4 z-20 transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
            <div class="flex items-center space-x-2">
              <Icon name="ph:chart-line-up" class="text-accent-500" size="24" />
              <div class="text-sm">
                <div class="font-semibold text-secondary-800">98%</div>
                <div class="text-secondary-600">успешных кейсов</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Column -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-6">
            {{ $t('home.about.title') }}
          </h2>
          
          <div class="prose prose-lg text-secondary-600 mb-8">
            <p class="mb-4">
              BarristerCorp — это команда профессионалов с более чем 10-летним опытом работы в сфере иммиграционного права и образования за рубежом. Мы предоставляем комплексные решения для всех, кто мечтает построить свое будущее в США.
            </p>
            <p>
              Наша миссия — сделать процесс переезда, обучения и работы в США максимально простым и понятным для каждого клиента. Мы ценим индивидуальный подход и гарантируем высокое качество услуг на всех этапах сотрудничества.
            </p>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-6">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-center mb-2">
                <Icon 
                  :name="stat.icon" 
                  class="text-primary-500 mr-2 transform group-hover:scale-110 transition-transform duration-300" 
                  size="24" 
                />
                <div class="text-3xl font-bold text-primary-600">{{ stat.value }}</div>
              </div>
              <div class="text-secondary-600 text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    value: '15+',
    label: 'лет опыта',
    icon: 'ph:clock'
  },
  {
    value: '3500+',
    label: 'довольных клиентов',
    icon: 'ph:users'
  },
  {
    value: '98%',
    label: 'успешных кейсов',
    icon: 'ph:chart-line-up'
  },
  {
    value: '24/7',
    label: 'поддержка клиентов',
    icon: 'ph:headset'
  }
];
</script> 