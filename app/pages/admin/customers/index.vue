<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Customer } from "~/types/customer";
import CustomerModalForm from "~/components/admin/customers/CustomerModalForm.vue";
import countries from "i18n-iso-countries";
import deLocale from "i18n-iso-countries/langs/de.json";
import CustomerMap from "~/components/admin/customers/CustomerMap.vue";

countries.registerLocale(deLocale);

definePageMeta({ layout: "admin" });

const { useCustomersData, customerActions } = useCustomer();

const { data: customers } = await useCustomersData();

const columns: TableColumn<Customer>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "address", header: "Adresse" },
  { accessorKey: "postalcode", header: "Postleitzahl" },
  { accessorKey: "country", header: "Land" },
  { accessorKey: "phone", header: "Telefon" },
  { id: "actions", header: "" },
];

async function onDelete(customerId: number) {
  const oldCustomers = customers.value || [];
  try {
    customers.value = oldCustomers.filter((c) => c.id !== customerId);
    await customerActions.delete(customerId);
  } catch (error) {
    console.error("Error occurred while deleting customer:", error);
    customers.value = oldCustomers;
  }
}

const editingCustomer = ref<Customer | null>(null);

function onEdit(customer: Customer) {
  editingCustomer.value = customer;
}

async function onEditComplete(updatedCustomer: Customer) {
  customers.value = customers.value?.map((c) =>
    c.id === updatedCustomer.id ? updatedCustomer : c,
  );
  editingCustomer.value = null;
}

function onCustomerCreated(newCustomer: Customer) {
  customers.value = [newCustomer, ...(customers.value || [])];
}

const isMapView = ref(false);
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Kunden">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col flex-1 w-full">
        <div
          class="flex px-4 py-3.5 gap-4 border-b border-accented justify-end"
        >
          <UButton
            :icon="isMapView ? 'i-lucide-table' : 'i-lucide-map'"
            color="neutral"
            variant="outline"
            @click="isMapView = !isMapView"
            aria-label="Toggle view"
          />
          <CustomerModalForm @customer-created="onCustomerCreated" />
        </div>
        <UTable
          v-if="!isMapView"
          :data="customers"
          :columns="columns"
          class="flex-1"
        >
          <!-- ID cell -->
          <template #id-cell="{ row }"> #{{ row.getValue("id") }} </template>

          <!-- Country cell -->
          <template #country-cell="{ row }">
            <UBadge color="primary" variant="soft">
              {{
                countries.getName(row.getValue("country"), "de", {
                  select: "official",
                }) || row.getValue("country")
              }}
            </UBadge>
          </template>

          <!-- Actions cell -->
          <template #actions-cell="{ row }">
            <div class="flex justify-end">
              <UDropdownMenu
                :content="{ align: 'end' }"
                :items="[
                  {
                    label: 'Edit',
                    icon: 'i-lucide-edit',
                    color: 'warning',
                    onClick: () => onEdit(row.original),
                  },
                  {
                    label: 'Delete',
                    icon: 'i-lucide-trash',
                    color: 'error',
                    onClick: () => onDelete(row.original.id),
                  },
                ]"
                aria-label="Actions dropdown"
              >
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  color="neutral"
                  variant="ghost"
                  aria-label="Actions dropdown"
                />
              </UDropdownMenu>
            </div>
          </template>
        </UTable>

        <CustomerMap
          v-if="customers && isMapView"
          :customers="customers"
        ></CustomerMap>
      </div>

      <CustomerModalForm
        v-if="editingCustomer"
        :customer="editingCustomer"
        @customer-updated="onEditComplete"
        @close="editingCustomer = null"
      />
    </template>
  </UDashboardPanel>
</template>
