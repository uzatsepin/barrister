<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
    <div class="text-center mb-6">
      <div class="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="ph:question" class="text-white" size="32" />
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Быстрая оценка ваших шансов</h3>
      <p class="text-gray-600">Ответьте на несколько вопросов и получите предварительную оценку</p>
    </div>

    <div v-if="!showResults">
      <!-- Вопрос 1 -->
      <div v-if="currentStep === 1" class="space-y-4">
        <h4 class="font-semibold text-gray-800">1. Какая у вас цель?</h4>
        <div class="space-y-2">
          <label v-for="option in goals" :key="option.value" class="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
            <input 
              v-model="answers.goal" 
              :value="option.value" 
              type="radio" 
              class="mr-3 text-blue-600"
            />
            <div>
              <div class="font-medium">{{ option.label }}</div>
              <div class="text-sm text-gray-500">{{ option.description }}</div>
            </div>
          </label>
        </div>
      </div>

      <!-- Вопрос 2 -->
      <div v-if="currentStep === 2" class="space-y-4">
        <h4 class="font-semibold text-gray-800">2. Ваш возраст?</h4>
        <select v-model="answers.age" class="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25 лет</option>
          <option value="26-35">26-35 лет</option>
          <option value="36-45">36-45 лет</option>
          <option value="46-55">46-55 лет</option>
          <option value="55+">55+ лет</option>
        </select>
      </div>

      <!-- Вопрос 3 -->
      <div v-if="currentStep === 3" class="space-y-4">
        <h4 class="font-semibold text-gray-800">3. Уровень образования?</h4>
        <select v-model="answers.education" class="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
          <option value="">Выберите уровень</option>
          <option value="high-school">Среднее образование</option>
          <option value="bachelor">Бакалавр</option>
          <option value="master">Магистр</option>
          <option value="phd">PhD/Докторская степень</option>
        </select>
      </div>

      <!-- Вопрос 4 -->
      <div v-if="currentStep === 4" class="space-y-4">
        <h4 class="font-semibold text-gray-800">4. Знание английского языка?</h4>
        <select v-model="answers.english" class="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
          <option value="">Выберите уровень</option>
          <option value="beginner">Начальный</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
          <option value="native">Свободно владею</option>
        </select>
      </div>

      <!-- Навигация -->
      <div class="flex justify-between mt-6">
        <button 
          v-if="currentStep > 1"
          @click="currentStep--"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Назад
        </button>
        <div class="flex-1"></div>
        <button 
          v-if="currentStep < 4"
          @click="nextStep"
          :disabled="!canProceed"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Далее →
        </button>
        <button 
          v-if="currentStep === 4"
          @click="calculateResults"
          :disabled="!canProceed"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Получить результат
        </button>
      </div>

      <!-- Прогресс -->
      <div class="mt-4">
        <div class="flex justify-between text-sm text-gray-500 mb-2">
          <span>Прогресс</span>
          <span>{{ currentStep }}/4</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(currentStep / 4) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Результаты -->
    <div v-else class="text-center">
      <div class="mb-6">
        <div 
          :class="[
            'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4',
            resultData.color
          ]"
        >
          <Icon :name="resultData.icon" class="text-white" size="48" />
        </div>
        <h4 class="text-2xl font-bold text-gray-800 mb-2">{{ resultData.title }}</h4>
        <div class="text-3xl font-bold mb-2" :class="resultData.textColor">
          {{ resultData.percentage }}%
        </div>
        <p class="text-gray-600 mb-4">{{ resultData.description }}</p>
      </div>

      <div class="bg-white rounded-xl p-4 mb-6">
        <h5 class="font-semibold text-gray-800 mb-3">Рекомендации:</h5>
        <ul class="text-left space-y-2">
          <li v-for="recommendation in resultData.recommendations" :key="recommendation" class="flex items-start">
            <Icon name="ph:check-circle" class="text-green-500 mr-2 mt-0.5 flex-shrink-0" size="16" />
            <span class="text-gray-600 text-sm">{{ recommendation }}</span>
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <button
          @click="$emit('openConsultation')"
          class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Получить детальную консультацию
        </button>
        <button
          @click="resetQuiz"
          class="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
        >
          Пройти тест заново
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['openConsultation'])

const currentStep = ref(1)
const showResults = ref(false)
const answers = ref({
  goal: '',
  age: '',
  education: '',
  english: ''
})

const goals = [
  {
    value: 'study',
    label: 'Учеба в США',
    description: 'Получение образования в американских университетах'
  },
  {
    value: 'work',
    label: 'Работа в США',
    description: 'Трудоустройство и рабочие визы'
  },
  {
    value: 'business',
    label: 'Бизнес в США',
    description: 'Инвестиции и предпринимательство'
  },
  {
    value: 'immigration',
    label: 'Иммиграция',
    description: 'Получение грин-карты и гражданства'
  }
]

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return answers.value.goal !== ''
    case 2: return answers.value.age !== ''
    case 3: return answers.value.education !== ''
    case 4: return answers.value.english !== ''
    default: return false
  }
})

const resultData = computed(() => {
  let score = 0
  
  // Подсчет баллов на основе ответов
  if (answers.value.goal === 'study') score += 20
  if (answers.value.goal === 'work') score += 15
  if (answers.value.goal === 'business') score += 10
  if (answers.value.goal === 'immigration') score += 5
  
  if (answers.value.age === '18-25') score += 25
  if (answers.value.age === '26-35') score += 20
  if (answers.value.age === '36-45') score += 15
  if (answers.value.age === '46-55') score += 10
  if (answers.value.age === '55+') score += 5
  
  if (answers.value.education === 'phd') score += 25
  if (answers.value.education === 'master') score += 20
  if (answers.value.education === 'bachelor') score += 15
  if (answers.value.education === 'high-school') score += 10
  
  if (answers.value.english === 'native') score += 25
  if (answers.value.english === 'advanced') score += 20
  if (answers.value.english === 'intermediate') score += 15
  if (answers.value.english === 'beginner') score += 10
  
  if (score >= 80) {
    return {
      percentage: score,
      title: 'Отличные перспективы!',
      description: 'У вас высокие шансы на успешную реализацию планов в США',
      icon: 'ph:star',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      recommendations: [
        'Подготовьте документы заранее',
        'Рассмотрите программы Express Entry',
        'Изучите требования к вашей профессии',
        'Начните процесс как можно скорее'
      ]
    }
  } else if (score >= 60) {
    return {
      percentage: score,
      title: 'Хорошие шансы',
      description: 'При правильной подготовке у вас есть реальные возможности',
      icon: 'ph:thumbs-up',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      recommendations: [
        'Повысьте уровень английского языка',
        'Получите дополнительные сертификаты',
        'Наберите больше опыта работы',
        'Рассмотрите альтернативные программы'
      ]
    }
  } else {
    return {
      percentage: score,
      title: 'Требуется подготовка',
      description: 'Нужно улучшить некоторые аспекты для повышения шансов',
      icon: 'ph:warning',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      recommendations: [
        'Изучите английский язык',
        'Получите дополнительное образование',
        'Наберите профессиональный опыт',
        'Обратитесь за профессиональной консультацией'
      ]
    }
  }
})

const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const calculateResults = () => {
  if (canProceed.value) {
    showResults.value = true
  }
}

const resetQuiz = () => {
  currentStep.value = 1
  showResults.value = false
  answers.value = {
    goal: '',
    age: '',
    education: '',
    english: ''
  }
}
</script> 