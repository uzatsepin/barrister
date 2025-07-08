<template>
  <div class="max-w-3xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-4">
        <Icon name="ph:calendar-check" size="32" />
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-3">
        Персональная консультация
      </h2>
      <p class="text-gray-600 text-lg mb-6">
        Заполните форму и мы свяжемся с вами в удобное время
      </p>
      
      <!-- Pricing Info -->
      <div class="inline-flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl px-6 py-4 mb-2">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-green-700">
            <Icon name="ph:currency-dollar" size="24" class="mr-2" />
            <span class="text-2xl font-bold">150</span>
          </div>
          <div class="w-px h-8 bg-green-300"></div>
          <div class="flex items-center text-green-600">
            <Icon name="ph:clock" size="20" class="mr-2" />
            <span class="font-semibold">45-60 минут</span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-green-200 text-center text-sm max-w-sm">
          <p class="text-green-800 font-medium">
            Стоимость консультации — это ваш депозит на наши будущие услуги.
          </p>
           <p class="text-xs text-green-700 opacity-90 mt-1">
            При продолжении работы мы вычтем эту сумму из общего счёта.
          </p>
          <p class="text-xs text-green-700 opacity-90 mt-1">
            В ином случае, она покроет расходы на консультацию.
          </p>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        💡 Индивидуальный подход к вашей ситуации
      </p>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div class="p-8 lg:p-12">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Name and Email Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name Field -->
            <div class="group">
              <label for="fullName" class="block text-sm font-semibold text-gray-700 mb-2">
                Имя и Фамилия <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.fullName, 'text-gray-400': !form.fullName }">
                  <Icon name="ph:user" size="20" />
                </div>
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  placeholder="Введите ваше имя и фамилию"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.fullName }"
                  required
                />
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.fullName" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.fullName }}
                </p>
              </Transition>
            </div>

            <!-- Email Field -->
            <div class="group">
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Электронная почта <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.email, 'text-gray-400': !form.email }">
                  <Icon name="ph:envelope" size="20" />
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.email }"
                  required
                />
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.email" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.email }}
                </p>
              </Transition>
            </div>
          </div>

          <!-- Phone Field -->
          <div class="group">
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Телефон <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-3">
              <div class="relative w-40">
                <select
                  v-model="form.countryCode"
                  class="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-gray-50 focus:bg-white text-sm font-medium transition-all duration-200"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.phone }"
                >
                  <option value="+380">🇺🇦 +380</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+1">🇨🇦 +1</option>
                  <option value="+7">🇷🇺 +7</option>
                  <option value="+7">🇰🇿 +7</option>
                  <option value="+48">🇵🇱 +48</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+972">🇮🇱 +972</option>
                </select>
                <Icon 
                  name="ph:caret-down" 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  size="16" 
                />
              </div>
              <div class="relative flex-1">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.phoneNumber, 'text-gray-400': !form.phoneNumber }">
                  <Icon name="ph:phone" size="20" />
                </div>
                <input
                  id="phone"
                  v-model="form.phoneNumber"
                  type="tel"
                  :placeholder="getPhonePlaceholder(form.countryCode)"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.phone }"
                  @input="formatPhone"
                  required
                />
              </div>
            </div>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-1 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <p v-if="errors.phone" class="mt-2 text-sm text-red-600 flex items-center">
                <Icon name="ph:warning-circle" size="16" class="mr-1" />
                {{ errors.phone }}
              </p>
            </Transition>
          </div>

          <!-- Country Field -->
          <div class="group">
            <label for="country" class="block text-sm font-semibold text-gray-700 mb-2">
              В какой вы сейчас стране? <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                   :class="{ 'text-primary-500': form.country, 'text-gray-400': !form.country }">
                <Icon name="ph:map-pin" size="20" />
              </div>
              <input
                id="country"
                v-model="form.country"
                type="text"
                placeholder="Введите страну"
                class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.country }"
                required
              />
            </div>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-1 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <p v-if="errors.country" class="mt-2 text-sm text-red-600 flex items-center">
                <Icon name="ph:warning-circle" size="16" class="mr-1" />
                {{ errors.country }}
              </p>
            </Transition>
          </div>

          <!-- Target and Actions Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Target Field -->
            <div class="group">
              <label for="target" class="block text-sm font-semibold text-gray-700 mb-2">
                Ваша цель прибывания в США <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.target, 'text-gray-400': !form.target }">
                  <Icon name="ph:target" size="20" />
                </div>
                <select
                  id="target"
                  v-model="form.target"
                  class="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.target }"
                  required
                >
                  <option value="">Выберите цель</option>
                  <option value="работа">Работа</option>
                  <option value="учёба">Учёба</option>
                  <option value="бизнес">Бизнес</option>
                  <option value="туризм">Туризм</option>
                  <option value="семейные обстоятельства">Семейные обстоятельства</option>
                  <option value="другое">Другое</option>
                </select>
                <Icon 
                  name="ph:caret-down" 
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  size="16" 
                />
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.target" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.target }}
                </p>
              </Transition>
            </div>

            <!-- Actions Field -->
            <div class="group">
              <label for="actions" class="block text-sm font-semibold text-gray-700 mb-2">
                Предпринимали ли шаги? <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.actions, 'text-gray-400': !form.actions }">
                  <Icon name="ph:list-checks" size="20" />
                </div>
                <select
                  id="actions"
                  v-model="form.actions"
                  class="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.actions }"
                  required
                >
                  <option value="">Выберите вариант</option>
                  <option value="Нет">Нет, не предпринимал(а)</option>
                  <option value="Подавал документы самостоятельно">Подавал документы самостоятельно</option>
                  <option value="Обращался к другим юристам">Обращался к другим юристам</option>
                  <option value="Консультировался в посольстве">Консультировался в посольстве</option>
                  <option value="Другое">Другое</option>
                </select>
                <Icon 
                  name="ph:caret-down" 
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  size="16" 
                />
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.actions" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.actions }}
                </p>
              </Transition>
            </div>
          </div>

          <!-- Family and Date Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Family Field -->
            <div class="group">
              <label for="family" class="block text-sm font-semibold text-gray-700 mb-2">
                Кто будет участвовать? <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200"
                     :class="{ 'text-primary-500': form.family, 'text-gray-400': !form.family }">
                  <Icon name="ph:users" size="20" />
                </div>
                <select
                  id="family"
                  v-model="form.family"
                  class="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  :class="{ 'border-red-300 focus:ring-red-500 bg-red-50': errors.family }"
                  required
                >
                  <option value="">Выберите вариант</option>
                  <option value="Один">Только я</option>
                  <option value="Семья">Вся семья</option>
                  <option value="Супруг(а)">С супругом(ой)</option>
                  <option value="С детьми">С детьми</option>
                  <option value="Другое">Другое</option>
                </select>
                <Icon 
                  name="ph:caret-down" 
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  size="16" 
                />
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.family" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.family }}
                </p>
              </Transition>
            </div>

            <!-- Date Field -->
            <div class="group">
              <label for="date" class="block text-sm font-semibold text-gray-700 mb-2">
                Удобное время для связи <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 z-10"
                     :class="{ 'text-primary-500': form.date, 'text-gray-400': !form.date }">
                  <Icon name="ph:calendar" size="20" />
                </div>
                <input
                  id="date"
                  ref="dateInput"
                  v-model="form.date"
                  type="datetime-local"
                  :min="getMinDateTime()"
                  :max="getMaxDateTime()"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                  :class="{ 
                    'border-red-300 focus:ring-red-500 bg-red-50': errors.date,
                    'border-green-300 focus:ring-green-500 bg-green-50': form.date && !errors.date
                  }"
                  required
                  @focus="onDateFocus"
                  @click="onDateFocus"
                  @input="validateDateLive"
                  @change="validateDateLive"
                />
              </div>
              <div class="mt-2 text-xs text-gray-500 space-y-1">
                <p>📅 Период: {{ formatDateRange() }}</p>
                <p>🕘 Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 14:00</p>
                <p>🚫 Воскресенье - выходной</p>
                <p>ℹ️ Нажмите на поле для выбора даты и времени</p>
              </div>
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-1 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
              >
                <p v-if="errors.date" class="mt-2 text-sm text-red-600 flex items-center">
                  <Icon name="ph:warning-circle" size="16" class="mr-1" />
                  {{ errors.date }}
                </p>
                <p v-else-if="form.date && !errors.date" class="mt-2 text-sm text-green-600 flex items-center">
                  ✅ Отличный выбор времени!
                </p>
              </Transition>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              :disabled="isSubmitting"
            >
              <div class="flex items-center justify-center">
                <Icon 
                  v-if="isSubmitting" 
                  name="ph:spinner" 
                  class="animate-spin mr-2" 
                  size="20" 
                />
                <Icon 
                  v-else
                  name="ph:paper-plane-tilt" 
                  class="mr-2" 
                  size="20" 
                />
                {{ isSubmitting ? 'Отправка...' : 'Отправить заявку' }}
              </div>
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
              class="p-6 rounded-xl text-sm"
              :class="{
                'bg-green-50 text-green-700 border-2 border-green-200': submitStatus === 'success',
                'bg-red-50 text-red-700 border-2 border-red-200': submitStatus === 'error'
              }"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <Icon 
                    :name="submitStatus === 'success' ? 'ph:check-circle' : 'ph:x-circle'" 
                    class="mr-3" 
                    size="24" 
                  />
                </div>
                <div>
                  <p class="font-semibold text-base mb-1">
                    {{ submitStatus === 'success' ? '🎉 Заявка отправлена успешно!' : '😞 Ошибка при отправке' }}
                  </p>
                  <p v-if="submitStatus === 'success'" class="text-sm">
                    Мы свяжемся с вами в указанное время. Спасибо за ваше доверие!
                  </p>
                  <p v-if="submitStatus === 'error'" class="text-sm">
                    {{ errorMessage || 'Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую' }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  fullName: '',
  email: '',
  countryCode: '+380',
  phoneNumber: '',
  country: '',
  target: '',
  actions: '',
  family: '',
  date: ''
});

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  country: '',
  target: '',
  actions: '',
  family: '',
  date: ''
});

