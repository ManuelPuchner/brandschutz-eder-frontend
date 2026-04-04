<script setup lang="ts">
import { useContactForm } from "./useContactForm";
import ContactFormTemplate from "./ContactFormTemplate.vue";

const {
  contactForm,
  toast,
  showToast,
  hideToast,
  validateContactForm,
  onContactSubmit,
} = useContactForm();
</script>

<template>
  <ContactFormTemplate
    :contact-form="contactForm"
    :toast="toast"
    :validate-contact-form="validateContactForm"
    :on-contact-submit="onContactSubmit"
    :hide-toast="hideToast"
  />
</template>
