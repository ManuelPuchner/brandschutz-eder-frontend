import { useAuth } from "~/composables/useAuth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const { token, clearToken } = useAuth();
  const router = useRouter();

  const api = $fetch.create({
    // THE FIX: On refresh (SSR), use the full URL.
    // In the browser, use the /spring proxy.
    baseURL: import.meta.env.SSR ? config.backendUrl : config.public.apiBase,

    async onRequest({ options }) {
      // Add global headers here (e.g., Auth)
      // options.headers.set('Content-Type', 'application/json')

      if (token.value) {
        options.headers.set("Authorization", `Bearer ${token.value}`);
      }
    },

    async onResponseError({ response }) {
      console.error(`[API Error ${response.status}]:`, response._data);

      if (response.status === 401) {
        clearToken();
        await router.push("/login");
      }
    },
  });

  // This makes $api available globally via useNuxtApp()
  return {
    provide: {
      api,
    },
  };
});
