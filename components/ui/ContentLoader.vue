<template>
  <div class="space-y-8">
    <!-- Hero Content Skeleton -->
    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="animate-pulse space-y-4">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div class="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        <div class="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-11/12"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          <div class="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>
      </div>
    </div>
    
    <!-- Main Content Sections -->
    <div v-for="i in 3" :key="i" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="animate-pulse space-y-6">
        <!-- Section Header -->
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-gray-200 rounded"></div>
          <div class="h-7 bg-gray-200 rounded w-48"></div>
        </div>
        
        <!-- Content Blocks -->
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-11/12"></div>
            <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
          
          <!-- Simulated List -->
          <div class="space-y-2 ml-4">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Table Skeleton -->
    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div class="grid grid-cols-4 gap-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <!-- Table Rows -->
          <div v-for="row in 4" :key="row" class="px-4 py-3 border-b border-gray-200 last:border-b-0">
            <div class="grid grid-cols-4 gap-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props needed for this simple loader
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style> 