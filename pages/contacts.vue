<template>
  <div class="section bg-gray-50">
    <div class="container-custom">
      <UiSectionHeading 
        :title="$t('contact.title')"
        :subtitle="$t('contact.description')"
      />
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Form -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold text-secondary-800 mb-6">{{ $t('contact.schedule') }}</h3>
          <ContactForm @submit-success="handleFormSuccess" />
        </div>
        
        <!-- Contact Information -->
        <div class="bg-primary-700 text-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold mb-6">Контактная информация</h3>
          
          <div class="space-y-6 mb-8">
            <div class="flex items-start">
              <div class="bg-primary-600 p-3 rounded-full mr-4 mt-1">
                <Icon name="ph:map-pin" size="24" />
              </div>
              <div>
                <div class="font-semibold text-lg mb-1">Наш офис:</div>
                <div class="text-gray-200">123 Business Street, New York, NY 10001</div>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-600 p-3 rounded-full mr-4 mt-1">
                <Icon name="ph:envelope" size="24" />
              </div>
              <div>
                <div class="font-semibold text-lg mb-1">Email:</div>
                <div class="text-gray-200">info@barristercorp.com</div>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-600 p-3 rounded-full mr-4 mt-1">
                <Icon name="ph:phone" size="24" />
              </div>
              <div>
                <div class="font-semibold text-lg mb-1">Телефон:</div>
                <div class="text-gray-200">+1 (800) 123-4567</div>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-primary-600 p-3 rounded-full mr-4 mt-1">
                <Icon name="ph:clock" size="24" />
              </div>
              <div>
                <div class="font-semibold text-lg mb-1">Часы работы:</div>
                <div class="text-gray-200">
                  <div>Понедельник - Пятница: 9:00 - 18:00</div>
                  <div>Суббота: 10:00 - 15:00</div>
                  <div>Воскресенье: Выходной</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="font-semibold text-lg mb-3">Социальные сети:</div>
            <div class="flex space-x-4">
              <a href="#" class="bg-primary-600 p-3 rounded-full hover:bg-primary-500 transition-colors">
                <Icon name="ph:facebook-logo" size="24" />
              </a>
              <a href="#" class="bg-primary-600 p-3 rounded-full hover:bg-primary-500 transition-colors">
                <Icon name="ph:instagram-logo" size="24" />
              </a>
              <a href="#" class="bg-primary-600 p-3 rounded-full hover:bg-primary-500 transition-colors">
                <Icon name="ph:twitter-logo" size="24" />
              </a>
              <a href="#" class="bg-primary-600 p-3 rounded-full hover:bg-primary-500 transition-colors">
                <Icon name="ph:linkedin-logo" size="24" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Map Section -->
      <div class="mt-12">
        <div class="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
          <img 
            src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Map" 
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleFormSuccess = () => {
  // Handle form submission success
  console.log('Form submitted successfully');
};
</script>