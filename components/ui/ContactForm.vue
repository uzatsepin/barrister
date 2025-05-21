<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.name') }} *
      </label>
      <input 
        id="name"
        v-model="form.name"
        type="text" 
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      />
    </div>
    
    <div>
      <label for="email" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.email') }} *
      </label>
      <input 
        id="email"
        v-model="form.email"
        type="email" 
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      />
    </div>
    
    <div>
      <label for="phone" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.phone') }}
      </label>
      <input 
        id="phone"
        v-model="form.phone"
        type="tel" 
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      />
    </div>
    
    <div>
      <label for="message" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.message') }} *
      </label>
      <textarea 
        id="message"
        v-model="form.message"
        rows="4" 
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
      ></textarea>
    </div>
    
    <div class="flex items-center">
      <input 
        id="agreement"
        v-model="form.agreement"
        type="checkbox" 
        required
        class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
      />
      <label for="agreement" class="ml-2 block text-sm text-secondary-700">
        Я согласен на обработку персональных данных
      </label>
    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary w-full"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting">Отправка...</span>
      <span v-else>{{ $t('common.submit') }}</span>
    </button>
    
    <div v-if="formStatus.message" :class="['text-center p-2 rounded', formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ formStatus.message }}
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['submit-success']);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  agreement: false
});

const isSubmitting = ref(false);
const formStatus = reactive({
  success: false,
  message: ''
});

const submitForm = async () => {
  isSubmitting.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  formStatus.success = true;
  formStatus.message = 'Спасибо! Ваша заявка отправлена.';
  
  // Reset form after successful submission
  form.name = '';
  form.email = '';
  form.phone = '';
  form.message = '';
  form.agreement = false;
  
  emit('submit-success');
  
  isSubmitting.value = false;
};
</script>