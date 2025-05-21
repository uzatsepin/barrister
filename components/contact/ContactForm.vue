<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name Field -->
    <div>
      <label for="name" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.name') }} <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <Icon 
          name="ph:user" 
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          size="20" 
        />
        <input
          id="name"
          v-model="form.name"
          type="text"
          :placeholder="$t('common.name')"
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          :class="{ 'border-red-300 focus:ring-red-500': errors.name }"
          required
        />
      </div>
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <!-- Email Field -->
    <div>
      <label for="email" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.email') }} <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <Icon 
          name="ph:envelope" 
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          size="20" 
        />
        <input
          id="email"
          v-model="form.email"
          type="email"
          :placeholder="$t('common.email')"
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          :class="{ 'border-red-300 focus:ring-red-500': errors.email }"
          required
        />
      </div>
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
    </div>

    <!-- Phone Field -->
    <div>
      <label for="phone" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.phone') }} <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <Icon 
          name="ph:phone" 
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
          size="20" 
        />
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="Введите номер телефона"
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          :class="{ 'border-red-300 focus:ring-red-500': errors.phone }"
          required
        />
      </div>
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
    </div>

    <!-- Message Field -->
    <div>
      <label for="message" class="block text-sm font-medium text-secondary-700 mb-1">
        {{ $t('common.message') }} <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <Icon 
          name="ph:chat-text" 
          class="absolute left-3 top-3 text-secondary-400" 
          size="20" 
        />
        <textarea
          id="message"
          v-model="form.message"
          :placeholder="$t('common.message')"
          rows="4"
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          :class="{ 'border-red-300 focus:ring-red-500': errors.message }"
          required
        ></textarea>
      </div>
      <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
    </div>

    <!-- Submit Button -->
    <div>
      <button 
        type="submit" 
        class="w-full btn btn-primary flex items-center justify-center"
        :disabled="isSubmitting"
      >
        <Icon 
          v-if="isSubmitting" 
          name="ph:spinner" 
          class="animate-spin mr-2" 
          size="20" 
        />
        {{ isSubmitting ? 'Отправка...' : $t('common.submit') }}
      </button>
    </div>

    <!-- Success/Error Messages -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div 
        v-if="submitStatus" 
        class="p-4 rounded-lg text-sm"
        :class="{
          'bg-green-50 text-green-700': submitStatus === 'success',
          'bg-red-50 text-red-700': submitStatus === 'error'
        }"
      >
        <div class="flex items-center">
          <Icon 
            :name="submitStatus === 'success' ? 'ph:check-circle' : 'ph:x-circle'" 
            class="mr-2" 
            size="20" 
          />
          {{ $t(submitStatus === 'success' ? 'contact.success' : 'contact.error') }}
        </div>
      </div>
    </Transition>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref('');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  // Allow more flexible phone formats
  const re = /^\+?[\d\s-()]{10,}$/;
  return re.test(phone);
};

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '');
  
  // Name validation
  if (!form.name.trim()) {
    errors.name = $t('common.required');
    isValid = false;
  }
  
  // Email validation
  if (!form.email.trim()) {
    errors.email = $t('common.required');
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = $t('common.invalidEmail');
    isValid = false;
  }
  
  // Phone validation
  if (!form.phone.trim()) {
    errors.phone = $t('common.required');
    isValid = false;
  } else if (!validatePhone(form.phone)) {
    errors.phone = 'Некорректный номер телефона';
    isValid = false;
  }
  
  // Message validation
  if (!form.message.trim()) {
    errors.message = $t('common.required');
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  submitStatus.value = '';
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form on success
    Object.keys(form).forEach(key => form[key] = '');
    submitStatus.value = 'success';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      submitStatus.value = '';
    }, 5000);
  } catch (error) {
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script> 