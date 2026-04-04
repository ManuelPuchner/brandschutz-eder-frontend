import type { ContactRequest } from "~/types/contact";

export async function useContactRequests() {
  return await useFetch<ContactRequest[]>("/spring/contact-requests", {
    method: "GET",
    server: false,
  });
}

export async function useUpdateContactRequestStatus(id: number, status: ContactRequest["status"]) {
  const payload = { status };
  const params = new URLSearchParams(payload as Record<string, string>);
  return await $fetch(`/spring/contact-requests/${id}?${params}`, {
    method: "PATCH"
  });
}