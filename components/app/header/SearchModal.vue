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
      <div v-if="searchData.searchResults.value && searchData.searchResults.value.length > 0" class="mt-6">
        <!-- Results Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-secondary-700">
            Найдено {{ searchData.searchResults.value.length }} результат{{ searchData.searchResults.value.length === 1 ? '' : (searchData.searchResults.value.length < 5 ? 'а' : 'ов') }}
          </h3>
          <div class="text-xs text-secondary-500">
            {{ searchQuery.length > 20 ? searchQuery.substring(0, 20) + '...' : searchQuery }}
          </div>
        </div>
        
        <!-- Results List -->
        <div class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          <div v-for="result in searchData.searchResults.value" :key="result.id" class="group">
            <NuxtLink 
              :to="result.link" 
              @click="$emit('close')"
              class="flex items-start space-x-4 p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-25 rounded-xl transition-all duration-300 group-hover:shadow-md border border-transparent hover:border-primary-100"
            >
              <div class="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary-50 group-hover:to-primary-100 transition-all duration-300 group-hover:scale-110">
                <Icon :name="result.icon" class="text-primary-600 group-hover:text-primary-700" size="18" />
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <h4 
                    class="font-semibold text-secondary-800 group-hover:text-primary-800 transition-colors leading-tight"
                    v-html="result.title"
                  ></h4>
                  <span 
                    class="px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-3 border"
                    :class="searchData.getTypeColor(result.type)"
                  >
                    {{ searchData.getTypeLabel(result.type) }}
                  </span>
                </div>
                <div 
                  class="text-sm text-secondary-600 line-clamp-2 leading-relaxed"
                  v-html="result.description"
                ></div>
                <div class="flex items-center justify-between mt-3">
                  <div v-if="result.published_at" class="flex items-center text-xs text-secondary-500">
                    <Icon name="ph:calendar" class="mr-1.5" size="12" />
                    {{ formatDate(result.published_at) }}
                  </div>
                  <div class="text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Перейти →
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="searchQuery && !searchData.isSearching.value && searchQuery.length >= 2" class="mt-6 text-center py-12">
        <div class="mb-6">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Icon name="ph:magnifying-glass-bold" class="text-secondary-400" size="32" />
          </div>
          <h3 class="text-lg font-semibold text-secondary-700 mb-2">Ничего не найдено</h3>
          <p class="text-secondary-500">По запросу <span class="font-medium text-secondary-700">"{{ searchQuery }}"</span> результатов не найдено</p>
        </div>
        <div class="bg-gradient-to-r from-gray-50 to-primary-25 rounded-xl p-5 text-left border border-primary-100">
          <h4 class="font-semibold text-secondary-700 mb-3 flex items-center">
            <Icon name="ph:lightbulb" class="mr-2 text-primary-500" size="18" />
            Рекомендации для поиска:
          </h4>
          <ul class="text-sm text-secondary-600 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              Попробуйте <strong>другие ключевые слова</strong>
            </li>
            <li class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              Проверьте <strong>правописание</strong>
            </li>
            <li class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              Используйте <strong>более общие термины</strong>
            </li>
            <li class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              Попробуйте поиск по <strong>синонимам</strong>
            </li>
          </ul>
        </div>
      </div>

      <!-- Search Error -->
      <div v-else-if="searchData.searchError.value" class="mt-4 text-center py-8">
        <Icon name="ph:warning-circle" class="mx-auto text-red-400 mb-2" size="40" />
        <p class="text-red-600">{{ searchData.searchError.value }}</p>
      </div>

      <!-- Search Hint -->
      <div v-else-if="searchQuery.length > 0 && searchQuery.length < 2" class="mt-4 text-center py-8">
        <Icon name="ph:info" class="mx-auto text-secondary-400 mb-2" size="32" />
        <p class="text-secondary-600">Введите минимум 2 символа для поиска</p>
      </div>



      <!-- Loading State -->
      <div v-if="searchData.isSearching.value" class="mt-6">
        <div class="text-center py-8">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <Icon name="ph:spinner" class="animate-spin text-primary-600" size="24" />
          </div>
          <div class="space-y-1">
            <h3 class="font-medium text-secondary-700">Ищем по всем материалам...</h3>
            <p class="text-sm text-secondary-500">Это займет всего несколько секунд</p>
          </div>
        </div>
        
        <!-- Loading Skeleton -->
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="flex items-start space-x-4 p-4 rounded-xl border border-gray-100">
              <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
              <div class="flex-grow space-y-2">
                <div class="flex items-center justify-between">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div class="h-3 bg-gray-200 rounded w-full"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useSearch } from '~/composables/useSearch'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const searchQuery = ref('')
const searchInput = ref(null)
const searchData = useSearch()

// Debounce поиска
let searchTimeout

const handleSearch = async () => {
  const query = searchQuery.value.trim()
  
  // Очищаем предыдущий таймер
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  // Если запрос пустой или слишком короткий, очищаем результаты
  if (!query || query.length < 2) {
    return
  }
  
  // Debounce - поиск через 300ms после окончания ввода
  searchTimeout = setTimeout(async () => {
    await searchData.performSearch(query)
  }, 300)
}

// Форматирование даты для отображения
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Watcher на изменение поискового запроса
watch(searchQuery, handleSearch)

// Watcher на открытие/закрытие модала
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
  }
})

onMounted(() => {
  // Обработка клавиши Escape
  const handleKeydown = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      emit('close')
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  // Очистка при размонтировании
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 #f8fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Стили для подсвеченного текста */
:deep(mark) {
  background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
  color: #92400e;
}
</style> 