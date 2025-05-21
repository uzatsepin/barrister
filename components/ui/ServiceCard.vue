<template>
  <div class="card p-6 h-full flex flex-col">
    <div class="flex items-center mb-4">
      <div class="bg-primary-50 p-3 rounded-full">
        <Icon :name="icon" class="text-primary-600" size="24" />
      </div>
      <h3 class="text-xl font-semibold ml-3">{{ title }}</h3>
    </div>
    <p class="text-secondary-600 mb-4 flex-grow">{{ description }}</p>
    <div v-if="price" class="mb-4">
      <div class="text-lg font-semibold text-accent-600">{{ price }} USD</div>
      <div class="text-sm text-secondary-500">{{ priceDetail }}</div>
    </div>
    <div class="mt-auto">
      <NuxtLink :to="link" class="btn btn-outline inline-block">
        {{ $t('common.readMore') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'ph:book-open'
  },
  price: {
    type: [String, Number],
    default: null
  },
  priceDetail: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    required: true
  }
});
</script>