<template>
  <section class="section bg-gray-50 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div
        class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="container-custom relative">
      <UiSectionHeading
        :title="$t('blog.title')"
        subtitle="Полезная информация о визах, образовании и иммиграции в США"
        data-aos="fade-up"
      />

      <!-- Featured Post -->
      <div class="mb-12 max-w-5xl mx-auto">
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative h-[300px] md:h-[400px]">
              <img
                :src="featuredPost.imageUrl"
                :alt="featuredPost.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  Популярное
                </span>
              </div>
            </div>
            <div class="p-6 md:p-8 flex flex-col justify-center">
              <div class="mb-2 flex items-center">
                <span
                  class="bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs font-medium"
                >
                  {{ featuredPost.category }}
                </span>
                <span class="text-secondary-500 text-sm ml-3 flex items-center">
                  <Icon name="ph:calendar" class="mr-1" size="14" />
                  {{ formatDate(featuredPost.date) }}
                </span>
                <span class="text-secondary-500 text-sm ml-3 flex items-center">
                  <Icon name="ph:clock" class="mr-1" size="14" />
                  {{ featuredPost.readTime }} {{ $t("blog.readTime") }}
                </span>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
                {{ featuredPost.title }}
              </h3>
              <p class="text-secondary-600 mb-6">
                {{ featuredPost.summary }}
              </p>
              <NuxtLink
                :to="featuredPost.link"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
              >
                <span>{{ $t("common.readMore") }}</span>
                <Icon
                  name="ph:arrow-right"
                  class="ml-1 transform group-hover:translate-x-1 transition-transform"
                  size="20"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
        <BlogCard
          v-for="(post, index) in blogPosts"
          :key="post.id"
          :title="post.title"
          :summary="post.summary"
          :imageUrl="post.imageUrl"
          :date="post.date"
          :category="post.category"
          :readTime="post.readTime"
          :link="post.link"
          :data-aos="'fade-up'"
          :data-aos-delay="500 + (index * 100)"
        />
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
        <NuxtLink to="/blog" class="btn btn-primary inline-flex items-center">
          {{ $t("blog.viewAll") }}
          <Icon name="ph:arrow-right" class="ml-2" size="20" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Format date using toLocaleDateString
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Featured blog post
const featuredPost = {
  id: 1,
  title: "Полный гид по иммиграции в США 2025: основные программы и требования",
  summary:
    "Подробный обзор всех доступных путей для переезда в США, включая рабочие, образовательные, инвестиционные и гуманитарные программы, последние изменения и требования.",
  imageUrl:
    "https://images.pexels.com/photos/1496265/pexels-photo-1496265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  date: "2025-05-15",
  category: "Иммиграция",
  readTime: 15,
  link: "/blog/complete-us-immigration-guide-2025",
};

// Regular blog posts
const blogPosts = [
  {
    id: 2,
    title: "Изменения в правилах получения студенческой визы F-1 в 2025 году",
    summary:
      "Ознакомьтесь с новыми правилами и требованиями для получения студенческой визы, которые вступили в силу в 2025 году.",
    imageUrl:
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2025-04-15",
    category: "Визы",
    readTime: 7,
    link: "/blog/f1-visa-changes-2025",
  },
  {
    id: 3,
    title: "ТОП-10 университетов США для международных студентов",
    summary:
      "Рейтинг лучших университетов США, которые предлагают отличные программы и условия для иностранных студентов.",
    imageUrl:
      "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2025-03-10",
    category: "Образование",
    readTime: 10,
    link: "/blog/top-us-universities-2025",
  },
  {
    id: 4,
    title: "Как открыть свой бизнес в США: пошаговая инструкция",
    summary:
      "Подробное руководство по открытию бизнеса в США для иностранных предпринимателей: от выбора штата до получения визы.",
    imageUrl:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2025-02-05",
    category: "Бизнес",
    readTime: 12,
    link: "/blog/start-business-usa-guide",
  },
  {
    id: 5,
    title: "Работа в США по визе O-1: что нужно знать талантливым специалистам",
    summary:
      "Подробная информация о визе O-1 для людей с выдающимися способностями в науке, искусстве, образовании, бизнесе или спорте.",
    imageUrl:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2025-01-20",
    category: "Работа",
    readTime: 9,
    link: "/blog/o1-visa-guide",
  },
  {
    id: 6,
    title: "Изменения в программе Asylum в 2025 году: новые правила и процедуры",
    summary:
      "Актуальная информация о процессе получения убежища в США, изменения в законодательстве и практические рекомендации.",
    imageUrl:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "2024-12-15",
    category: "Гуманитарные программы",
    readTime: 11,
    link: "/blog/asylum-changes-2025",
  },
];
</script>
