export default defineNuxtPlugin(async () => {
  // Initialize content store on server-side
  const { initializeContent } = useContent()
  
  try {
    await initializeContent()
    console.log('Content store initialized on server')
  } catch (error) {
    console.error('Failed to initialize content store on server:', error)
  }
}) 