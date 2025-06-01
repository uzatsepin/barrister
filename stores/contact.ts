import { defineStore } from 'pinia'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface ContactState {
  isModalOpen: boolean
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  formData: ContactFormData
}

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({
    isModalOpen: false,
    isSubmitting: false,
    isSuccess: false,
    error: null,
    formData: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  }),

  actions: {
    openModal() {
      this.isModalOpen = true
      this.isSuccess = false
      this.error = null
    },

    closeModal() {
      this.isModalOpen = false
      // Сбрасываем форму через небольшую задержку для плавной анимации
      setTimeout(() => {
        this.resetForm()
      }, 300)
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
      this.isSuccess = false
      this.error = null
    },

    updateFormField(field: keyof ContactFormData, value: string) {
      this.formData[field] = value
    },

    async submitForm() {
      try {
        this.isSubmitting = true
        this.error = null

        // Валидация
        if (!this.formData.name.trim()) {
          throw new Error('Пожалуйста, введите ваше имя')
        }
        
        if (!this.formData.email.trim()) {
          throw new Error('Пожалуйста, введите email')
        }

        if (!this.isValidEmail(this.formData.email)) {
          throw new Error('Пожалуйста, введите корректный email')
        }

        if (!this.formData.phone.trim()) {
          throw new Error('Пожалуйста, введите номер телефона')
        }

        if (!this.formData.message.trim()) {
          throw new Error('Пожалуйста, введите сообщение')
        }

        // Отправляем данные в Directus
        const response = await $fetch('/api/directus/items/contacts', {
          method: 'POST',
          body: {
            ...this.formData,
            status: 'new'
          }
        })

        console.log('Contact form submitted successfully:', response)
        this.isSuccess = true

        // Автоматически закрываем модал через 3 секунды после успешной отправки
        setTimeout(() => {
          this.closeModal()
        }, 3000)

      } catch (error) {
        console.error('Error submitting contact form:', error)
        this.error = error instanceof Error ? error.message : 'Произошла ошибка при отправке формы'
      } finally {
        this.isSubmitting = false
      }
    },

    isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }
}) 