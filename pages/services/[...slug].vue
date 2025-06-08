<template>
  <div>
    <!-- Hero Section -->
    <ServiceHero
      :service-data="serviceData"
      :animated-clients="animatedClients"
      :animated-success="animatedSuccess"
      :animated-years="animatedYears"
      :countdown="countdown"
      @open-contact="openContactModal"
      @scroll-to-details="scrollToDetails"
    />

    <!-- What's Included Section -->
    <ServiceFeatures
      ref="detailsSection"
      :service-data="serviceData"
      @open-contact="openContactModal"
    />

    <!-- Process Section -->
    <ServiceProcess :service-data="serviceData" />

    <!-- Pricing Details Section -->
    <ServicePricing :service-data="serviceData" @open-contact="openContactModal" />

    <!-- FAQ Section -->
    <ServiceFAQ :service-data="serviceData" @open-contact="openContactModal" />

    <!-- Final CTA Section -->
    <ServiceCTA :service-data="serviceData" @open-contact="openContactModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ServiceHero from "@/components/services/ServiceHero.vue";
import ServiceFeatures from "@/components/services/ServiceFeatures.vue";
import ServiceProcess from "@/components/services/ServiceProcess.vue";
import ServicePricing from "@/components/services/ServicePricing.vue";
import ServiceFAQ from "@/components/services/ServiceFAQ.vue";
import ServiceCTA from "@/components/services/ServiceCTA.vue";

const route = useRoute();
const { openModal: openContactModal } = useContact();

// Refs for scrolling
const detailsSection = ref(null);

// Animated counters
const animatedClients = ref(0);
const animatedSuccess = ref(0);
const animatedYears = ref(0);

// Countdown timer
const countdown = ref("");

// Methods
const scrollToDetails = () => {
  detailsSection.value?.scrollIntoView({ behavior: "smooth" });
};

// Animate counters on mount
const animateCounters = () => {
  const targets = { clients: 500, success: 95, years: 15 };
  const duration = 2000;
  const steps = 60;
  const stepTime = duration / steps;

  let currentStep = 0;
  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    animatedClients.value = Math.floor(targets.clients * progress);
    animatedSuccess.value = Math.floor(targets.success * progress);
    animatedYears.value = Math.floor(targets.years * progress);

    if (currentStep >= steps) {
      clearInterval(timer);
      animatedClients.value = targets.clients;
      animatedSuccess.value = targets.success;
      animatedYears.value = targets.years;
    }
  }, stepTime);
};

