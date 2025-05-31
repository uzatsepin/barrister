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
  } catch (error: any) {
    console.error('Directus proxy error:', {
      status: error.status || error.statusCode,
      message: error.message,
      url: directusUrl
    })
    
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      statusMessage: `Directus API error: ${error.message || 'Unknown error'}`
    })
  }
}) 