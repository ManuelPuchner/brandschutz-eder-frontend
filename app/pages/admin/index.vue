<script setup lang="ts">
// Define page meta
definePageMeta({
  layout: "admin",
});
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
      <p>
        Willkommen im Admin Dashboard. Hier können Sie Ihre Anwendung verwalten
        und wichtige Metriken anzeigen.
      </p>
    </template>
  </UDashboardPanel>
</template>
