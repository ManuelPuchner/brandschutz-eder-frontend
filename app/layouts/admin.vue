<script setup lang="ts">
import { toaster } from "#build/ui";
import AdminDashboardSidebar from "~/components/admin/layout/AdminDashboardSidebar.vue";
const route = useRoute();
const title: string = (route.name as string) || "Admin Dashboard";
</script>

<template>
  <UApp>
    <UDashboardGroup
      title="Admin Dashboard"
      description="Welcome to the admin dashboard. Here you can manage your application and view important metrics."
    >
      <AdminDashboardSidebar />

      <slot />

      <ConfirmationModal />
    </UDashboardGroup>
  </UApp>
</template>
