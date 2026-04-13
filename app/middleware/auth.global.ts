import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  const requiresAuth = to.matched.some((record) => record.meta.auth !== false);

  if (requiresAuth && !isAuthenticated.value) {
    return navigateTo("/admin/login");
  }
});

