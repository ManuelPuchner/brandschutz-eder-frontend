import { reactive } from "vue";
import type { ContactRequest } from "~/types/contact";
import { submitContactRequest } from "~/services/contact-service";

export function useContactForm() {
  const { contactActions } = useContactRequest();
  const contactForm = reactive<Omit<ContactRequest, "id">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    status: "NEW",
  });

  const toast = reactive({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  function showToast(message: string, type: "success" | "error" = "success") {
    toast.message = message;
    toast.type = type;
    toast.visible = true;

    window.setTimeout(() => {
      toast.visible = false;
    }, 4200);
  }

  function hideToast() {
    toast.visible = false;
  }

  async function validateContactForm(data: Partial<typeof contactForm>) {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = "Name ist erforderlich";
    }

    if (!data.email?.trim()) {
      errors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    }

    if (!data.message?.trim()) {
      errors.message = "Nachricht ist erforderlich";
    }

    return Object.keys(errors).length
      ? Object.entries(errors).map(([name, message]) => ({ name, message }))
      : [];
  }

  async function onContactSubmit() {
    const validation = await validateContactForm(contactForm);

    if (validation.length > 0) {
      showToast("Bitte füllen Sie alle Pflichtfelder korrekt aus.", "error");
      return;
    }

    try {
      const result = await contactActions.create(contactForm);

      if (!result || (result as any).success === false) {
        throw new Error((result as any)?.message || "Unbekannter Serverfehler");
      }

      showToast(
        "Vielen Dank! Ihre Nachricht wurde erfolgreich gespeichert.",
        "success",
      );

      // Reset form
      Object.assign(contactForm, {
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      showToast(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        "error",
      );
    }
  }

  return {
    contactForm,
    toast,
    showToast,
    hideToast,
    validateContactForm,
    onContactSubmit,
  };
}
