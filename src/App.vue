<script setup lang="ts">
import Toast from 'primevue/toast'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import StackSection from './components/StackSection.vue'
import ContactSection from './components/ContactSection.vue'
import { profile } from './data/profile'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <span id="top" aria-hidden="true"></span>
    <HeroSection />
    <WorkSection />
    <ExperienceSection />
    <StackSection />
    <ContactSection />
  </main>
  <footer class="footer">
    <div class="container row">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
      <p>Built with Vue 3, TypeScript and PrimeVue · Last updated {{ profile.updated }}</p>
    </div>
  </footer>
  <Toast position="bottom-center" />
</template>

<style scoped>
main:focus {
  outline: none;
}

.footer {
  border-top: 1px solid var(--line);
  padding-block: 28px calc(28px + env(safe-area-inset-bottom, 0px));
  color: var(--faint);
  font-size: 0.85rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
}
</style>
