<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
  {
    label: "Dashboard",
    icon: "i-heroicons-chart-bar-20-solid",
    to: "/admin",
  },
  {
    label: "Kontaktanfragen",
    icon: "i-heroicons-envelope-solid",
    to: "/admin/contact-requests",
    name: "Kontaktanfragen",
  },
  {
    label: "Kunden",
    icon: "i-heroicons-users-solid",
    to: "/admin/customers",
    name: "Kunden",
  },
];
</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
    <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
        <UDashboardResizeHandle
          class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-border-accented) after:transition"
          @mousedown="onMouseDown"
          @touchstart="onTouchStart"
          @dblclick="onDoubleClick"
        />
      </template>
    <template #header="{ collapsed }">
      <AppLogo v-if="!collapsed" :size="collapsed ? 'sm' : 'md'" />
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>
    <template #default="{collapsed}">
      <UNavigationMenu :items="items" :collapsed="collapsed" orientation="vertical" />
    </template>
  </UDashboardSidebar>
</template>
