<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in p-4"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div class="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl animate-slide-up">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-secondary-800">{{ $t('common.search') }}</h3>
        <button 
          @click="$emit('close')" 
          class="text-secondary-600 hover:text-primary-600 p-2 hover:bg-primary-50 rounded-full transition-colors"
        >
          <Icon name="ph:x" size="24" />
        </button>
      </div>
      <div class="relative">
        <input 
          ref="searchInput"
          v-model="searchQuery"
          type="search" 
          class="w-full border border-gray-300 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          :placeholder="$t('common.search')"
          @keydown.enter="handleSearch"
        />
        <Icon 
          name="ph:magnifying-glass" 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          size="20" 
        />
      </div>

      <!-- Search Results -->
      <div v-if="searchResults.length > 0" class="mt-4 space-y-2">
        <div v-for="result in searchResults" :key="result.id" class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <NuxtLink :to="result.link" class="flex items-start space-x-3">
            <Icon :name="result.icon" class="text-primary-500 mt-1" size="20" />
            <div>
              <h4 class="font-medium text-secondary-800">{{ result.title }}</h4>
              <p class="text-sm text-secondary-600">{{ result.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="searchQuery && !isSearching" class="mt-4 text-center py-8">
        <Icon name="ph:magnifying-glass-bold" class="mx-auto text-secondary-400 mb-2" size="40" />
        <p class="text-secondary-600">По вашему запросу ничего не найдено</p>
      </div>

      <!-- Loading State -->
      <div v-if="isSearching" class="mt-4 flex justify-center py-8">
        <Icon name="ph:spinner" class="animate-spin text-primary-500" size="32" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const searchInput = ref(null);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;
  
  isSearching.value = true;
  // Simulate search delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Example search results
  searchResults.value = [
    {
      id: 1,
      title: 'Студенческая виза F-1',
      description: 'Информация о получении студенческой визы F-1',
      link: '/study/visa/f1',
      icon: 'ph:student'
    },
    {
      id: 2,
      title: 'Рабочая виза H-1B',
      description: 'Процесс получения рабочей визы H-1B',
      link: '/work/temporary/h1b',
      icon: 'ph:briefcase'
    }
  ];
  
  isSearching.value = false;
};

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  } else {
    searchQuery.value = '';
    searchResults.value = [];
  }
});

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      emit('close');
    }
  });
});
</script> 