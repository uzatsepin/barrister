<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-primary-700 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Учеба в США" 
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      <div class="container-custom relative z-10 py-16 md:py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {{ $t('study.title') }}
          </h1>
          <p class="text-xl mb-8 text-gray-100 animate-slide-up">
            Получите образование в США и откройте для себя новые возможности. Мы поможем вам на каждом этапе: от выбора программы до получения визы.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Main Content -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-gray-50 rounded-lg shadow-md p-6 sticky top-24">
              <h3 class="text-xl font-bold text-secondary-800 mb-4">Навигация</h3>
              
              <div class="space-y-4">
                <div>
                  <div class="font-medium text-primary-600 mb-2">{{ $t('study.format') }}</div>
                  <ul class="space-y-1 pl-4">
                    <li>
                      <NuxtLink to="/study/online" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.online') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/offline" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.offline') }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div class="font-medium text-primary-600 mb-2">{{ $t('study.courses') }}</div>
                  <ul class="space-y-1 pl-4">
                    <li>
                      <NuxtLink to="/study/courses/language" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.language') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/courses/professional" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.professional') }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div class="font-medium text-primary-600 mb-2">{{ $t('study.degree') }}</div>
                  <ul class="space-y-1 pl-4">
                    <li>
                      <NuxtLink to="/study/degree/bachelor" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.bachelor') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/degree/master" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.master') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/degree/phd" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('study.phd') }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div class="font-medium text-primary-600 mb-2">{{ $t('study.visa') }}</div>
                  <ul class="space-y-1 pl-4">
                    <li>
                      <NuxtLink to="/study/visa/checklist" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('services.checklist') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/visa/self-service" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('services.selfService') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/visa/paralegal" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('services.paralegal') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/visa/attorney" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('services.attorney') }}
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/study/visa/chatbot" class="text-secondary-700 hover:text-primary-600 transition-colors">
                        {{ $t('services.chatbot') }}
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-8 bg-primary-50 p-4 rounded-lg border border-primary-100">
                <h4 class="font-bold text-primary-700 mb-2">Нужна консультация?</h4>
                <p class="text-secondary-600 text-sm mb-3">Оставьте заявку, и наши специалисты свяжутся с вами для бесплатной консультации</p>
                <button class="btn btn-primary w-full">
                  {{ $t('common.contactUs') }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-secondary-800 mb-6">Образование в США</h2>
            
            <p class="text-secondary-600 mb-6">
              Образование в США считается одним из самых престижных в мире. Американские университеты и колледжи предлагают высококачественные программы обучения практически по всем специальностям. Дипломы, полученные в США, признаются во всем мире и открывают широкие возможности для карьерного роста и личного развития.
            </p>
            
            <p class="text-secondary-600 mb-6">
              Компания BarristerCorp поможет вам на каждом этапе поступления в американские учебные заведения: от выбора программы и учебного заведения до подачи документов и получения студенческой визы.
            </p>
            
            <img 
              src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Университет в США" 
              class="w-full h-auto rounded-lg shadow-md mb-8"
            />
            
            <h3 class="text-2xl font-bold text-secondary-800 mb-4">Преимущества обучения в США</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span class="font-semibold">Престижные дипломы</span>
                </div>
                <p class="text-secondary-600 text-sm">
                  Дипломы американских вузов признаются и высоко ценятся во всем мире
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span class="font-semibold">Гибкая система обучения</span>
                </div>
                <p class="text-secondary-600 text-sm">
                  Возможность самостоятельно формировать учебный план и выбирать предметы
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span class="font-semibold">Практический подход</span>
                </div>
                <p class="text-secondary-600 text-sm">
                  Обучение ориентировано на практическое применение знаний и развитие навыков
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center mb-2">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span class="font-semibold">Мультикультурная среда</span>
                </div>
                <p class="text-secondary-600 text-sm">
                  Обучение в международной среде и знакомство с разными культурами
                </p>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-secondary-800 mb-4">Наши услуги</h3>
            
            <p class="text-secondary-600 mb-6">
              Компания BarristerCorp предлагает комплексное сопровождение для поступления в учебные заведения США:
            </p>
            
            <div class="space-y-4 mb-8">
              <div class="flex items-start">
                <div class="bg-primary-50 p-2 rounded-full mr-3 mt-1">
                  <Icon name="ph:graduation-cap" class="text-primary-600" size="20" />
                </div>
                <div>
                  <div class="font-semibold text-secondary-800">Подбор учебного заведения и программы</div>
                  <p class="text-secondary-600">
                    Поможем выбрать подходящий вуз и программу обучения в соответствии с вашими целями, бюджетом и академическими показателями
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-primary-50 p-2 rounded-full mr-3 mt-1">
                  <Icon name="ph:file-text" class="text-primary-600" size="20" />
                </div>
                <div>
                  <div class="font-semibold text-secondary-800">Подготовка и подача документов</div>
                  <p class="text-secondary-600">
                    Поможем подготовить все необходимые документы для поступления и подадим их в выбранные учебные заведения
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-primary-50 p-2 rounded-full mr-3 mt-1">
                  <Icon name="ph:passport" class="text-primary-600" size="20" />
                </div>
                <div>
                  <div class="font-semibold text-secondary-800">Визовое сопровождение</div>
                  <p class="text-secondary-600">
                    Окажем полную поддержку при получении студенческой визы F-1, включая подготовку к интервью в посольстве
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-primary-50 p-2 rounded-full mr-3 mt-1">
                  <Icon name="ph:house" class="text-primary-600" size="20" />
                </div>
                <div>
                  <div class="font-semibold text-secondary-800">Помощь с адаптацией</div>
                  <p class="text-secondary-600">
                    Поможем с поиском жилья, организацией транспорта и решением других бытовых вопросов по прибытии в США
                  </p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ServiceCard 
                title="Языковые курсы"
                description="Интенсивные программы изучения английского языка для академических и профессиональных целей"
                icon="ph:translate"
                price="от 1,500"
                priceDetail="за 4 недели обучения"
                link="/study/courses/language"
              />
              <ServiceCard 
                title="Professional Degree"
                description="Профессиональные программы для получения сертификатов и лицензий в различных областях"
                icon="ph:certificate"
                price="от 5,000"
                priceDetail="за семестр"
                link="/study/courses/professional"
              />
              <ServiceCard 
                title="Bachelor's Degree"
                description="Программы бакалавриата в ведущих американских университетах и колледжах"
                icon="ph:student"
                price="от 10,000"
                priceDetail="за семестр"
                link="/study/degree/bachelor"
              />
              <ServiceCard 
                title="Master's Degree"
                description="Магистерские программы, включая престижные программы MBA в бизнес-школах США"
                icon="ph:graduation-cap"
                price="от 15,000"
                priceDetail="за семестр"
                link="/study/degree/master"
              />
            </div>
            
            <div class="bg-primary-50 p-6 rounded-lg border border-primary-100 mb-8">
              <h3 class="text-xl font-bold text-primary-700 mb-3">Студенческая виза F-1</h3>
              <p class="text-secondary-600 mb-4">
                Для обучения в США студентам необходимо получить визу F-1. Наша компания предлагает различные уровни поддержки при получении студенческой визы:
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span>Чек-лист документов для самостоятельной подготовки</span>
                </li>
                <li class="flex items-center">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span>Пакет "Сделай сам" с подробными инструкциями</span>
                </li>
                <li class="flex items-center">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span>Сопровождение паралегала на всех этапах</span>
                </li>
                <li class="flex items-center">
                  <Icon name="ph:check-circle" class="text-primary-600 mr-2" size="20" />
                  <span>Полное сопровождение паралегала и адвоката</span>
                </li>
              </ul>
              <div class="mt-4">
                <NuxtLink to="/study/visa/checklist" class="btn btn-primary">
                  Подробнее о визе F-1
                </NuxtLink>
              </div>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-bold text-secondary-800 mb-4">Часто задаваемые вопросы</h3>
              
              <div class="space-y-4">
                <div>
                  <div class="font-semibold text-secondary-800 mb-1">
                    Какие документы нужны для поступления в университет США?
                  </div>
                  <p class="text-secondary-600">
                    Для поступления в американский университет обычно требуются: аттестат/диплом с переводом и нотариальным заверением, результаты языковых тестов (TOEFL/IELTS), мотивационное письмо, рекомендательные письма и результаты стандартизированных тестов (SAT/ACT для бакалавриата, GRE/GMAT для магистратуры).
                  </p>
                </div>
                
                <div>
                  <div class="font-semibold text-secondary-800 mb-1">
                    Сколько стоит обучение в США?
                  </div>
                  <p class="text-secondary-600">
                    Стоимость обучения варьируется в зависимости от учебного заведения и программы. В среднем, годовая стоимость обучения в государственных вузах составляет от $20,000 до $40,000, в частных — от $30,000 до $60,000 и выше. При этом существуют возможности получения стипендий и грантов.
                  </p>
                </div>
                
                <div>
                  <div class="font-semibold text-secondary-800 mb-1">
                    Можно ли работать во время учебы в США?
                  </div>
                  <p class="text-secondary-600">
                    Студенты с визой F-1 имеют право работать на кампусе до 20 часов в неделю во время учебы и полный рабочий день во время каникул. После первого года обучения можно также подать заявку на прохождение практики по специальности (CPT/OPT).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Study page component
</script>