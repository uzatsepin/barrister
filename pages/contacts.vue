<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900"></div>
      </div>
      
      <div class="container-custom relative z-10 py-20 md:py-28">
        <div class="max-w-4xl">
          <!-- Breadcrumbs -->
          <nav class="mb-6 animate-fade-in">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors underline decoration-dotted underline-offset-2">
                  Главная
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <Icon name="ph:caret-right" class="mx-2 text-gray-300" size="16" />
                <span class="text-white font-medium">Контакты</span>
              </li>
            </ol>
          </nav>
          
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
            Контакты
          </h1>
          
          <p class="text-xl text-gray-200 mb-8">
            Свяжитесь с нами для получения консультации
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Контакты | BarristerCorp',
  meta: [
    {
      name: 'description',
      content: 'Свяжитесь с экспертами BarristerCorp для получения консультации по визам, обучению и иммиграции в США'
    }
  ]
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>