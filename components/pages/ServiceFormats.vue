<template>
  <section class="bg-gradient-to-br from-gray-50 to-white py-20">
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-6">
            <Icon name="ph:handshake" size="32" />
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Форматы сопровождения
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Выберите тот формат, который подходит именно вам — в зависимости от вашего опыта, уверенности и этапа, на котором вы находитесь
          </p>
        </div>

        <!-- Service Cards Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- 1. Чек-лист -->
          <div class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2">
            <div class="p-8 relative">
              <!-- Badge -->
              <div class="inline-flex items-center bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Icon name="ph:list-checks" class="mr-2" size="16" />
                Для начинающих
              </div>
              
              <!-- Number -->
              <div class="absolute top-6 right-8 text-6xl font-bold text-green-100 group-hover:text-green-200 transition-colors">
                1
              </div>

              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="text-3xl mr-3">🔹</span>
                Чек-лист
              </h3>
              
              <div class="text-green-600 font-semibold mb-4">
                Если вы только начинаете
              </div>

              <p class="text-gray-600 mb-6 leading-relaxed">
                Вы на старте пути и хотите понять, как всё устроено? Этот вариант поможет навести порядок в голове. Пошаговый чек-лист с описанием этапов, сроков, списком документов, типичных ошибок и рекомендаций.
              </p>

              <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p class="text-green-700 text-sm font-medium">
                  💡 Подходит тем, кто хочет всё изучить самостоятельно и выстроить стратегию действий
                </p>
              </div>

              <NuxtLink to="/services/checklist" class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform group-hover:scale-105">
                👉 Запросить чек-лист
              </NuxtLink>
            </div>
          </div>

          <!-- 2. Сделай сам -->
          <div class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
            <div class="p-8 relative">
              <!-- Badge -->
              <div class="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Icon name="ph:wrench" class="mr-2" size="16" />
                Самостоятельно
              </div>
              
              <!-- Number -->
              <div class="absolute top-6 right-8 text-6xl font-bold text-blue-100 group-hover:text-blue-200 transition-colors">
                2
              </div>

              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="text-3xl mr-3">🔹</span>
                Сделай сам
              </h3>
              
              <div class="text-blue-600 font-semibold mb-4">
                Если хотите разобраться сами
              </div>

              <p class="text-gray-600 mb-6 leading-relaxed">
                Вы уверены, что справитесь без сопровождения, но вам нужен чёткий план? Подробный гид с образцами документов, рекомендациями и пояснениями к каждому шагу. Самостоятельная работа, но не "вслепую".
              </p>

              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p class="text-blue-700 text-sm font-medium">
                  📋 Включает шаблоны документов и подробные инструкции
                </p>
              </div>

              <NuxtLink to="/services/diy" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform group-hover:scale-105">
                👉 Получить гид и шаблоны
              </NuxtLink>
            </div>
          </div>

          <!-- 3. С экспертом -->
          <div class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
            <div class="p-8 relative">
              <!-- Badge -->
              <div class="inline-flex items-center bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Icon name="ph:user-gear" class="mr-2" size="16" />
                Сопровождение
              </div>
              
              <!-- Number -->
              <div class="absolute top-6 right-8 text-6xl font-bold text-purple-100 group-hover:text-purple-200 transition-colors">
                3
              </div>

              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="text-3xl mr-3">🔹</span>
                С экспертом (паралигалом)
              </h3>
              
              <div class="text-purple-600 font-semibold mb-4">
                Профессиональная поддержка
              </div>

              <p class="text-gray-600 mb-6 leading-relaxed">
                Сопровождение на всех этапах — от сбора документов до переписки с адвокатом. Информационная и административная поддержка, ответы на вопросы, сохранение контроля над процессом.
              </p>

              <div class="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <p class="text-purple-700 text-sm font-medium">
                  🤝 Сначала знакомство, чтобы понять, комфортно ли работать вместе
                </p>
              </div>

              <NuxtLink to="/services/expert" class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105">
                👉 Записаться на консультацию
              </NuxtLink>
            </div>
          </div>

          <!-- 4. Полное сопровождение -->
          <div class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 hover:-translate-y-2 relative">
            <!-- Recommended Badge -->
            <div class="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div class="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                ⭐ РЕКОМЕНДУЕМ
              </div>
            </div>
            
            <div class="p-8 relative pt-12">
              <!-- Badge -->
              <div class="inline-flex items-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Icon name="ph:crown" class="mr-2" size="16" />
                Максимум
              </div>
              
              <!-- Number -->
              <div class="absolute top-12 right-8 text-6xl font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                4
              </div>

              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="text-3xl mr-3">🔹</span>
                Полное сопровождение
              </h3>
              
              <div class="text-amber-600 font-semibold mb-4">
                Я + адвокат = Максимальная надёжность
              </div>

              <p class="text-gray-600 mb-6 leading-relaxed">
                Работа с командой: координация всех этапов, подготовка кейса, коммуникация со мной + проверенный иммиграционный адвокат для стратегии и юридической защиты. 15 лет опыта в подборе надёжных партнёров.
              </p>

              <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p class="text-amber-700 text-sm font-medium">
                  ✅ Путь от А до Я с командой, которая думает о результате
                </p>
              </div>

              <NuxtLink to="/services/full" class="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                👉 Начать серьёзную работу
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="text-center">
          <div class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Не знаете, какой формат выбрать?
            </h3>
            <p class="text-gray-600 mb-6">
              Расскажите немного о себе — я помогу сориентироваться
            </p>
            <NuxtLink
              to="/contacts"
              class="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Icon name="ph:chat-circle" class="mr-2" size="20" />
              Получить персональную рекомендацию
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props needed as this component is self-contained
</script> 