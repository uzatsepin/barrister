# BarristerCorp Website

Веб-сайт иммиграционной компании BarristerCorp, построенный на Nuxt 3.

## Особенности

- **Современная архитектура**: Nuxt 3 с TypeScript
- **Управление состоянием**: Pinia для централизованного управления данными
- **Оптимизированные API запросы**: Устранены дублирующиеся запросы через централизованный content store
- **Динамический контент**: Интеграция с Directus CMS
- **SEO оптимизация**: Server-side rendering и мета-теги
- **Адаптивный дизайн**: Полностью отзывчивый интерфейс
- **Интернационализация**: Поддержка нескольких языков

## Компоненты

### ContactModal - Универсальный модал для связи

Универсальный компонент для связи с клиентами, который можно использовать на любой странице.

#### Использование

```vue
<template>
  <div>
    <!-- Любая кнопка для открытия модала -->
    <button @click="openContactModal">
      Записаться на консультацию
    </button>
  </div>
</template>

<script setup>
// Composable для работы с контактным модалом
const { openModal: openContactModal } = useContact()
</script>
```

#### Функциональность

- **Поля формы**: Имя, Email, Телефон, Сообщение
- **Валидация**: Проверка всех обязательных полей
- **Маска телефона**: Универсальная маска без привязки к стране
- **Анимации**: Плавные переходы открытия/закрытия
- **API интеграция**: Автоматическая отправка в Directus (`/api/directus/items/contacts`)
- **UX**: Закрытие по ESC, клику на overlay, автофокус

#### Store управление

Модал управляется через Pinia store (`useContactStore`):

```javascript
// Открыть модал
contactStore.openModal()

// Закрыть модал
contactStore.closeModal()

// Состояния
contactStore.isModalOpen
contactStore.isSubmitting
contactStore.isSuccess
contactStore.error
```

#### Структура данных

Отправляемые данные в Directus:

```json
{
  "name": "Имя клиента",
  "email": "email@example.com", 
  "phone": "+1 234 567 8901",
  "message": "Сообщение клиента",
  "status": "new"
}
```

Модал автоматически подключен к `app.vue` и доступен на всех страницах.

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
