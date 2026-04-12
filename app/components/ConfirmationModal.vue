<!-- components/ConfirmationModal.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { useConfirmation } from "~/composables/useConfirmation";

const { _state: state, _resolve } = useConfirmation();

const variantConfig = computed(() => {
  switch (state.value.variant) {
    case "danger":
      return {
        icon: state.value.icon ?? "i-heroicons-exclamation-triangle",
        iconClass: "text-red-500",
        confirmColor: "error" as const,
      };
    case "warning":
      return {
        icon: state.value.icon ?? "i-heroicons-exclamation-circle",
        iconClass: "text-warning-500",
        confirmColor: "warning" as const,
      };
    default:
      return {
        icon: state.value.icon ?? "i-heroicons-question-mark-circle",
        iconClass: "text-gray-400",
        confirmColor: "primary" as const,
      };
  }
});
</script>

<template>
  <UModal :open="state.isOpen" :prevent-close="false">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              :name="variantConfig.icon"
              class="size-5 shrink-0"
              :class="variantConfig.iconClass"
            />
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ state.title }}
            </h3>
          </div>
        </template>

        <p
          v-if="state.description"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ state.description }}
        </p>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="ghost"
              :label="state.cancelLabel"
              @click="_resolve(false)"
            />
            <UButton
              :color="variantConfig.confirmColor"
              :label="state.confirmLabel"
              @click="_resolve(true)"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
