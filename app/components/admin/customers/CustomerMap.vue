<script setup lang="ts">
import type { Customer } from "~/types/customer";

// Map configuration
const style = "https://tiles.openfreemap.org/styles/liberty";
const center = [14.2859, 48.3069] as [number, number];
const zoom = 11;

const props = defineProps<{
  customers: Customer[];
}>();
</script>

<template>
  <ClientOnly>
    <MglMap :map-style="style" :center="center" :zoom="zoom">
      <MglNavigationControl />

      <MglMarker
        v-for="customer in customers"
        :key="customer.id"
        :coordinates="{
          lng: customer.lon,
          lat: customer.lat,
        }"
      >
        <!-- make marker klickable -->
        <template v-slot:marker>
          <!-- TODO: Add page for detail view -->
          <NuxtLink :to="`/admin/customers/${customer.id}`" class="block">
            <div
              class="bg-blue-500 text-white rounded-md p-2 relative -translate-y-2/3"
            >
              {{ customer.name }}
              <!-- arrow at bottom -->
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
              >
                <div
                  class="w-0 h-0 border-l-[5px] border-r-[5px] border-t-10 border-l-transparent border-r-transparent border-t-blue-500"
                ></div>
              </div>
            </div>
          </NuxtLink>
        </template>
      </MglMarker>
    </MglMap>
  </ClientOnly>
</template>
