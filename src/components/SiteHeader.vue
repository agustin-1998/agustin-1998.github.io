<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'
import { profile } from '../data/profile'
import { useTheme } from '../useTheme'

const { mode, toggle } = useTheme()
const themeLabel = computed(() => (mode.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'))

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <a href="#top" class="brand" aria-label="Agustín Rodriguez, back to top">
        <span class="mono">AR</span>
        <span class="brand-name">{{ profile.name }}</span>
      </a>
      <nav aria-label="Sections" class="nav">
        <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
      <div class="actions">
        <Button
          :icon="mode === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"
          text
          rounded
          severity="secondary"
          :aria-label="themeLabel"
          v-tooltip.bottom="themeLabel"
          @click="toggle"
        />
        <Button
          as="a"
          :href="profile.links.resume"
          label="Résumé"
          icon="pi pi-file-pdf"
          size="small"
          outlined
          target="_blank"
          rel="noopener"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: saturate(1.4) blur(10px);
  border-bottom: 1px solid var(--line);
}

.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 60px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 500;
}

.mono {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  gap: 22px;
  margin-left: auto;
  font-size: var(--step--1);
}

.nav a {
  text-decoration: none;
  color: var(--muted);
}

.nav a:hover {
  color: var(--ink);
}

.actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 760px) {
  .nav {
    display: none;
  }
  .actions {
    margin-left: auto;
  }
}

@media (max-width: 420px) {
  .brand-name {
    display: none;
  }
}
</style>
