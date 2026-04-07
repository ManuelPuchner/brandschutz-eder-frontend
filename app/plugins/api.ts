export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = $fetch.create({
    // THE FIX: On refresh (SSR), use the full URL. 
    // In the browser, use the /spring proxy.
    baseURL: import.meta.env.SSR 
      ? config.backendUrl 
      : config.public.apiBase,

    async onRequest({ options }) {
      // Add global headers here (e.g., Auth)
      // options.headers.set('Content-Type', 'application/json')
    },

    async onResponseError({ response }) {
      console.error(`[API Error ${response.status}]:`, response._data)
    }
  })

  // This makes $api available globally via useNuxtApp()
  return {
    provide: {
      api
    }
  }
})