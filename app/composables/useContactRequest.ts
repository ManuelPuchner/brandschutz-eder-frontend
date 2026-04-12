import type { ContactRequest } from "~/types/contact";
import { useApiFactory } from "./useApiFactory";

export const useContactRequest = () => {
  const { $api, useGetAll, actions } =
    useApiFactory<ContactRequest>("contact-requests");

  // Custom action unique to this resource
  const updateStatus = async (id: number, status: ContactRequest["status"]) => {
    return await $api(`/contact-requests/${id}`, {
      method: "PATCH",
      query: { status },
    });
  };

  return {
    useContactRequestsData: useGetAll,
    contactActions: {
      ...actions, // Includes create, update, delete automatically
      updateStatus,
    },
  };
};
