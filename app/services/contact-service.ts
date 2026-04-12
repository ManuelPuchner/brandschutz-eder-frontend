import type { ContactRequest } from "~/types/contact";

export async function submitContactRequest(
  payload: Omit<ContactRequest, "id">,
) {
  return await $fetch("/spring/contact-requests", {
    method: "POST",
    body: payload,
  });
}
