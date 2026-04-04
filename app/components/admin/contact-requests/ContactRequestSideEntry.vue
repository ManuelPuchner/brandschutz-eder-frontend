<script setup lang="ts">
import type { ContactRequest } from "~/types/contact";
defineProps<{
  request: ContactRequest;
}>();
</script>

<template>
  <div
    class="flex items-center my-2 justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4"
  >
    <div>
      <p class="font-medium text-gray-800 dark:text-gray-200">
        {{ request.name }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ request.email }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-500 mt-1">
        {{ request.message }}
      </p>
    </div>
    <div class="text-right">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{
          new Date(request.createdAt as string).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>
      <UBadge
        :color="request.status === 'NEW' ? 'error' : 'success'"
        variant="soft"
      >
        {{ request.status }}
      </UBadge>
    </div>
  </div>
</template>
