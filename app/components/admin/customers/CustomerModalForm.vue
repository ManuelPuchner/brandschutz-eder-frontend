<script setup lang="ts">
import * as z from "zod";
import { createCustomer, updateCustomer } from "~/services/customer-service";
import countries from "i18n-iso-countries";
import deLocale from "i18n-iso-countries/langs/de.json";

countries.registerLocale(deLocale);
const countryOptions = Object.entries(
  countries.getNames("de", { select: "official" }),
).map(([code, name]) => ({
  value: code,
  label: name,
}));

const defaultCountry = "AT";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  postalcode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type Schema = z.output<typeof schema>;

interface Customer extends Schema {
  id: string | number;
}

const props = defineProps<{
  customer?: Customer | null;
}>();

const isEditMode = computed(() => !!props.customer);

const state = reactive<Partial<Schema>>({
  name: "",
  address: "",
  postalcode: "",
  country: defaultCountry,
  phone: "",
});

const emit = defineEmits(["customer-created", "customer-updated", "close"]);
const modalOpen = ref(false);
const loading = ref(false);

// When customer prop is set (edit mode), populate and open
watch(
  () => props.customer,
  (customer) => {
    if (customer) {
      state.name = customer.name;
      state.address = customer.address;
      state.postalcode = customer.postalcode;
      state.country = customer.country;
      state.phone = customer.phone;
      modalOpen.value = true;
    }
  },
  { immediate: true },
);

// Emit close when modal is closed externally
watch(modalOpen, (val) => {
  if (!val) emit("close");
});

defineShortcuts({
  esc: () => (modalOpen.value = !modalOpen.value),
});

async function onSubmit() {
  try {
    loading.value = true;
    const validatedData = schema.parse(state);

    if (isEditMode.value && props.customer) {
      const updatedCustomer = await updateCustomer(
        Number(props.customer.id),
        validatedData,
      );
      console.log("Customer updated:", updatedCustomer);
      emit("customer-updated", updatedCustomer);
    } else {
      const createdCustomer = await createCustomer(validatedData);
      emit("customer-created", createdCustomer);
    }

    resetForm();
    modalOpen.value = false;
  } catch (error) {
    console.error("Error occurred while submitting form:", error);
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  state.name = "";
  state.address = "";
  state.postalcode = "";
  state.country = defaultCountry;
  state.phone = "";
}
</script>

<template>
  <UModal
    v-model:open="modalOpen"
    :title="isEditMode ? 'Kunde bearbeiten' : 'Neuer Kunde'"
    size="2xl"
    :description="
      isEditMode
        ? 'Bearbeiten Sie die Informationen des Kunden.'
        : 'Geben Sie die Informationen zum neuen Kunden ein.'
    "
  >
    <UButton
      v-if="!isEditMode"
      icon="i-lucide-plus"
      color="primary"
      variant="outline"
      size="sm"
      @click="modalOpen = true"
    >
      Neuer Kunde
    </UButton>

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-2"
        @submit="onSubmit"
      >
        <UFormField name="name" label="Name">
          <UInput v-model="state.name" placeholder="Name" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <UFormField name="address" label="Address">
            <UInput v-model="state.address" placeholder="Address" class="w-full" />
          </UFormField>
          <UFormField name="postalcode" label="Postal Code">
            <UInput v-model="state.postalcode" placeholder="Postal Code" class="w-full" />
          </UFormField>
        </div>
        <UFormField name="country" label="Country">
          <USelect
            v-model="state.country"
            placeholder="Select a country"
            class="w-full"
            :items="countryOptions"
          />
        </UFormField>
        <UFormField name="phone" label="Phone">
          <UInput v-model="state.phone" placeholder="Phone" class="w-full" />
        </UFormField>
        <div class="flex justify-end">
          <UButton type="submit" loading-auto>
            {{ isEditMode ? "Speichern" : "Submit" }}
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>