<script setup lang="ts">
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import { computed, ref } from 'vue'
import { profile } from '../data/profile'
import { useTheme } from '../useTheme'
import { useCopyEmail } from '../useCopyEmail'

const { mode, toggle } = useTheme()
const { copy } = useCopyEmail()
const themeLabel = computed(() => (mode.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'))

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

const menuOpen = ref(false)
let pendingTarget: string | null = null

// The drawer locks page scroll while open, so we close it first and scroll once it is gone.
function goTo(href: string) {
  pendingTarget = href
  menuOpen.value = false
}

function afterHide() {
  if (!pendingTarget) return
  document.querySelector(pendingTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  pendingTarget = null
}
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
          class="resume"
          as="a"
          :href="profile.links.resume"
          label="Résumé"
          icon="pi pi-file-pdf"
          size="small"
          outlined
          target="_blank"
          rel="noopener"
        />
        <Button
          class="burger"
          icon="pi pi-bars"
          text
          rounded
          severity="secondary"
          aria-label="Open menu"
          aria-controls="site-menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        />
      </div>
    </div>
  </header>

  <Drawer
    id="site-menu"
    v-model:visible="menuOpen"
    position="right"
    block-scroll
    class="site-drawer"
    :pt="{ mask: { class: 'site-drawer-mask' } }"
    @after-hide="afterHide"
  >
    <template #header>
      <span class="drawer-brand">
        <span class="mono">AR</span>
        <span>{{ profile.name }}</span>
      </span>
    </template>

    <div class="drawer-body">
      <nav aria-label="Sections" class="drawer-nav">
        <a
          v-for="(item, i) in nav"
          :key="item.href"
          :href="item.href"
          @click.prevent="goTo(item.href)"
        >
          <span class="label idx">{{ String(i + 1).padStart(2, '0') }}</span>
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="drawer-actions">
        <Button label="Copy email" icon="pi pi-copy" fluid @click="copy" />
        <Button as="a" :href="profile.links.resume" target="_blank" rel="noopener" label="Résumé (PDF)" icon="pi pi-file-pdf" severity="secondary" outlined fluid />
        <div class="row">
          <Button as="a" :href="profile.links.linkedin" target="_blank" rel="noopener" label="LinkedIn" icon="pi pi-linkedin" severity="secondary" outlined fluid />
          <Button as="a" :href="profile.links.github" target="_blank" rel="noopener" label="GitHub" icon="pi pi-github" severity="secondary" outlined fluid />
        </div>
      </div>

      <p class="label drawer-foot">{{ profile.location }} · {{ profile.timezone }}</p>
    </div>
  </Drawer>
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

.burger {
  display: none;
}

/* Tablet and below: the section links move into the drawer. */
@media (max-width: 1024px) {
  .nav {
    display: none;
  }
  .actions {
    margin-left: auto;
  }
  .burger {
    display: inline-flex;
  }
}

@media (max-width: 520px) {
  .resume {
    display: none;
  }
}

@media (max-width: 380px) {
  .brand-name {
    display: none;
  }
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.drawer-body {
  display: grid;
  align-content: start;
  gap: 32px;
  min-height: 100%;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.drawer-nav {
  display: grid;
}

.drawer-nav a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.2;
  color: var(--ink);
}

.drawer-nav a:hover {
  color: var(--accent);
}

.drawer-nav .idx {
  color: var(--accent);
  font-size: 0.75rem;
}

.drawer-actions {
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.drawer-foot {
  text-transform: none;
  letter-spacing: 0.02em;
}
</style>
