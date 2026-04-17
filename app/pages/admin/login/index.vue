<script setup lang="ts">
import * as z from "zod";

definePageMeta({ auth: false });

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
type Schema = z.output<typeof schema>;

const { login, loading, error } = useLogin();
const state = reactive<Partial<Schema>>({ username: "", password: "" });

async function onSubmit() {
  await login(state as Schema);
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-xl font-semibold">Sign in</h1>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField name="username" label="Username">
          <UInput v-model="state.username" placeholder="admin" class="w-full" />
        </UFormField>
        <UFormField name="password" label="Password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
            class="w-full"
          />
        </UFormField>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
        <UButton type="submit" block :loading="loading">Sign in</UButton>
      </UForm>
    </UCard>
  </div>
</template>
