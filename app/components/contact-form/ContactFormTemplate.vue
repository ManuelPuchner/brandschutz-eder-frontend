<template>
  <div class="relative">
    <transition name="fade">
      <div
        v-if="toast.visible"
        class="fixed bottom-4 right-4 z-50 max-w-xs rounded-lg px-4 py-3 text-sm font-medium shadow-lg"
        :class="
          toast.type === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-rose-600 text-white'
        "
      >
        <div class="flex items-center justify-between gap-3">
          <span class="text-white">{{ toast.message }}</span>
          <button
            type="button"
            class="rounded px-2 py-1 opacity-80 hover:opacity-100 text-white"
            @click="hideToast"
          >
            ✕
          </button>
        </div>
      </div>
    </transition>

    <UForm
      :state="contactForm"
      :validate="validateContactForm"
      @submit="onContactSubmit"
      class="space-y-4"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField
          name="name"
          label="Name"
          required
          orientation="vertical"
          :ui="{ label: 'text-white', error: 'text-white' }"
        >
          <UInput
            v-model="contactForm.name"
            placeholder="Ihr vollständiger Name"
            class="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
          />
        </UFormField>

        <UFormField
          class=""
          name="email"
          label="E-Mail"
          required
          :ui="{ label: 'text-white', error: 'text-white' }"
        >
          <UInput
            v-model="contactForm.email"
            type="email"
            placeholder="ihre.email@beispiel.at"
            class="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
          />
        </UFormField>
        <UFormField
          class=""
          name="phone"
          label="Telefon"
          :ui="{ label: 'text-white', error: 'text-white' }"
        >
          <UInput
            v-model="contactForm.phone"
            type="tel"
            placeholder="+43 XXX XXXXXXX"
            class="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
          />
        </UFormField>

        <UFormField
          class=""
          name="company"
          label="Unternehmen"
          :ui="{ label: 'text-white', error: 'text-white' }"
        >
          <UInput
            v-model="contactForm.company"
            placeholder="Firmenname (optional)"
            class="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
          />
        </UFormField>
      </div>

      <UFormField
        name="message"
        label="Nachricht"
        required
        orientation="vertical"
        :ui="{ label: 'text-white', error: 'text-white' }"
      >
        <UTextarea
          v-model="contactForm.message"
          placeholder="Beschreiben Sie kurz Ihr Anliegen..."
          :rows="4"
          class="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
        />
      </UFormField>

      <UButton
        type="submit"
        size="lg"
        color="neutral"
        icon="i-lucide-send"
        trailing-icon="i-lucide-arrow-right"
        block
        loading-auto
      >
        Nachricht senden
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { ContactRequest } from "~/types/contact";

defineProps<{
  contactForm: Omit<ContactRequest, "createdAt" | "id" | "status">;
  toast: {
    visible: boolean;
    message: string;
    type: "success" | "error";
  };
  validateContactForm: (
    data: Partial<ContactRequest>,
  ) => Promise<Array<{ name: string; message: string }>>;
  onContactSubmit: () => Promise<void>;
  hideToast: () => void;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.24s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
