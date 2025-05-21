<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />

    <NuxtLink 
      to="/contacts" 
      class="fixed bottom-6 right-6 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-50 flex items-center group"
    >
      <Icon name="ph:chat-dots-bold" class="mr-2 transition-transform duration-300 group-hover:rotate-[15deg]" size="22" />
      {{ $t('common.getConsultation') }}
    </NuxtLink>
  </div>
</template>