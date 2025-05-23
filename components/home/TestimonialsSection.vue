<template>
  <section class="py-24 bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <UiSectionHeading
        badge="Отзывы"
        title="Что говорят наши клиенты"
        subtitle="Прочитайте подтвержденные отзывы наших довольных клиентов на TrustPilot"
      >
        <template #badge-icon>
          <Icon name="ph:star" />
        </template>
      </UiSectionHeading>

      <!-- TrustPilot Overall Rating -->
      <div class="flex justify-center items-center gap-8 mb-16">
        <div class="text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <Icon name="ph:star-fill" class="text-[#00b67a] w-8 h-8" />
            <span class="text-4xl font-bold">4.6</span>
          </div>
          <p class="text-secondary-600">Рейтинг TrustPilot на основе 18 отзывов</p>
        </div>
        <div class="h-16 w-[1px] bg-gray-200"></div>
        <NuxtImg src="/images/trustpilot-logo.svg" alt="TrustPilot" class="h-12" />
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(review, index) in featuredReviews" 
          :key="index"
          class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
        >
          <!-- Review Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-semibold text-lg">{{ review.name }}</h3>
              <p class="text-sm text-gray-500">{{ review.date }}</p>
            </div>
            <div class="flex gap-1">
              <Icon 
                v-for="star in 5" 
                :key="star"
                name="ph:star-fill"
                :class="star <= review.rating ? 'text-[#00b67a]' : 'text-gray-200'"
                class="w-5 h-5"
              />
            </div>
          </div>

          <!-- Review Content -->
          <div class="space-y-3">
            <p class="font-medium text-secondary-900">{{ review.title }}</p>
            <p class="text-secondary-600 line-clamp-4">{{ review.content }}</p>
          </div>

          <!-- Review Footer -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-sm text-gray-500">
              Дата обращения: {{ review.experienceDate }}
            </p>
          </div>
        </div>
      </div>

      <!-- View All Reviews Button -->
      <div class="text-center mt-12">
        <a 
          href="https://www.trustpilot.com/review/www.barristercorp.org"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-secondary-900 hover:bg-gray-50 transition-colors"
        >
          Смотреть все отзывы на TrustPilot
          <Icon name="ph:arrow-right" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredReviews = [
  {
    name: "Инга Тум",
    date: "5 мая 2025",
    rating: 5,
    title: "Хочу выразить глубокую благодарность",
    content: "Мой случай был довольно сложным, учитывая специфику моей профессии, и требовал знаний и опыта настоящих профессионалов в своей области. Анжелика сыграла ключевую роль, взяв на себя огромный объем работы со сложной и специфической информацией по моему делу. Её способность тщательно организовать и выделить главные моменты была просто невероятной. Спасибо за невероятный профессионализм, неустанную поддержку и, в конечном итоге, за достижение замечательного результата в получении визы EB1-A.",
    experienceDate: "30 апреля 2025"
  },
  {
    name: "Юлия Букер",
    date: "26 декабря 2024",
    rating: 5,
    title: "Приятно удивлена эффективностью",
    content: "Я была приятно удивлена эффективностью и профессионализмом сервиса. Получение рабочей визы стало намного проще благодаря помощи USCIS. Рекомендую всем, кто планирует работать в США на временной основе.",
    experienceDate: "20 декабря 2024"
  },
  {
    name: "Дэн Стивенс",
    date: "11 декабря 2024",
    rating: 5,
    title: "Помощь с релокацией",
    content: "Анжелика Фруман помогла с релокацией, которую я только что согласовал. К сожалению, получить визу в наши дни не так просто. В любом случае, я очень благодарен, что смог получить иммиграционную визу для переезда в США в короткие сроки.",
    experienceDate: "14 ноября 2024"
  }
];
</script> 