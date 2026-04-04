<script setup lang="ts">
import ContactRequestSideEntry from "~/components/admin/contact-requests/ContactRequestSideEntry.vue";
import {
  useContactRequests,
  useUpdateContactRequestStatus,
} from "~/services/contact-request-service";
import type { ContactRequest } from "~/types/contact";

definePageMeta({ layout: "admin", name: "Kontaktanfragen" });

// ── Data ─────────────────────────────────────────────────────────────────────

const { data: rawRequests } = await useContactRequests();
const requests = ref<ContactRequest[]>(rawRequests.value ?? []);
const selectedRequest = ref<ContactRequest | null>(null);

watch(
  rawRequests,
  (val) => {
    if (val) requests.value = val;
  },
  { immediate: true },
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function findRequestIndex(id: ContactRequest["id"]): number {
  return requests.value.findIndex((r) => r.id === id);
}

function replaceRequest(index: number, patch: Partial<ContactRequest>) {
  if (index === -1) return;

  requests.value[index] = {
    ...requests.value[index],
    ...patch,
  } as ContactRequest;

  if (selectedRequest.value?.id === requests.value[index].id) {
    selectedRequest.value = requests.value[index];
  }
}

// ── Actions ───────────────────────────────────────────────────────────────────

function selectRequest(request: ContactRequest) {
  selectedRequest.value = request;
  updateStatus(request, "READ");
}

async function updateStatus(
  request: ContactRequest,
  status: ContactRequest["status"],
) {
  if (request.status === status) return;

  const index = findRequestIndex(request.id);
  const previousStatus = request.status;

  replaceRequest(index, { status }); // optimistic update

  try {
    await useUpdateContactRequestStatus(request.id, status);
  } catch (err) {
    console.error("Failed to update contact request status:", err);
    replaceRequest(index, { status: previousStatus }); // revert on failure
  }
}
</script>

<template>
  <UDashboardPanel resizable>
    <template #header>
      <UDashboardNavbar title="Kontaktanfragen">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="divide-y divide-default">
        <div
          v-for="(_, index) in requests"
          :key="(requests[index] as ContactRequest).id"
          @click="selectRequest(requests[index] as ContactRequest)"
        >
          <ContactRequestSideEntry
            :request="(requests[index] as ContactRequest)"
          ></ContactRequestSideEntry>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <!-- Detail panel -->
  <UDashboardPanel resizable v-if="selectedRequest" :title="selectedRequest.name">
    <template #header>
      <UDashboardNavbar :title="selectedRequest.name">
        <template #leading>
          <UButton
            size="xl"
            color="neutral"
            variant="ghost"
            class="p-2"
            @click="selectedRequest = null"
          >
            <UIcon name="i-lucide-x" />
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-4">
        <p><strong>Email:</strong> {{ selectedRequest.email }}</p>
        <p><strong>Phone:</strong> {{ selectedRequest.phone }}</p>
        <p><strong>Company:</strong> {{ selectedRequest.company }}</p>
        <p><strong>Message:</strong></p>
        <p class="whitespace-pre-wrap">{{ selectedRequest.message }}</p>
      </div>
    </template>
  </UDashboardPanel>

  <!-- Empty state -->
  <UDashboardPanel v-else class="flex items-center justify-center">
    <p class="text-muted">Select a contact request to view details</p>
  </UDashboardPanel>
</template>
