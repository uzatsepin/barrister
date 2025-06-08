<template>
  <div>
    <HomeHeroSection />
    <HomeServicesSection />
    <HomeAboutSection />
    <HomeAboutCompanySection />
    <HomeTestimonialsSection />
    <HomeBlogSection />
    <HomeContactSection />
  </div>
</template>

<script setup>
// SEO Configuration for Homepage
useSeoMeta({
  title: 'Иммиграционные услуги в США | BarristerCorp - Профессиональная помощь в получении виз',
  description: 'BarristerCorp - ведущая компания по иммиграционным услугам в США. Помогаем с получением виз, образованием, трудоустройством, бизнес-иммиграцией и покупкой недвижимости. 15+ лет опыта, 5000+ успешных дел.',
  keywords: 'иммиграция США, виза в США, образование в США, работа в США, бизнес в США, недвижимость в США, иммиграционный адвокат, BarristerCorp',
  author: 'BarristerCorp',
  robots: 'index, follow',
  
  // Open Graph
  ogTitle: 'BarristerCorp - Профессиональная иммиграция в США',
  ogDescription: 'Получите профессиональную помощь в иммиграции в США. Образование, работа, бизнес, недвижимость. 15+ лет опыта, 5000+ успешных дел.',
  ogImage: '/images/og-homepage.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: 'https://barristercorp.com',
  ogLocale: 'ru_RU',
  ogSiteName: 'BarristerCorp',
  
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: 'BarristerCorp - Иммиграционные услуги в США',
  twitterDescription: 'Профессиональная помощь в иммиграции в США. Образование, работа, бизнес, недвижимость. 15+ лет опыта.',
  twitterImage: '/images/og-homepage.jpg',
  twitterSite: '@BarristerCorp',
  twitterCreator: '@BarristerCorp',
  
  // Additional Meta Tags
  themeColor: '#1F2937', // primary-800 color
  colorScheme: 'light',
  viewport: 'width=device-width, initial-scale=1',
  
  // Language and Region
  language: 'ru',
  geo: {
    region: 'RU',
    placename: 'Russia'
  }
})

// Structured Data (JSON-LD)  
useHead({
  title: 'Иммиграционные услуги в США | BarristerCorp',
  htmlAttrs: {
    lang: 'ru'
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://barristercorp.com'
    },
    {
      rel: 'alternate',
      hreflang: 'ru',
      href: 'https://barristercorp.com'
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://barristercorp.com/en'
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: 'https://barristercorp.com'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BarristerCorp',
        description: 'Профессиональные иммиграционные услуги в США. Помощь с образованием, трудоустройством, бизнес-иммиграцией и недвижимостью.',
        url: 'https://barristercorp.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://barristercorp.com/images/logo.png',
          width: 300,
          height: 100
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://barristercorp.com/images/og-homepage.jpg',
          width: 1200,
          height: 630
        },
        foundingDate: '2008',
        founder: {
          '@type': 'Person',
          name: 'BarristerCorp Founder'
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressRegion: 'TX'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-936-289-6191',
          contactType: 'customer service',
          availableLanguage: ['Russian', 'English']
        },
        sameAs: [
          'https://facebook.com/barristercorp',
          'https://linkedin.com/company/barristercorp',
          'https://instagram.com/barristercorp'
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '500',
          bestRating: '5',
          worstRating: '1'
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: 25
        },
        serviceArea: {
          '@type': 'Country',
          name: 'United States'
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'BarristerCorp',
        url: 'https://barristercorp.com',
        description: 'Иммиграционные услуги в США - образование, работа, бизнес, недвижимость',
        publisher: {
          '@type': 'Organization',
          name: 'BarristerCorp'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://barristercorp.com/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Иммиграционные услуги в США',
        description: 'Полный спектр иммиграционных услуг: образование, трудоустройство, бизнес-иммиграция, покупка недвижимости в США',
        provider: {
          '@type': 'Organization',
          name: 'BarristerCorp'
        },
        serviceType: 'Immigration Services',
        areaServed: {
          '@type': 'Country',
          name: 'United States'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Иммиграционные услуги',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Образование в США',
                description: 'Помощь в поступлении в университеты и получении студенческих виз'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Трудоустройство в США',
                description: 'Помощь в получении рабочих виз и трудоустройстве'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Бизнес-иммиграция',
                description: 'Инвестиционные визы и открытие бизнеса в США'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Недвижимость в США',
                description: 'Помощь в покупке недвижимости и инвестировании'
              }
            }
          ]
        }
      })
    }
  ]
})

// OG Image Configuration
defineOgImage({
  component: 'Main',
  props: {
    title: 'BarristerCorp - Иммиграция в США',
    description: '15+ лет опыта • 5000+ успешных дел',
    background: '/images/usa-flag-bg.jpg',
    logo: '/images/logo-white.png'
  }
})
</script>