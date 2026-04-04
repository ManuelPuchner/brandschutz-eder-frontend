<script setup lang="ts">
import { deleteCustomer, useCustomers } from "~/services/customer-service";
import type { TableColumn } from "@nuxt/ui";
import type { Customer } from "~/types/customer";
import CustomerModalForm from "~/components/admin/customers/CustomerModalForm.vue";
import countries from "i18n-iso-countries";
import deLocale from "i18n-iso-countries/langs/de.json";

countries.registerLocale(deLocale);

definePageMeta({ layout: "admin" });

const { data: customers } = await useCustomers();

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
    await deleteCustomer(customerId);
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
        <div class="flex px-4 py-3.5 border-b border-accented justify-end">
          <CustomerModalForm @customer-created="onCustomerCreated" />
        </div>

        <UTable :data="customers" :columns="columns" class="flex-1">
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
