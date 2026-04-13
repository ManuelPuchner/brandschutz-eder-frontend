// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "nuxt-maplibre",
    "nuxt-auth-utils",
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  runtimeConfig: {
    // Server-only (NUXT_BACKEND_URL)
    backendUrl: '', 
    public: {
      // Client & Server (NUXT_PUBLIC_API_BASE)
      apiBase: '' 
    }
  },

  nitro: {
    devProxy: {
      "/spring": {
        target: "http://localhost:8080/api",
        changeOrigin: true,
      },
    },
  },
});