<template>
  <!-- Modal Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="contactStore.isModalOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="handleOverlayClick"
    >
      <!-- Modal Content -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div
          v-if="contactStore.isModalOpen"
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <!-- Success State -->
          <div v-if="contactStore.isSuccess" class="p-8 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:check-circle" class="text-green-600" size="32" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Спасибо за обращение!</h3>
            <p class="text-gray-600 mb-6">
              Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время для обсуждения деталей.
            </p>
            <button
              @click="contactStore.closeModal"
              class="btn bg-primary-600 text-white hover:bg-primary-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Закрыть
            </button>
          </div>

          <!-- Form State -->
          <div v-else>
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 class="text-2xl font-bold text-gray-800">Записаться на консультацию</h2>
              <button
                @click="contactStore.closeModal"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icon name="ph:x" class="text-gray-500" size="24" />
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
              <!-- Error Message -->
              <div
                v-if="contactStore.error"
                class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {{ contactStore.error }}
              </div>

              <!-- Name Field -->
              <div>
                <label for="modal-name" class="block text-sm font-medium text-gray-700 mb-2">
                  Имя *
                </label>
                <input
                  id="modal-name"
                  v-model="contactStore.formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                  placeholder="Введите ваше имя"
                />
              </div>

              <!-- Email Field -->
              <div>
                <label for="modal-email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="modal-email"
                  v-model="contactStore.formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <!-- Phone Field -->
              <div>
                <label for="modal-phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  id="modal-phone"
                  ref="phoneInput"
                  :value="contactStore.formData.phone"
                  @input="handlePhoneInput"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <!-- Message Field -->
              <div>
                <label for="modal-message" class="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="modal-message"
                  v-model="contactStore.formData.message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors resize-none"
                  placeholder="Расскажите о ваших планах и целях..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="contactStore.isSubmitting"
                class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Icon
                  v-if="contactStore.isSubmitting"
                  name="ph:spinner"
                  class="animate-spin mr-2"
                  size="20"
                />
                <span>
                  {{ contactStore.isSubmitting ? 'Отправляем...' : 'Отправить заявку' }}
                </span>
              </button>

              <!-- Privacy Note -->
              <p class="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useContactStore } from '~/stores/contact'

const contactStore = useContactStore()
const phoneInput = ref(null)

// Маска для телефона (универсальная без привязки к стране)
const formatPhoneNumber = (value) => {
  // Удаляем все кроме цифр и знака +
  const cleaned = value.replace(/[^\d+]/g, '')
  
  // Если начинается с +, оставляем его
  let formatted = cleaned
  
  // Базовое форматирование для удобства
  if (cleaned.length > 1) {
    if (cleaned.startsWith('+')) {
      // Для международных номеров: +1 234 567 8901
      const digits = cleaned.slice(1)
      if (digits.length <= 3) {
        formatted = `+${digits}`
      } else if (digits.length <= 6) {
        formatted = `+${digits.slice(0, 1)} ${digits.slice(1)}`
      } else if (digits.length <= 10) {
        formatted = `+${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4)}`
      } else {
        formatted = `+${digits.slice(0, 1)} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`
      }
    } else {
      // Для локальных номеров без +
      if (cleaned.length <= 3) {
        formatted = cleaned
      } else if (cleaned.length <= 6) {
        formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
      } else if (cleaned.length <= 10) {
        formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
      } else {
        formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
      }
    }
  }
  
  return formatted
}

const handlePhoneInput = (event) => {
  const input = event.target
  const formatted = formatPhoneNumber(input.value)
  
  // Обновляем значение в store
  contactStore.updateFormField('phone', formatted)
  
  // Обновляем позицию курсора
  nextTick(() => {
    const cursorPosition = formatted.length
    input.setSelectionRange(cursorPosition, cursorPosition)
  })
}

const handleOverlayClick = (event) => {
  // Закрываем модал только при клике на overlay, а не на содержимое
  if (event.target === event.currentTarget) {
    contactStore.closeModal()
  }
}

const handleSubmit = async () => {
  await contactStore.submitForm()
}

// Закрытие по ESC
const handleKeydown = (event) => {
  if (event.key === 'Escape' && contactStore.isModalOpen) {
    contactStore.closeModal()
  }
}

// Добавляем обработчик клавиатуры при монтировании
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Фокус на первом поле при открытии модала и блокировка скролла
watch(() => contactStore.isModalOpen, (isOpen) => {
  if (isOpen) {
    // Блокируем скролл body
    document.body.style.overflow = 'hidden'
    
    nextTick(() => {
      const nameInput = document.getElementById('modal-name')
      if (nameInput) {
        nameInput.focus()
      }
    })
  } else {
    // Возвращаем скролл body
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.modal-backdrop {
  backdrop-filter: blur(4px);
}
</style> 