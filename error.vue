<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
    <!-- Header -->
    <AppHeader />
    
    <!-- Error Content -->
    <div class="flex items-center justify-center px-4 py-20">
      <div class="max-w-lg w-full text-center">
        <!-- Анимированная иконка -->
        <div class="mb-8">
          <div class="relative w-40 h-40 mx-auto">
            <!-- Внешний круг с анимацией -->
            <div class="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-30"></div>
            <!-- Средний круг -->
            <div class="absolute inset-4 bg-primary-300 rounded-full animate-pulse opacity-50"></div>
            <!-- Основной круг -->
            <div class="relative w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-2xl">
              <div class="text-center">
                <Icon name="ph:warning-circle" class="text-white mb-2" size="48" />
                <div class="text-white text-lg font-bold">{{ error.statusCode }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Заголовок ошибки -->
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {{ getErrorTitle() }}
        </h1>
        
        <p class="text-lg text-gray-600 mb-12 leading-relaxed max-w-md mx-auto">
          {{ getErrorMessage() }}
        </p>

        <!-- Основное действие -->
        <div class="mb-12">
          <NuxtLink 
            to="/"
            class="inline-flex items-center btn btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Icon name="ph:house" class="mr-3" size="24" />
            Вернуться на главную
          </NuxtLink>
        </div>

        <!-- Дополнительная информация -->
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div class="flex items-center justify-center mb-4">
            <Icon name="ph:info" class="text-primary-600 mr-2" size="24" />
            <h3 class="text-lg font-semibold text-gray-800">Что произошло?</h3>
          </div>
          
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            Страница, которую вы ищете, может быть удалена, переименована или временно недоступна.
          </p>
          
          <div class="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 font-mono">
            Запрошенный URL: {{ $route?.fullPath || 'неизвестно' }}
          </div>
        </div>

        <!-- Контактная информация -->
        <div class="mt-8 text-center">
          <p class="text-gray-500 text-sm mb-4">
            Нужна помощь? Свяжитесь с нами:
          </p>
          <div class="flex justify-center space-x-6">
            <a 
              href="mailto:main@barristercorp.com"
              class="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Icon name="ph:envelope" class="mr-2" size="20" />
              <span class="text-sm">Email</span>
            </a>
            <a 
              href="tel:+19362896191"
              class="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Icon name="ph:phone" class="mr-2" size="20" />
              <span class="text-sm">Телефон</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['error'])

const getErrorTitle = () => {
  switch (props.error?.statusCode) {
    case 404:
      return 'Страница не найдена'
    case 500:
      return 'Ошибка сервера'
    case 403:
      return 'Доступ запрещён'
    default:
      return 'Что-то пошло не так'
  }
}

const getErrorMessage = () => {
  switch (props.error?.statusCode) {
    case 404:
      return 'К сожалению, запрашиваемая страница не существует. Возможно, ссылка устарела или содержит опечатку.'
    case 500:
      return 'Произошла ошибка на сервере. Мы уже работаем над её устранением.'
    case 403:
      return 'У вас нет прав доступа к этой странице.'
    default:
      return 'Произошла неожиданная ошибка. Пожалуйста, попробуйте ещё раз.'
  }
}

// SEO для страницы ошибки
useHead({
  title: `Ошибка ${props.error?.statusCode || '500'} | BarristerCorp`,
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена. Возможно, ссылка устарела или содержит опечатку.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>

<style scoped>
.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}
</style> 