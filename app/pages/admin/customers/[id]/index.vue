<script setup lang="ts">
import type { CountryCode } from "libphonenumber-js";
import { parsePhoneNumber } from "libphonenumber-js/min";

definePageMeta({ layout: "admin" });

const route = useRoute();
const router = useRouter();
const customerId = Number(route.params.id);

const { useCustomerData, customerActions } = useCustomer();
const { data: customer, error, pending } = await useCustomerData(customerId);

// Formatting helpers
const googleMapsUrl = computed(() =>
  customer.value
    ? `https://www.google.com/maps/search/?api=1&query=${customer.value.lat},${customer.value.lon}`
    : "#",
);

const phone = computed(() => {
  if (!customer.value) return null;
  try {
    const parsed = parsePhoneNumber(
      customer.value.phone,
      customer.value.country as CountryCode,
    );
    return parsed.isValid() ? parsed : null;
  } catch {
    return null;
  }
});

const { confirm } = useConfirmation();

const toast = useToast();

async function handleDelete() {
  const ok = await confirm({
    title: "Delete Customer",
    description:
      "Are you sure you want to delete this customer? This action cannot be undone.",
    variant: "danger",
    confirmLabel: "Delete",
  });

  if (!ok) return;

  try {
    await customerActions.delete(customerId);

    // show toast
    toast.add({
      title: "Customer Deleted",
      description: "The customer has been successfully deleted.",
      color: "success",
      icon: "i-heroicons-check-circle",
    });

    router.push("/admin/customers");
  } catch (error) {
    console.error("Error occurred while deleting customer:", error);

    // show toast
    toast.add({
      title: "Error",
      description: "Failed to delete customer. Please try again.",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
  }
}

</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="customer?.name || 'Customer Details'">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            icon="i-heroicons-trash"
            color="error"
            variant="soft"
            @click="handleDelete"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="pending" class="space-y-4">
        <USkeleton class="h-8 w-62.5" />
        <USkeleton class="h-50 w-full" />
      </div>

      <UAlert
        v-else-if="error"
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="outline"
        title="Error loading customer"
        :description="error.message"
      />

      <div v-else-if="customer" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="md:col-span-2">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-user-circle"
                  class="w-5 h-5 text-primary"
                />
                <span class="font-semibold">General Information</span>
              </div>
            </template>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p class="font-medium">{{ customer.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Phone Number
                </p>
                <p class="font-medium text-primary">
                  <a :href="`tel:${customer.phone}`">{{
                    phone ? phone.formatInternational() : customer.phone
                  }}</a>
                </p>
              </div>
              <div class="sm:col-span-2">
                <USeparator class="my-2" />
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Customer ID
                </p>
                <p class="font-mono text-xs uppercase">#{{ customer.id }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-map-pin"
                  class="w-5 h-5 text-primary"
                />
                <span class="font-semibold">Location</span>
              </div>
            </template>

            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p>{{ customer.country }}</p>
                <p class="leading-tight">{{ customer.address }}</p>
                <p>{{ customer.city }}, {{ customer.postalcode }}</p>
              </div>

              <div class="pt-4">
                <UButton
                  :href="googleMapsUrl"
                  target="_blank"
                  icon="i-heroicons-map"
                  label="View on Maps"
                  block
                  color="primary"
                  variant="solid"
                />
              </div>
            </div>
          </UCard>
        </div>

        <UCard>
          <div
            class="flex flex-col items-center justify-center py-12 text-gray-400"
          >
            <UIcon name="i-heroicons-clock" class="w-12 h-12 mb-2 opacity-20" />
            <p>Activity history will appear here.</p>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
