<script setup lang="ts">
definePageMeta({
  layout: "landing",
  auth: false,
});
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-primary/5 to-transparent">
    <!-- Hero Section -->
    <UContainer class="py-20 sm:py-32">
      <div
        class="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
      >
        <div>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4"
          >
            Brandschutz Eder
          </h1>
          <p class="text-xl sm:text-2xl text-muted mb-6">
            Ihre Sicherheit ist unsere Priorität
          </p>
        </div>
        <p class="text-lg text-default leading-relaxed max-w-2xl">
          Professionelle Brandschutzüberprüfungen und Beratung für Unternehmen,
          Büros und Einrichtungen. Wir überprüfen Ihre Brandschutznormen und
          tragen zur Sicherheit bei.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mt-8">
          <UButton
            size="xl"
            color="primary"
            icon="i-lucide-phone"
            trailing-icon="i-lucide-arrow-right"
          >
            Kontakt aufnehmen
          </UButton>
          <UButton
            size="xl"
            color="neutral"
            variant="outline"
            icon="i-lucide-info"
            trailing-icon="i-lucide-arrow-right"
          >
            Mehr erfahren
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- Services Section -->
    <div class="bg-elevated/50 py-20 sm:py-32" id="services">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Unsere Leistungen
          </h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            Umfassende Brandschutzlösungen für Ihre Sicherheit und Compliance
          </p>
        </div>

        <UPageGrid>
          <UPageCard
            title="Brandschutzüberprüfung"
            description="Gründliche Inspektion Ihrer Einrichtungen nach aktuellen Sicherheitsstandards und behördlichen Vorgaben."
            icon="i-lucide-search"
            variant="outline"
          />
          <UPageCard
            title="Beratung & Dokumentation"
            description="Professionelle Beratung und detaillierte Berichte mit Empfehlungen zur Verbesserung Ihrer Brandschutzmaßnahmen."
            icon="i-lucide-clipboard-list"
            variant="outline"
          />
          <UPageCard
            title="Für alle Branchen"
            description="Wir arbeiten mit Büros, Produktionsstätten, Lagern, Hotels und weiteren Einrichtungen zusammen."
            icon="i-lucide-building-2"
            variant="outline"
          />
          <UPageCard
            title="Maßnahmenentwicklung"
            description="Entwicklung von Verbesserungsmaßnahmen und Umsetzungsunterstützung zur Einhaltung von Brandschutzvorschriften."
            icon="i-lucide-wrench"
            variant="outline"
          />
          <UPageCard
            title="Schulung & Training"
            description="Schulung von Mitarbeitern zu Brandschutz und richtigem Verhalten im Notfall für erhöhte Sicherheit."
            icon="i-lucide-users"
            variant="outline"
          />
          <UPageCard
            title="Compliance & Zertifizierung"
            description="Unterstützung bei der Erfüllung gesetzlicher Anforderungen und behördlicher Auflagen."
            icon="i-lucide-check-circle-2"
            variant="outline"
          />
        </UPageGrid>
      </UContainer>
    </div>

    <!-- Process Section -->
    <UContainer class="py-20 sm:py-32" id="process">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Unser Prozess
        </h2>
        <p class="text-lg text-muted max-w-2xl mx-auto">
          Systematische und transparente Herangehensweise zur Gewährleistung
          Ihrer Brandsicherheit
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4"
          >
            1
          </div>
          <h3 class="font-semibold text-lg mb-2">Kontakt & Planung</h3>
          <p class="text-muted">
            Wir besprechen Ihre Anforderungen und vereinbaren einen Termin für
            die Überprüfung.
          </p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4"
          >
            2
          </div>
          <h3 class="font-semibold text-lg mb-2">Überprüfung vor Ort</h3>
          <p class="text-muted">
            Gründliche Inspektion Ihrer Einrichtungen nach geltenden Standards.
          </p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4"
          >
            3
          </div>
          <h3 class="font-semibold text-lg mb-2">Bericht & Beratung</h3>
          <p class="text-muted">
            Detaillierter Bericht mit Findings und Empfehlungen zur
            Verbesserung.
          </p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4"
          >
            4
          </div>
          <h3 class="font-semibold text-lg mb-2">Nachverfolgung</h3>
          <p class="text-muted">
            Unterstützung bei der Umsetzung von Maßnahmen und regelmäßige
            Überwachung.
          </p>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-primary text-white py-20 sm:py-32" id="kontakt">
      <UContainer>
        <div
          class="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto"
        >
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              Bereit für mehr Sicherheit?
            </h2>
            <p class="text-lg text-white/80">
              Kontaktieren Sie uns heute noch für ein unverbindliches
              Beratungsgespräch und kostenlose Beurteilung Ihrer
              Brandschutzlage.
            </p>
          </div>
          <ContactForm />
        </div>
      </UContainer>
    </div>
  </div>
</template>
