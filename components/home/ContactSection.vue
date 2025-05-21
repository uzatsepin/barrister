<template>
  <section class="section bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden opacity-5">
      <div class="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary-200 rounded-full blur-3xl"></div>
      <div class="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent-200 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative">
      <UiSectionHeading 
        :title="$t('contact.title')" 
        :subtitle="$t('contact.description')" 
        badge="Свяжитесь с нами"
      >
        <template #badge-icon>
          <Icon name="ph:phone-call" class="w-4 h-4" />
        </template>
      </UiSectionHeading>
      
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
        <!-- Contact Form -->
        <div class="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8 relative z-10 transform hover:scale-[1.01] transition-all duration-300" data-aos="fade-right">
          <h3 class="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
            <Icon name="ph:calendar-check" class="mr-2 text-primary-500" size="28" />
            {{ $t('contact.schedule') }}
          </h3>
          <ContactForm />
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-2">
          <!-- Info Card -->
          <div class="bg-primary-600 rounded-2xl shadow-xl p-8 text-white mb-6 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300" data-aos="fade-left">
            <!-- Decorative background -->
            <div class="absolute -right-16 -top-16 w-32 h-32 bg-primary-500 rounded-full opacity-30"></div>
            <div class="absolute -left-16 -bottom-16 w-32 h-32 bg-primary-500 rounded-full opacity-30"></div>
            
            <h3 class="text-2xl font-bold mb-6 relative">{{ $t('contact.title') }}</h3>
            
            <ul class="space-y-6 relative">
              <li class="flex items-center transform hover:translate-x-1 transition-transform" data-aos="fade-up" data-aos-delay="100">
                <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ph:map-pin" class="text-white" size="24" />
                </div>
                <div>
                  <div class="text-white opacity-80 text-sm mb-1">Наш офис:</div>
                  <div class="font-medium">123 Business Street, New York, NY 10001</div>
                </div>
              </li>
              
              <li class="flex items-center transform hover:translate-x-1 transition-transform" data-aos="fade-up" data-aos-delay="200">
                <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ph:envelope" class="text-white" size="24" />
                </div>
                <div>
                  <div class="text-white opacity-80 text-sm mb-1">Email:</div>
                  <a href="mailto:info@barristercorp.com" class="font-medium hover:underline">info@barristercorp.com</a>
                </div>
              </li>
              
              <li class="flex items-center transform hover:translate-x-1 transition-transform" data-aos="fade-up" data-aos-delay="300">
                <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ph:phone" class="text-white" size="24" />
                </div>
                <div>
                  <div class="text-white opacity-80 text-sm mb-1">Телефон:</div>
                  <a href="tel:+18001234567" class="font-medium hover:underline">+1 (800) 123-4567</a>
                </div>
              </li>
              
              <li class="flex items-center transform hover:translate-x-1 transition-transform" data-aos="fade-up" data-aos-delay="400">
                <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 shadow-lg">
                  <Icon name="ph:clock" class="text-white" size="24" />
                </div>
                <div>
                  <div class="text-white opacity-80 text-sm mb-1">Режим работы:</div>
                  <div class="font-medium">Пн-Пт: 9:00 - 18:00</div>
                </div>
              </li>
            </ul>
            
            <!-- Social Media -->
            <div class="mt-8 relative" data-aos="fade-up" data-aos-delay="500">
              <div class="font-semibold mb-3">Социальные сети:</div>
              <div class="flex space-x-2">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url" 
                  class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon :name="social.icon" size="20" />
                </a>
              </div>
            </div>
          </div>
          
          <!-- Map -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300" data-aos="fade-up" data-aos-delay="600">
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702,-74.011&key=YOUR_API_KEY" 
              alt="Map location" 
              class="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const socialLinks = [
  { name: 'Facebook', icon: 'ph:facebook-logo', url: '#' },
  { name: 'Instagram', icon: 'ph:instagram-logo', url: '#' },
  { name: 'Twitter', icon: 'ph:twitter-logo', url: '#' },
  { name: 'LinkedIn', icon: 'ph:linkedin-logo', url: '#' }
];
</script> 