import type { ContactRequest } from "~/types/contact";

// ACTIONS: Plain functions for state-changing operations
export const contactActions = {
  async updateStatus(id: number, status: ContactRequest["status"]) {
    const { $api } = useNuxtApp();
    
    // $api (ofetch) supports a 'query' object, so no need for URLSearchParams manually
    return await $api(`/contact-requests/${id}`, {
      method: "PATCH",
      query: { status } 
    });
  }
};

// DATA FETCHING: A proper Composable to prevent "Incompatible options" errors
export const useContactRequestsData = () => {
  const { $api } = useNuxtApp();
  
  return useAsyncData('contact-requests', () => 
    $api<ContactRequest[]>("/contact-requests")
  );
};