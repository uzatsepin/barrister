import { defineStore } from 'pinia'

interface FullFormData {
  fullName: string
  email: string
  phone: string
  country: string
  target: string
  actions: string
  family: string
  date: string
}

interface FullFormState {
  isModalOpen: boolean
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  formData: FullFormData
}

export const useFullFormStore = defineStore('fullForm', {
  state: (): FullFormState => ({
    isModalOpen: false,
    isSubmitting: false,
    isSuccess: false,
    error: null,
    formData: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      target: '',
      actions: '',
      family: '',
      date: ''
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
        fullName: '',
        email: '',
        phone: '',
        country: '',
        target: '',
        actions: '',
        family: '',
        date: ''
      }
      this.isSuccess = false
      this.error = null
    },

    updateFormField(field: keyof FullFormData, value: string) {
      this.formData[field] = value
    },

    async submitForm() {
      try {
        this.isSubmitting = true
        this.error = null

        // Валидация
        if (!this.formData.fullName.trim()) {
          throw new Error('Пожалуйста, введите ваше имя и фамилию')
        }

        // Проверяем что имя содержит минимум 2 слова
        const nameParts = this.formData.fullName.trim().split(/\s+/)
        if (nameParts.length < 2 || nameParts.some(part => part.length < 2)) {
          throw new Error('Введите имя и фамилию (минимум 2 слова)')
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

        if (!this.isValidPhone(this.formData.phone)) {
          throw new Error('Пожалуйста, введите корректный номер телефона')
        }

        if (!this.formData.country.trim()) {
          throw new Error('Пожалуйста, укажите страну')
        }

        if (!this.formData.target) {
          throw new Error('Пожалуйста, выберите цель прибывания')
        }

        if (!this.formData.actions) {
          throw new Error('Пожалуйста, выберите вариант действий')
        }

        if (!this.formData.family) {
          throw new Error('Пожалуйста, выберите вариант участия')
        }

        if (!this.formData.date) {
          throw new Error('Пожалуйста, выберите удобное время')
        }

        // Проверяем что дата в пределах следующей недели
        const selectedDate = new Date(this.formData.date)
        const today = new Date()
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
        
        if (selectedDate < nextWeek || selectedDate > twoWeeksLater) {
          throw new Error('Выберите время на следующей неделе')
        }

        // Отправляем данные в Directus
        const response = await $fetch('/api/directus/items/fullForm', {
          method: 'POST',
          body: {
            ...this.formData,
            date: new Date(this.formData.date).toISOString(),
            status: 'new'
          }
        })

        console.log('Full form submitted successfully:', response)
        this.isSuccess = true

        // Автоматически закрываем модал через 5 секунд после успешной отправки
        setTimeout(() => {
          this.closeModal()
        }, 5000)

      } catch (error) {
        console.error('Error submitting full form:', error)
        this.error = error instanceof Error ? error.message : 'Произошла ошибка при отправке формы'
      } finally {
        this.isSubmitting = false
      }
    },

    isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    isValidPhone(phone: string): boolean {
      // Убираем все не-цифры
      const digitsOnly = phone.replace(/\D/g, '')
      return digitsOnly.length >= 7 && digitsOnly.length <= 15
    }
  }
}) 