// Update countdown timer
const updateCountdown = () => {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const diff = endOfDay - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdown.value = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Start animations and timers
onMounted(() => {
  setTimeout(animateCounters, 500);
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Service slug from URL
const serviceSlug = computed(() => {
  const slugArray = Array.isArray(route.params.slug)
    ? route.params.slug
    : [route.params.slug];
  return slugArray[0] || "checklist";
});

// Mock data for different services
const servicesData = {
  checklist: {
    title: "Чек-лист",
    subtitle:
      "Пошаговый план действий для самостоятельного прохождения иммиграционного процесса",
    price: 50,
    priceNote: "разовая оплата",
    priceDescription:
      "Получите детальный план со всеми необходимыми документами и сроками",
    badge: {
      icon: "ph:list-checks",
      text: "Для начинающих",
    },
    ctaText: "Получить чек-лист",
    keyFeatures: [
      { icon: "ph:file-text", title: "Пошаговый план" },
      { icon: "ph:clock", title: "Экономия времени" },
      { icon: "ph:shield-check", title: "Проверенная схема" },
    ],
    included: [
      {
        icon: "ph:list-bullets",
        title: "Подробный чек-лист",
        description: "Все этапы процесса с указанием сроков и порядка действий",
      },
      {
        icon: "ph:folder",
        title: "Список документов",
        description: "Полный перечень необходимых документов с требованиями к оформлению",
      },
      {
        icon: "ph:warning",
        title: "Типичные ошибки",
        description: "Разбор самых частых ошибок и способы их избежать",
      },
      {
        icon: "ph:lightbulb",
        title: "Полезные советы",
        description: "Лайфхаки и рекомендации из практического опыта",
      },
      {
        icon: "ph:calendar",
        title: "Временные рамки",
        description: "Реалистичные сроки для каждого этапа процесса",
      },
      {
        icon: "ph:link",
        title: "Полезные ссылки",
        description: "Ссылки на официальные сайты и ресурсы",
      },
    ],
    process: [
      {
        title: "Оформление заказа",
        description: "Оплачиваете услугу и получаете доступ к материалам",
        duration: "5 минут",
      },
      {
        title: "Получение чек-листа",
        description: "Скачиваете детальный план действий в удобном формате",
        duration: "Мгновенно",
      },
      {
        title: "Изучение материалов",
        description: "Знакомитесь с планом и требованиями к документам",
        duration: "2-3 часа",
      },
      {
        title: "Начало работы",
        description: "Следуете плану и собираете необходимые документы",
        duration: "По вашему темпу",
      },
    ],
    paymentOptions: [
      {
        title: "Банковская карта",
        description: "Visa, MasterCard, American Express",
      },
      {
        title: "PayPal",
        description: "Безопасная оплата через PayPal",
      },
    ],
    guarantees: [
      "Полный возврат средств в течение 7 дней",
      "Актуальная информация на 2024 год",
      "Техническая поддержка при скачивании",
    ],
    faq: [
      {
        question: "Что именно включает в себя чек-лист?",
        answer:
          "Чек-лист включает пошаговый план действий, полный список документов с требованиями, типичные ошибки, временные рамки и полезные ссылки на официальные ресурсы.",
      },
      {
        question: "Подходит ли чек-лист для моего случая?",
        answer:
          "Чек-лист универсален и подходит для большинства стандартных случаев. Если у вас особая ситуация, рекомендуем дополнительно заказать консультацию эксперта.",
      },
      {
        question: "Как я получу чек-лист после оплаты?",
        answer:
          "Сразу после оплаты вы получите письмо с ссылкой для скачивания материалов. Также доступ будет в вашем личном кабинете.",
      },
      {
        question: "Есть ли поддержка после покупки?",
        answer:
          "Да, мы предоставляем техническую поддержку по вопросам скачивания и доступа к материалам в течение 30 дней.",
      },
    ],
    finalCta: {
      description: "Начните свой путь с четкого плана действий",
      primaryButton: "Получить чек-лист сейчас",
    },
  },
  diy: {
    title: "Сделай сам",
    subtitle:
      "Полный гид с шаблонами документов и подробными инструкциями для самостоятельной подготовки",
    price: 150,
    priceNote: "разовая оплата",
    priceDescription:
      "Комплексный пакет с шаблонами, примерами и пошаговыми инструкциями",
    badge: {
      icon: "ph:wrench",
      text: "Самостоятельная работа",
    },
    ctaText: "Получить гид",
    keyFeatures: [
      { icon: "ph:file-doc", title: "Шаблоны документов" },
      { icon: "ph:book-open", title: "Подробные инструкции" },
      { icon: "ph:example", title: "Примеры заполнения" },
    ],
    included: [
      {
        icon: "ph:file-doc",
        title: "Шаблоны документов",
        description: "Готовые формы для заполнения всех необходимых документов",
      },
      {
        icon: "ph:book-open",
        title: "Подробный гид",
        description: "Пошаговые инструкции с объяснением каждого действия",
      },
      {
        icon: "ph:copy",
        title: "Примеры заполнения",
        description: "Реальные примеры правильно заполненных документов",
      },
      {
        icon: "ph:translate",
        title: "Образцы переводов",
        description: "Примеры переводов документов на английский язык",
      },
      {
        icon: "ph:checklist",
        title: "Контрольные списки",
        description: "Чек-листы для проверки готовности документов",
      },
      {
        icon: "ph:video",
        title: "Видео-инструкции",
        description: "Обучающие видео по заполнению сложных форм",
      },
    ],
    process: [
      {
        title: "Покупка пакета",
        description: "Оплачиваете услугу и получаете доступ в личный кабинет",
        duration: "5 минут",
      },
      {
        title: "Скачивание материалов",
        description: "Получаете все шаблоны, инструкции и примеры",
        duration: "10 минут",
      },
      {
        title: "Изучение гида",
        description: "Изучаете пошаговые инструкции и примеры",
        duration: "1-2 дня",
      },
      {
        title: "Подготовка документов",
        description: "Заполняете документы по шаблонам и инструкциям",
        duration: "1-2 недели",
      },
      {
        title: "Самопроверка",
        description: "Проверяете готовность по контрольным спискам",
        duration: "1 день",
      },
    ],
    paymentOptions: [
      {
        title: "Банковская карта",
        description: "Visa, MasterCard, American Express",
      },
      {
        title: "PayPal",
        description: "Безопасная оплата через PayPal",
      },
    ],
    guarantees: [
      "Возврат средств в течение 14 дней",
      "Обновления материалов в течение года",
      "Техническая поддержка 24/7",
    ],
    faq: [
      {
        question: "Смогу ли я справиться без юриста?",
        answer:
          "Да, наш гид разработан именно для самостоятельной работы. Мы предоставляем все необходимые инструкции и шаблоны для успешного прохождения процесса.",
      },
      {
        question: "Что если я допущу ошибку в документах?",
        answer:
          "Мы включили детальные примеры заполнения и контрольные списки для минимизации ошибок. Также есть чат поддержки для срочных вопросов.",
      },
      {
        question: "Актуальны ли шаблоны на текущий год?",
        answer:
          "Да, все материалы обновляются регулярно. Покупатели получают бесплатные обновления в течение года после покупки.",
      },
      {
        question: "Есть ли поддержка в процессе работы?",
        answer:
          "Да, мы предоставляем техническую поддержку и отвечаем на вопросы по использованию материалов в течение года.",
      },
    ],
    finalCta: {
      description: "Получите все необходимые материалы для самостоятельной работы",
      primaryButton: "Получить полный пакет",
    },
  },
  expert: {
    title: "Сопровождение эксперта",
    subtitle:
      "Персональное сопровождение паралигала на всех этапах процесса с сохранением полного контроля",
    price: 800,
    priceNote: "за весь процесс",
    priceDescription: "Полное сопровождение от консультации до подачи документов",
    badge: {
      icon: "ph:user-gear",
      text: "Профессиональное сопровождение",
    },
    ctaText: "Записаться на консультацию",
    keyFeatures: [
      { icon: "ph:handshake", title: "Личный эксперт" },
      { icon: "ph:chat-circle", title: "Постоянная связь" },
      { icon: "ph:shield", title: "Контроль процесса" },
    ],
    included: [
      {
        icon: "ph:video",
        title: "Первичная консультация",
        description: "Детальный разбор вашего случая и составление стратегии",
      },
      {
        icon: "ph:folder-open",
        title: "Помощь в сборе документов",
        description: "Пошаговое сопровождение сбора и подготовки документов",
      },
      {
        icon: "ph:check-square",
        title: "Проверка документов",
        description: "Тщательная проверка всех документов перед подачей",
      },
      {
        icon: "ph:envelope",
        title: "Переписка с органами",
        description: "Ведение корреспонденции с государственными органами",
      },
      {
        icon: "ph:phone",
        title: "Постоянная связь",
        description: "Доступность эксперта для ответов на вопросы",
      },
      {
        icon: "ph:calendar-check",
        title: "Контроль сроков",
        description: "Отслеживание всех дедлайнов и важных дат",
      },
    ],
    process: [
      {
        title: "Первичная консультация",
        description: "Знакомство, анализ ситуации и определение стратегии",
        duration: "1-2 часа",
      },
      {
        title: "Планирование работы",
        description: "Составление детального плана действий и timeline",
        duration: "1 неделя",
      },
      {
        title: "Сбор документов",
        description: "Пошаговое сопровождение процесса сбора документов",
        duration: "2-4 недели",
      },
      {
        title: "Подготовка заявления",
        description: "Заполнение форм и подготовка финального пакета",
        duration: "1-2 недели",
      },
      {
        title: "Подача и отслеживание",
        description: "Подача документов и мониторинг статуса рассмотрения",
        duration: "Весь период рассмотрения",
      },
    ],
    paymentOptions: [
      {
        title: "Полная предоплата",
        description: "Скидка 10% при оплате всей суммы сразу",
      },
      {
        title: "Поэтапная оплата",
        description: "Оплата по этапам работы",
      },
    ],
    guarantees: [
      "Возврат 50% при отказе по нашей вине",
      "Бесплатная повторная подача при технических ошибках",
      "Постоянная связь в рабочее время",
    ],
    faq: [
      {
        question: "Чем отличается работа с паралигалом от адвоката?",
        answer:
          "Паралигал специализируется на процедурных вопросах и документообороте, что позволяет получить качественную помощь по более доступной цене. При необходимости юридического представительства мы подключаем проверенных адвокатов.",
      },
      {
        question: "Какие гарантии предоставляются?",
        answer:
          "Мы гарантируем качественную подготовку документов и соблюдение всех процедур. При отказе по нашей вине возвращаем 50% стоимости услуги.",
      },
      {
        question: "Как происходит общение в процессе работы?",
        answer:
          "Мы поддерживаем постоянную связь через удобные для вас каналы: WhatsApp, Telegram, электронная почта или видеозвонки.",
      },
      {
        question: "Что если понадобится адвокат?",
        answer:
          "При необходимости юридического представительства мы поможем подобрать проверенного иммиграционного адвоката и обеспечим плавную передачу дела.",
      },
    ],
    finalCta: {
      description: "Получите профессиональную поддержку на каждом этапе",
      primaryButton: "Начать сопровождение",
    },
  },
  full: {
    title: "Полное сопровождение",
    subtitle:
      "Максимальная надежность: работа с командой эксперта и проверенного иммиграционного адвоката",
    price: 2500,
    priceNote: "комплексная услуга",
    priceDescription:
      "Полный цикл от консультации до получения результата с командой профессионалов",
    badge: {
      icon: "ph:crown",
      text: "Премиум услуга",
    },
    ctaText: "Начать работу с командой",
    keyFeatures: [
      { icon: "ph:users-three", title: "Команда экспертов" },
      { icon: "ph:shield-check", title: "100% гарантия качества" },
      { icon: "ph:trophy", title: "Максимальный результат" },
    ],
    included: [
      {
        icon: "ph:strategy",
        title: "Разработка стратегии",
        description: "Комплексный анализ случая и выбор оптимальной стратегии",
      },
      {
        icon: "ph:users",
        title: "Команда специалистов",
        description: "Паралигал + иммиграционный адвокат с 15+ лет опыта",
      },
      {
        icon: "ph:file-doc",
        title: "Полная подготовка документов",
        description: "Сбор, подготовка и проверка всех необходимых документов",
      },
      {
        icon: "ph:gavel",
        title: "Юридическое представительство",
        description: "Представление интересов в государственных органах",
      },
      {
        icon: "ph:clock",
        title: "Круглосуточная поддержка",
        description: "Доступность команды для решения срочных вопросов",
      },
      {
        icon: "ph:certificate",
        title: "Гарантия результата",
        description: "Максимальные шансы на положительное решение",
      },
    ],
    process: [
      {
        title: "Стратегическая консультация",
        description: "Встреча с адвокатом для анализа случая и выбора стратегии",
        duration: "2-3 часа",
      },
      {
        title: "Формирование команды",
        description: "Назначение персонального паралигала и координация работы",
        duration: "1 неделя",
      },
      {
        title: "Подготовка дела",
        description: "Комплексная подготовка всех документов и доказательств",
        duration: "4-8 недель",
      },
      {
        title: "Подача и представительство",
        description: "Подача документов и юридическое сопровождение процесса",
        duration: "Весь период рассмотрения",
      },
      {
        title: "Получение результата",
        description: "Получение решения и помощь в дальнейших действиях",
        duration: "По ситуации",
      },
    ],
    paymentOptions: [
      {
        title: "Предоплата 50%",
        description: "50% при подписании договора, 50% по завершении",
      },
      {
        title: "Рассрочка",
        description: "Индивидуальный план рассрочки до 6 месяцев",
      },
    ],
    guarantees: [
      "Возврат 70% при отказе по нашей вине",
      "Бесплатная апелляция в случае отказа",
      "Круглосуточная поддержка на всех этапах",
      "Юридическая ответственность по договору",
    ],
    faq: [
      {
        question: "Какие преимущества полного сопровождения?",
        answer:
          "Полное сопровождение дает максимальные шансы на успех, так как над вашим делом работает команда профессионалов. Адвокат отвечает за стратегию и юридические аспекты, а паралигал - за координацию и документооборот.",
      },
      {
        question: "Как выбираются адвокаты для команды?",
        answer:
          "Мы работаем только с проверенными иммиграционными адвокатами с опытом 15+ лет и высоким процентом успешных дел. Каждый адвокат проходит тщательный отбор.",
      },
      {
        question: "Что включает юридическое представительство?",
        answer:
          "Адвокат представляет ваши интересы во всех инстанциях, ведет переговоры с органами власти, участвует в слушаниях и обеспечивает полную юридическую защиту.",
      },
      {
        question: "Возможна ли рассрочка платежа?",
        answer:
          "Да, мы предлагаем гибкие условия оплаты, включая рассрочку до 6 месяцев. Детали обсуждаются индивидуально при заключении договора.",
      },
    ],
    finalCta: {
      description: "Доверьте свое дело команде профессионалов с безупречной репутацией",
      primaryButton: "Начать работу с командой",
    },
  },
};

// Get current service data
const serviceData = computed(() => {
  return servicesData[serviceSlug.value] || servicesData.checklist;
});

// SEO
const serviceTitle = `${serviceData.value.title} | BarristerCorp`;
const serviceDescription = serviceData.value.subtitle;
const serviceKeywords = `${serviceData.value.title}, иммиграционные услуги, BarristerCorp, цена ${serviceData.value.price}$, ${serviceSlug.value}`;

// SEO Meta Tags
useSeoMeta({
  title: serviceTitle,
  description: serviceDescription,
  keywords: serviceKeywords,
  author: 'BarristerCorp',
  robots: 'index, follow',
  
  // Open Graph
  ogTitle: serviceTitle,
  ogDescription: serviceDescription,
  ogImage: `/images/services/${serviceSlug.value}-og.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'product',
  ogUrl: `https://barristercorp.com${route.path}`,
  ogSiteName: 'BarristerCorp',
  
  // Product specific OG tags
  productPriceAmount: serviceData.value.price,
  productPriceCurrency: 'USD',
  
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: serviceTitle,
  twitterDescription: serviceDescription,
  twitterImage: `/images/services/${serviceSlug.value}-og.jpg`
});

// Additional head config with structured data
useHead({
  title: serviceTitle,
  link: [
    {
      rel: 'canonical',
      href: `https://barristercorp.com${route.path}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: serviceData.value.title,
        description: serviceDescription,
        image: `/images/services/${serviceSlug.value}-og.jpg`,
        url: `https://barristercorp.com${route.path}`,
        brand: {
          '@type': 'Organization',
          name: 'BarristerCorp'
        },
        offers: {
          '@type': 'Offer',
          price: serviceData.value.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString(),
          seller: {
            '@type': 'Organization',
            name: 'BarristerCorp',
            url: 'https://barristercorp.com'
          }
        },
        provider: {
          '@type': 'Organization',
          name: 'BarristerCorp',
          logo: {
            '@type': 'ImageObject',
            url: 'https://barristercorp.com/images/logo.png'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['Russian', 'English']
          }
        },
        category: 'Immigration Services',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '150'
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5'
            },
            author: {
              '@type': 'Person',
              name: 'Анна Петрова'
            },
            reviewBody: 'Отличная помощь в подготовке документов. Все прошло быстро и качественно.'
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: 'https://barristercorp.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Услуги',
            item: 'https://barristercorp.com/services'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: serviceData.value.title,
            item: `https://barristercorp.com${route.path}`
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceData.value.title,
        description: serviceDescription,
        provider: {
          '@type': 'Organization',
          name: 'BarristerCorp'
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States'
        },
        serviceType: 'Immigration Services',
        offers: {
          '@type': 'Offer',
          price: serviceData.value.price,
          priceCurrency: 'USD'
        }
      })
    }
  ]
});

// OG Image for service pages
defineOgImage({
  component: 'Service',
  props: {
    title: serviceData.value.title,
    description: serviceDescription,
    price: serviceData.value.price,
    priceNote: serviceData.value.priceNote,
    badge: serviceData.value.badge,
    keyFeatures: serviceData.value.keyFeatures
  }
});
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #10b981, #3b82f6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #059669, #2563eb);
}
</style>
