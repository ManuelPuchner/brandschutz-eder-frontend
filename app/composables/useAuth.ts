// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie<string | null>("auth_token", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const setToken = (t: string) => (token.value = t);
  const clearToken = () => (token.value = null);
  const isAuthenticated = computed(() => !!token.value);

  return { token, setToken, clearToken, isAuthenticated };
};