<template>
  <div class="section bg-gray-50">
    <div class="container-custom">
      <SectionHeading 
        :title="$t('blog.title')"
        subtitle="Актуальные новости и полезная информация об иммиграции, визах и образовании в США"
      />
      
      <!-- Categories and Search -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2 w-full md:w-auto">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap',
              selectedCategory === category.id 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-secondary-700 hover:bg-gray-100'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="relative w-full md:w-64">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Поиск статей..."
            class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <Icon name="ph:magnifying-glass" class="absolute left-3 top-2.5 text-gray-400" size="20" />
        </div>
      </div>
      
      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard 
          v-for="post in filteredPosts"
          :key="post.id"
          :title="post.title"
          :summary="post.summary"
          :imageUrl="post.imageUrl"
          :date="post.date"
          :category="post.category"
          :readTime="post.readTime"
          :link="post.link"
        />
      </div>
      
      <!-- Pagination -->
      <div class="flex justify-center mt-12">
        <div class="flex space-x-1">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            :class="[
              'px-3 py-1 rounded',
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-secondary-700 hover:bg-gray-100'
            ]"
          >
            <Icon name="ph:caret-left" />
          </button>
          
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="changePage(page)"
            :class="[
              'px-3 py-1 rounded',
              currentPage === page 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-secondary-700 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
          
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            :class="[
              'px-3 py-1 rounded',
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-secondary-700 hover:bg-gray-100'
            ]"
          >
            <Icon name="ph:caret-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'Изменения в правилах получения студенческой визы F-1 в 2025 году',
    summary: 'Ознакомьтесь с новыми правилами и требованиями для получения студенческой визы, которые вступили в силу в 2025 году.',
    imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-04-15',
    category: 'Визы',
    categoryId: 'visas',
    readTime: 7,
    link: '/blog/f1-visa-changes-2025'
  },
  {
    id: 2,
    title: 'ТОП-10 университетов США для международных студентов',
    summary: 'Рейтинг лучших университетов США, которые предлагают отличные программы и условия для иностранных студентов.',
    imageUrl: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-03-10',
    category: 'Образование',
    categoryId: 'education',
    readTime: 10,
    link: '/blog/top-us-universities-2025'
  },
  {
    id: 3,
    title: 'Как открыть свой бизнес в США: пошаговая инструкция',
    summary: 'Подробное руководство по открытию бизнеса в США для иностранных предпринимателей: от выбора штата до получения визы.',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-02-05',
    category: 'Бизнес',
    categoryId: 'business',
    readTime: 12,
    link: '/blog/start-business-usa-guide'
  },
  {
    id: 4,
    title: 'Программа TPS: что это такое и кто может на нее претендовать',
    summary: 'Подробный разбор программы временной защиты иностранцев (TPS) и список стран, граждане которых могут на нее претендовать.',
    imageUrl: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-01-20',
    category: 'Гуманитарные программы',
    categoryId: 'humanitarian',
    readTime: 8,
    link: '/blog/tps-program-guide'
  },
  {
    id: 5,
    title: 'Виза H-1B в 2025 году: новые правила и лотерея',
    summary: 'Все, что нужно знать о получении рабочей визы H-1B в 2025 году: правила регистрации, шансы на выигрыш в лотерее и требования.',
    imageUrl: 'https://images.pexels.com/photos/8297452/pexels-photo-8297452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-12-15',
    category: 'Работа',
    categoryId: 'work',
    readTime: 9,
    link: '/blog/h1b-visa-2025'
  },
  {
    id: 6,
    title: 'Как получить визу инвестора E-2: требования и процесс',
    summary: 'Руководство по получению визы E-2 для предпринимателей, планирующих инвестировать в американский бизнес.',
    imageUrl: 'https://images.pexels.com/photos/7821547/pexels-photo-7821547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2024-11-28',
    category: 'Бизнес',
    categoryId: 'business',
    readTime: 11,
    link: '/blog/e2-visa-guide'
  },
];

const categories = [
  { id: 'all', name: 'Все статьи' },
  { id: 'visas', name: 'Визы' },
  { id: 'education', name: 'Образование' },
  { id: 'work', name: 'Работа' },
  { id: 'business', name: 'Бизнес' },
  { id: 'humanitarian', name: 'Гуманитарные программы' }
];

const searchQuery = ref('');
const selectedCategory = ref('all');
const currentPage = ref(1);
const postsPerPage = 6;

const filteredPosts = computed(() => {
  let result = [...blogPosts];
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(post => post.categoryId === selectedCategory.value);
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.summary.toLowerCase().includes(query)
    );
  }
  
  // Pagination
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return result.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  let result = [...blogPosts];
  
  // Filter by category for page count
  if (selectedCategory.value !== 'all') {
    result = result.filter(post => post.categoryId === selectedCategory.value);
  }
  
  // Filter by search query for page count
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.summary.toLowerCase().includes(query)
    );
  }
  
  return Math.ceil(result.length / postsPerPage);
});

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  currentPage.value = 1; // Reset to first page when changing category
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>