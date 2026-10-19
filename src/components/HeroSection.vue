<script setup lang="ts">
import Button from 'primevue/button'
import AgentRunCard from './AgentRunCard.vue'
import { profile } from '../data/profile'
import { useCopyEmail } from '../useCopyEmail'

const { copy } = useCopyEmail()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container grid">
      <div class="copy">
        <p class="label status">
          <span class="pulse" aria-hidden="true"></span>
          {{ profile.availability }}
        </p>
        <h1 id="hero-title">
          {{ profile.name }}
          <span class="role">{{ profile.role }}</span>
        </h1>
        <p class="headline">{{ profile.headline }}</p>
        <p class="intro">{{ profile.intro }}</p>
        <p class="meta label">{{ profile.location }} · {{ profile.timezone }}, overlapping US Eastern hours</p>
        <div class="ctas">
          <Button label="Copy email" icon="pi pi-copy" @click="copy" />
          <Button as="a" :href="profile.links.linkedin" target="_blank" rel="noopener" label="LinkedIn" icon="pi pi-linkedin" severity="secondary" outlined />
          <Button as="a" :href="profile.links.github" target="_blank" rel="noopener" label="GitHub" icon="pi pi-github" severity="secondary" outlined />
        </div>
      </div>
      <AgentRunCard class="card" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(48px, 9vw, 112px) clamp(56px, 8vw, 104px);
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
}

.copy {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--accent);
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 50%, transparent);
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 45%, transparent); }
  70% { box-shadow: 0 0 0 9px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

h1 {
  font-size: var(--step-4);
  display: grid;
  gap: 6px;
}

.role {
  font-family: var(--font-sans);
  font-size: var(--step-1);
  font-weight: 500;
  letter-spacing: 0;
  color: var(--muted);
}

.headline {
  font-family: var(--font-serif);
  font-size: var(--step-2);
  line-height: 1.3;
  max-width: 30ch;
}

.intro {
  color: var(--muted);
  max-width: 58ch;
}

.meta {
  text-transform: none;
  letter-spacing: 0.02em;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

@media (max-width: 880px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
