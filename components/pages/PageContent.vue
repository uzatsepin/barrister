<template>
  <section ref="contentSection" class="section bg-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div
            class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200"
          >
            <h3 class="text-xl font-bold text-secondary-800 mb-6 flex items-center">
              <Icon name="ph:list" class="mr-2 text-primary-600" size="24" />
              {{ $t("common.navigation") }}
            </h3>

            <div v-if="loading" class="animate-pulse space-y-3">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-5 bg-gray-200 rounded w-full"></div>
              <div class="h-5 bg-gray-200 rounded w-5/6"></div>
              <div class="h-5 bg-gray-200 rounded w-4/6"></div>
              <div class="h-5 bg-gray-200 rounded w-full"></div>
              <div class="h-5 bg-gray-200 rounded w-3/5"></div>
            </div>

            <DynamicNavigation
              v-else
              :current-path="currentPath"
              :section="currentSection"
            />

            <!-- Quick Contact Card -->
            <div
              class="mt-8 bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200 shadow-sm"
            >
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon name="ph:headset" class="text-white" size="24" />
                </div>
                <h4 class="font-bold text-primary-700 mb-2">
                  {{ $t("common.needHelp") }}
                </h4>
                <p class="text-secondary-600 text-sm mb-4">
                  {{ $t("common.freeConsultation") }}
                </p>
                <button
                  @click="$emit('openContact')"
                  class="btn btn-primary w-full text-sm font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  {{ $t("common.contactUs") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <!-- Loading State -->
          <div v-if="loading" class="space-y-8">
            <UiContentLoader />
          </div>

          <!-- Actual Content -->
          <article v-else class="prose prose-lg max-w-none">
            <div
              v-if="pageData?.content"
              v-html="pageData.content"
              class="directus-content bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            ></div>

            <!-- Default content if no Directus data -->
            <div v-else class="space-y-8">
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200"
              >
                <h2
                  class="text-3xl font-bold text-secondary-800 mb-4 flex items-center"
                >
                  <Icon
                    name="ph:graduation-cap"
                    class="mr-3 text-primary-600"
                    size="32"
                  />
                  {{ title }}
                </h2>
                <p class="text-secondary-600 text-lg leading-relaxed">
                  {{ defaultDescription }}
                </p>
              </div>

              <!-- Features Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="feature in defaultFeatures"
                  :key="feature.title"
                  class="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4"
                    >
                      <Icon :name="feature.icon" class="text-primary-600" size="24" />
                    </div>
                    <h3 class="text-xl font-semibold text-secondary-800">
                      {{ feature.title }}
                    </h3>
                  </div>
                  <p class="text-secondary-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  pageData: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  currentPath: {
    type: String,
    required: true
  },
  currentSection: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  defaultDescription: {
    type: String,
    required: true
  },
  defaultFeatures: {
    type: Array,
    default: () => []
  }
});

defineEmits(['openContact']);

const contentSection = ref(null);

defineExpose({
  contentSection
});
</script> 