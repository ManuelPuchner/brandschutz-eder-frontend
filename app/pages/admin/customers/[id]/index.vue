<script setup lang="ts">
definePageMeta({ layout: "admin" });

const route = useRoute();
const customerId = Number(route.params.id);

const { useCustomerData, customerActions } = useCustomer();

const { data: customer, error } = await useCustomerData(customerId);

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
        <p v-if="error">Error loading customer: {{ error.message }}</p>

        <div v-else-if="customer">
            <h2>{{ customer.name }}</h2>
            <p>Address: {{ customer.address }}</p>
            <p>Postal Code: {{ customer.postalcode }}</p>
            <p>Country: {{ customer.country }}</p>
            <p>Phone: {{ customer.phone }}</p>
        </div>
        <p v-else>Loading...</p>
    </template>
  </UDashboardPanel>
</template>
