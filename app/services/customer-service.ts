import type { Customer, CustomerCreate } from "~/types/customer";

// ACTIONS: Use plain functions with $api
export const customerActions = {
  async create(customer: CustomerCreate) {
    const { $api } = useNuxtApp();
    return $api<Customer>("/customers", { method: "POST", body: customer });
  },
  async update(id: number, customer: CustomerCreate) {
    const { $api } = useNuxtApp();
    return $api<Customer>(`/customers/${id}`, { method: "PUT", body: customer });
  },
  async delete(id: number) {
    const { $api } = useNuxtApp();
    return $api<boolean>(`/customers/${id}`, { method: "DELETE" });
  }
};

// DATA FETCHING: Use a proper Composable pattern
export const useCustomerData = (id: number) => {
  const { $api } = useNuxtApp();
  return useAsyncData(`customer:${id}`, () => $api<Customer>(`/customers/${id}`));
};

export const useCustomersData = () => {
  const { $api } = useNuxtApp();
  return useAsyncData('customers', () => $api<Customer[]>("/customers"));
};