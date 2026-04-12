<script setup lang="ts">
import ContactRequestSideEntry from "~/components/admin/contact-requests/ContactRequestSideEntry.vue";
import type { ContactRequest } from "~/types/contact";

definePageMeta({ layout: "admin", name: "Kontaktanfragen" });

// ── Data & State ─────────────────────────────────────────────────────────────

const { useContactRequestsData, contactActions } = useContactRequest();
const { data: rawRequests } = await useContactRequestsData();

const requests = ref<ContactRequest[]>(rawRequests.value ?? []);
const selectedRequest = ref<ContactRequest | null>(null);

/**
 * Status priority weight. 
 * Higher number = Higher in the list (Descending).
 */
const STATUS_WEIGHTS: Record<ContactRequest["status"], number> = {
  NEW: 3,
  READ: 2,
  ARCHIVED: 1,
};

// ── Computed ─────────────────────────────────────────────────────────────────

/**
 * Optimistic Sorting: Mirrors Spring Boot's:
 * Sort.by("status").descending().and(Sort.by("createdAt").descending())
 */
const sortedRequests = computed(() => {
  return [...requests.value].sort((a, b) => {
    // 1. Sort by Status weight
    const weightA = STATUS_WEIGHTS[a.status] ?? 0;
    const weightB = STATUS_WEIGHTS[b.status] ?? 0;
    const statusDiff = weightB - weightA;
    
    if (statusDiff !== 0) return statusDiff;

    // 2. Sort by Date (Newest first)
    // FIX: Provide a fallback string if createdAt is undefined to satisfy the Date constructor
    const dateA = new Date(a.createdAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? 0).getTime();
    return dateB - dateA;
  });
});

watch(rawRequests, (val) => {
  if (val) requests.value = val;
}, { immediate: true });

// ── Actions ───────────────────────────────────────────────────────────────────

/**
 * Updates a request in the local state array.
 */
function updateLocalRequest(id: number, patch: Partial<ContactRequest>) {
  requests.value = requests.value.map((r) => {
    if (r.id === id) {
      // Cast to 'any' then back to 'ContactRequest' is a common shortcut 
      // when patching strictly typed objects, or use the explicit spread:
      const updated: ContactRequest = { ...r, ...patch } as ContactRequest;
      
      if (selectedRequest.value?.id === id) {
        selectedRequest.value = updated;
      }
      return updated;
    }
    return r;
  });
}

async function updateStatus(
  request: ContactRequest,
  newStatus: ContactRequest["status"]
) {
  if (request.status === newStatus || !request.id) return;

  const previousStatus = request.status;

  // 1. Optimistic Update
  updateLocalRequest(request.id, { status: newStatus });

  // 2. Backend Sync
  try {
    await contactActions.updateStatus(request.id, newStatus);
  } catch (err) {
    console.error("Failed to update status:", err);
    // 3. Revert on failure
    updateLocalRequest(request.id, { status: previousStatus });
  }
}

function selectRequest(request: ContactRequest) {
  selectedRequest.value = request;
  if (request.status === "NEW") {
    updateStatus(request, "READ");
  }
}

function archiveRequest(request: ContactRequest) {
  updateStatus(request, "ARCHIVED");
  selectedRequest.value = null;
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
          v-for="request in sortedRequests"
          :key="request.id"
          class="cursor-pointer transition-colors"
          :class="[
            selectedRequest?.id === request.id 
              ? 'bg-primary-50 dark:bg-primary-950/20' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          ]"
          @click="selectRequest(request)"
        >
          <ContactRequestSideEntry :request="request" />
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <UDashboardPanel
    v-if="selectedRequest"
    resizable
    class="flex-1"
  >
    <template #header>
      <UDashboardNavbar :title="selectedRequest.name">
        <template #leading>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="selectedRequest = null"
          />
        </template>
        <template #right>
          <UButton
            icon="i-lucide-archive"
            label="Archivieren"
            color="neutral"
            variant="ghost"
            @click="archiveRequest(selectedRequest)"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-6 space-y-6">
        <div class="flex items-center gap-4">
          <UAvatar
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedRequest.name ?? 'Guest')}&background=random&color=fff`"
            size="xl"
          />
          <div>
            <h2 class="text-xl font-bold">{{ selectedRequest.name }}</h2>
            <p class="text-sm text-gray-500">{{ selectedRequest.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</span>
            <p class="mt-1">{{ selectedRequest.phone || '—' }}</p>
          </div>
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Company</span>
            <p class="mt-1">{{ selectedRequest.company || '—' }}</p>
          </div>
        </div>

        <USeparator />

        <div>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</span>
          <p class="mt-3 whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
            {{ selectedRequest.message }}
          </p>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <UDashboardPanel v-else class="flex items-center justify-center flex-1">
    <div class="text-center opacity-50">
      <UIcon name="i-lucide-mail" class="w-12 h-12 mx-auto mb-2" />
      <p>Wähle eine Anfrage aus</p>
    </div>
  </UDashboardPanel>
</template>