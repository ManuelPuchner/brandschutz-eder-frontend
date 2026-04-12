import type { Customer, CustomerCreate } from "~/types/customer";

export const useCustomer = () => {
  const { actions, useGetOne, useGetAll } = useApiFactory<
    Customer,
    CustomerCreate
  >("customers");

  return {
    customerActions: actions,
    useCustomerData: useGetOne,
    useCustomersData: useGetAll,
  };
};
