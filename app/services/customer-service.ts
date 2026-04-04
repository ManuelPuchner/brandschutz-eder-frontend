import type { Customer, CustomerCreate } from "~/types/customer";

export async function useCustomers() {
  return useFetch<Customer[]>("/spring/customers", {
    method: "GET",
    server: false,
  });
}

export async function createCustomer(customer: CustomerCreate): Promise<Customer> {
  return $fetch<Customer>("/spring/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  });
}

export async function deleteCustomer(customerId: number): Promise<Boolean> {
  return $fetch<Boolean>(`/spring/customers/${customerId}`, {
    method: "DELETE",
  });
}

export async function updateCustomer(customerId: number, customer: CustomerCreate): Promise<Customer> {
  return $fetch<Customer>(`/spring/customers/${customerId}`, {
    method: "PUT",
    body: JSON.stringify(customer),
  });
}
