<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const footerMenu: NavigationMenuItem[] = [
  { label: "Impressum", to: "#", target: "_self" },
  { label: "Datenschutz", to: "#", target: "_self" },
];
</script>

<template>
  <UApp>
    <UHeader class="bg-white/90 backdrop-blur border-b border-divider">
      <template #left>
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <AppLogo class="w-auto h-6 shrink-0" />
            <span class="text-base font-bold text-primary"
              >Brandschutz Eder</span
            >
          </NuxtLink>
          <nav class="hidden lg:flex gap-4">
            <NuxtLink
              to="#services"
              class="text-sm font-medium text-muted hover:text-primary"
              >Leistungen</NuxtLink
            >
            <NuxtLink
              to="#process"
              class="text-sm font-medium text-muted hover:text-primary"
              >Prozess</NuxtLink
            >
            <NuxtLink
              to="#kontakt"
              class="text-sm font-medium text-muted hover:text-primary"
              >Kontakt</NuxtLink
            >
          </nav>
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter class="bg-elevated py-8 shadow-4xl mt-16">
      <template #default>
        <UContainer>
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left"
          >
            <div>
              <h4 class="font-semibold text-primary mb-2">Brandschutz Eder</h4>
              <p class="text-sm text-muted">
                Ihre zuverlässige Brandschutzberatung
              </p>
            </div>
            <div>
              <h4 class="font-semibold text-primary mb-2">Kontakt</h4>
              <p class="text-sm text-muted">
                Tel: +43 (0)664 75030022<br />Email: office@brandschutz-eder.at
              </p>
            </div>
            <div>
              <h4 class="font-semibold text-primary mb-2">Öffnungszeiten</h4>
              <p class="text-sm text-muted">
                Mo-Fr: 08:00 - 17:00 Uhr<br />Sa-So: Nach Vereinbarung
              </p>
            </div>
          </div>
        </UContainer>
      </template>

      <template #bottom>
        <UContainer>
          <div
            class="mt-4 border-t border-default pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 w-full"
          >
            <p class="text-sm text-muted">
              © {{ new Date().getFullYear() }} Brandschutz Eder • Für fire
              safety und Compliance.
            </p>
            <UNavigationMenu :items="footerMenu" variant="link" />
          </div>
        </UContainer>
      </template>
    </UFooter>
  </UApp>
</template>
