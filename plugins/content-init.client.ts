export default defineNuxtPlugin(async () => {
  // Initialize content store on client-side
  const { initializeContent } = useContent()
  
  try {
    await initializeContent()
    console.log('Content store initialized successfully')
  } catch (error) {
    console.error('Failed to initialize content store:', error)
  }
}) 