export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const path = getRouterParam(event, 'path')
  const query = getQuery(event)
  
  const directusUrl = `${config.public.directusUrl}/${path}`
  try {
    const response = await $fetch(directusUrl, {
      method: getMethod(event),
      query,
      body: event.node.req.method !== 'GET' ? await readBody(event) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    
    return response
  } catch (error) {
    console.error('Directus proxy error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch from Directus'
    })
  }
}) 