const isSubmitting = ref(false);
const submitStatus = ref('');
const errorMessage = ref('');
const dateInput = ref(null);

const phonePlaceholders = {
  '+380': '99 123 45 67',
  '+1': '(555) 123-4567',
  '+7': '999 123-45-67',
  '+48': '123 456 789',
  '+49': '30 12345678',
  '+33': '1 23 45 67 89',
  '+44': '20 7946 0958',
  '+39': '06 1234 5678',
  '+34': '91 123 45 67',
  '+31': '20 123 4567',
  '+32': '2 123 45 67',
  '+41': '44 123 45 67',
  '+43': '1 234 5678',
  '+45': '12 34 56 78',
  '+46': '8 123 456 78',
  '+47': '123 45 678',
  '+358': '40 123 4567',
  '+420': '123 456 789',
  '+421': '2 1234 5678',
  '+36': '1 234 5678',
  '+40': '21 123 4567',
  '+359': '2 123 4567',
  '+385': '1 234 5678',
  '+386': '1 234 5678',
  '+372': '5123 4567',
  '+371': '2123 4567',
  '+370': '5 123 45 67',
  '+351': '21 123 4567',
  '+30': '21 1234 5678',
  '+90': '212 123 45 67',
  '+972': '50 123 4567'
};

const getPhonePlaceholder = (countryCode) => {
  return phonePlaceholders[countryCode] || '123456789';
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  // Remove all non-digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

const validateFullName = (name) => {
  // Check if contains at least 2 words (first name and last name)
  const words = name.trim().split(/\s+/);
  return words.length >= 2 && words.every(word => word.length >= 2);
};

const getMinDateTime = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  // Set to 9 AM next week
  nextWeek.setHours(9, 0, 0, 0);
  const year = nextWeek.getFullYear();
  const month = String(nextWeek.getMonth() + 1).padStart(2, '0');
  const day = String(nextWeek.getDate()).padStart(2, '0');
  const hours = String(nextWeek.getHours()).padStart(2, '0');
  const minutes = String(nextWeek.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getMaxDateTime = () => {
  const today = new Date();
  const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  // Set to 6 PM two weeks later
  twoWeeksLater.setHours(18, 0, 0, 0);
  const year = twoWeeksLater.getFullYear();
  const month = String(twoWeeksLater.getMonth() + 1).padStart(2, '0');
  const day = String(twoWeeksLater.getDate()).padStart(2, '0');
  const hours = String(twoWeeksLater.getHours()).padStart(2, '0');
  const minutes = String(twoWeeksLater.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '');
  
  // Full Name validation
  if (!form.fullName.trim()) {
    errors.fullName = 'Это поле обязательно для заполнения';
    isValid = false;
  } else if (!validateFullName(form.fullName)) {
    errors.fullName = 'Введите имя и фамилию (минимум 2 слова)';
    isValid = false;
  }
  
  // Email validation
  if (!form.email.trim()) {
    errors.email = 'Это поле обязательно для заполнения';
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = 'Введите корректный email адрес';
    isValid = false;
  }
  
  // Phone validation
  if (!form.phoneNumber.trim()) {
    errors.phone = 'Это поле обязательно для заполнения';
    isValid = false;
  } else if (!validatePhone(form.phoneNumber)) {
    errors.phone = 'Введите корректный номер телефона';
    isValid = false;
  }
  
  // Country validation
  if (!form.country.trim()) {
    errors.country = 'Это поле обязательно для заполнения';
    isValid = false;
  }
  
  // Target validation
  if (!form.target) {
    errors.target = 'Выберите цель прибывания';
    isValid = false;
  }
  
  // Actions validation
  if (!form.actions) {
    errors.actions = 'Выберите вариант';
    isValid = false;
  }
  
  // Family validation
  if (!form.family) {
    errors.family = 'Выберите вариант';
    isValid = false;
  }
  
  // Date validation
  if (!form.date) {
    errors.date = 'Выберите удобное время';
    isValid = false;
  } else {
    // Use the same validation logic as live validation
    validateDateLive();
    if (errors.date) {
      isValid = false;
    }
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  submitStatus.value = '';
  errorMessage.value = '';
  
  try {
    // Prepare data for submission
    const fullPhone = form.countryCode + form.phoneNumber.replace(/\D/g, '');
    const formData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: fullPhone,
      country: form.country.trim(),
      target: form.target,
      actions: form.actions,
      family: form.family,
      date: new Date(form.date).toISOString(),
      status: 'new'
    };
    
    // Submit to Directus
    const response = await $fetch('/api/directus/items/fullForm', {
      method: 'POST',
      body: formData
    });
    
    console.log('Full form submitted successfully:', response);
    
    // Reset form on success
    Object.keys(form).forEach(key => {
      if (key === 'countryCode') {
        form[key] = '+380';
      } else {
        form[key] = '';
      }
    });
    
    submitStatus.value = 'success';
    
    // Clear success message after 10 seconds
    setTimeout(() => {
      submitStatus.value = '';
    }, 10000);
    
  } catch (error) {
    console.error('Error submitting full form:', error);
    submitStatus.value = 'error';
    errorMessage.value = error?.data?.message || 'Произошла ошибка при отправке формы';
  } finally {
    isSubmitting.value = false;
  }
};

const formatPhone = () => {
  // Remove all non-digit characters
  let value = form.phoneNumber.replace(/\D/g, '');
  
  // Apply formatting based on country code
  switch (form.countryCode) {
    case '+1': // US/Canada
      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }
      break;
    case '+380': // Ukraine
      if (value.length >= 5) {
        value = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 7)} ${value.slice(7, 9)}`;
      } else if (value.length >= 2) {
        value = `${value.slice(0, 2)} ${value.slice(2)}`;
      }
      break;
    case '+7': // Russia/Kazakhstan
      if (value.length >= 7) {
        value = `${value.slice(0, 3)} ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
      } else if (value.length >= 3) {
        value = `${value.slice(0, 3)} ${value.slice(3)}`;
      }
      break;
    case '+48': // Poland
      if (value.length >= 6) {
        value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)}`;
      } else if (value.length >= 3) {
        value = `${value.slice(0, 3)} ${value.slice(3)}`;
      }
      break;
    default:
      // For other countries, just add spaces every 3 digits
      if (value.length > 3) {
        value = value.replace(/(\d{3})/g, '$1 ').trim();
      }
  }
  
  form.phoneNumber = value;
};

const onDateFocus = () => {
  // Force show the date picker
  setTimeout(() => {
    if (dateInput.value) {
      try {
        dateInput.value.showPicker();
      } catch (error) {
        // showPicker not supported, that's okay
        console.log('showPicker not supported:', error);
      }
    }
  }, 100);
  
  // Set a suggested default if no date is selected
  if (!form.date) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7); // Next week
    defaultDate.setHours(14, 0, 0, 0); // 2 PM
    
    // Don't auto-set, just provide visual hint
    console.log('Suggested date:', defaultDate.toLocaleString('ru-RU'));
  }
};

const formatDateRange = () => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const twoWeeks = new Date();
  twoWeeks.setDate(twoWeeks.getDate() + 14);
  
  const options = { 
    day: 'numeric', 
    month: 'short',
    timeZone: 'Europe/Kiev'
  };
  
  return `${nextWeek.toLocaleDateString('ru-RU', options)} по ${twoWeeks.toLocaleDateString('ru-RU', options)}`;
};

const validateDateLive = () => {
  // Clear previous date error
  errors.date = '';
  
  if (!form.date) {
    return; // Don't show error if field is empty
  }
  
  try {
    const selectedDate = new Date(form.date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
    const twoWeeksLater = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    
    // Check if date is valid
    if (isNaN(selectedDate.getTime())) {
      errors.date = '❌ Некорректная дата';
      return;
    }
    
    // Check if date is too early
    if (selectedDate < nextWeek) {
      const daysUntilAllowed = Math.ceil((nextWeek - today) / (1000 * 60 * 60 * 24));
      errors.date = `⏰ Слишком рано! Выберите дату минимум через ${daysUntilAllowed} дней`;
      return;
    }
    
    // Check if date is too late
    if (selectedDate > twoWeeksLater) {
      errors.date = '📅 Слишком поздно! Максимум - через 2 недели';
      return;
    }
    
    // Check day of week
    const dayOfWeek = selectedDate.getDay();
    const dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    
    if (dayOfWeek === 0) { // Sunday
      errors.date = '🚫 Воскресенье - выходной день. Выберите будний день или субботу';
      return;
    }
    
    // Check working hours
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    
    if (dayOfWeek === 6) { // Saturday
      if (hours < 10 || hours > 14 || (hours === 14 && minutes > 0)) {
        errors.date = '🕘 В субботу работаем с 10:00 до 14:00';
        return;
      }
    } else { // Weekdays
      if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
        errors.date = '🕘 В будние дни работаем с 9:00 до 18:00';
        return;
      }
    }
    
    // If we get here, the date is valid
    errors.date = '';
    
  } catch (error) {
    errors.date = '❌ Ошибка в формате даты';
  }
};
</script>

<style scoped>
/* Custom styling for select dropdown arrow */
select {
  background-image: none;
}

/* Improve datetime-local input styling */
input[type="datetime-local"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 10;
}

input[type="datetime-local"]::-webkit-inner-spin-button,
input[type="datetime-local"]::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

/* Firefox datetime-local styling */
input[type="datetime-local"]::-moz-focus-inner {
  border: 0;
}

/* Focus state for better accessibility */
input[type="datetime-local"]:focus {
  outline: none;
}

/* Make sure the input shows pointer cursor when hovering over the calendar area */
input[type="datetime-local"]:hover {
  cursor: pointer;
}
</style> 