import { useAuth } from "./useAuth";

// composables/useLogin.ts
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const { $api } = useNuxtApp();
  const { setToken } = useAuth();
  const router = useRouter();

  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await $api<LoginResponse>("/auth/login", {
        method: "POST",
        body: credentials,
      });
      console.log("Login successful, received token:", data.token);
      setToken(data.token);
      await router.push("/admin");
    } catch (e) {
      error.value = "Invalid username or password";
    } finally {
      loading.value = false;
    }
  };

  return { login, loading, error };
};