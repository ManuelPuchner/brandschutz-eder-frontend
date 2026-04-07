export const useApiFactory = <
  T,
  CreateT extends Record<string, any> = Partial<T>,
>(
  resource: string,
) => {
  const { $api } = useNuxtApp();

  return {
    $api, // Expose $api for custom requests if needed
    // Actions
    actions: {
      create: (body: CreateT) =>
        $api<T>(`/${resource}`, { method: "POST", body }),
      update: (id: number | string, body: CreateT) =>
        $api<T>(`/${resource}/${id}`, { method: "PUT", body }),
      delete: (id: number | string) =>
        $api<boolean>(`/${resource}/${id}`, { method: "DELETE" }),
    },

    // Data Fetching Hooks
    useGetOne: (id: MaybeRefOrGetter<number | string>) => {
      return useAsyncData(`${resource}:${toValue(id)}`, () =>
        $api<T>(`/${resource}/${toValue(id)}`),
      );
    },

    useGetAll: (params?: Record<string, any>) => {
      return useAsyncData(`${resource}:all`, () =>
        $api<T[]>(`/${resource}`, { params }),
      );
    },
  };
};
