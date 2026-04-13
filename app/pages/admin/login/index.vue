<!-- pages/login.vue -->
<script setup lang="ts">
import { useLogin } from '~/composables/useLogin';

definePageMeta({ auth: false })

const { login, loading, error } = useLogin()
const form = reactive({ username: '', password: '' })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-xl font-semibold">Sign in</h1>
      </template>

      <div class="space-y-4">
        <UFormField label="Username">
          <UInput v-model="form.username" placeholder="admin" />
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="form.password" type="password" placeholder="••••••••" />
        </UFormField>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      </div>

      <template #footer>
        <UButton block :loading="loading" @click="login(form)">
          Sign in
        </UButton>
      </template>
    </UCard>
  </div>
</template>