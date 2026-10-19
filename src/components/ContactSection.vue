<script setup lang="ts">
import Button from 'primevue/button'
import { profile } from '../data/profile'
import { useCopyEmail } from '../useCopyEmail'

const { copy } = useCopyEmail()
</script>

<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container inner">
      <p class="label"><span class="num">04</span> / Contact</p>
      <h2 id="contact-title">Hiring for full stack or applied AI work? Let’s talk.</h2>
      <p class="lead">
        Open to remote roles, full-time or contract. I’m in {{ profile.location }} ({{ profile.timezone }}),
        which overlaps US Eastern business hours.
      </p>
      <p class="email">
        <span class="addr">{{ profile.email }}</span>
      </p>
      <div class="ctas">
        <Button label="Copy email" icon="pi pi-copy" @click="copy" />
        <Button as="a" :href="profile.links.linkedin" target="_blank" rel="noopener" label="LinkedIn" icon="pi pi-linkedin" severity="secondary" outlined />
        <Button as="a" :href="profile.links.github" target="_blank" rel="noopener" label="GitHub" icon="pi pi-github" severity="secondary" outlined />
        <Button as="a" :href="profile.links.resume" target="_blank" rel="noopener" label="Résumé (PDF)" icon="pi pi-file-pdf" severity="secondary" outlined />
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  display: grid;
  gap: 18px;
}

.num {
  color: var(--accent);
}

h2 {
  font-size: var(--step-4);
  max-width: 18ch;
}

.lead {
  color: var(--muted);
  max-width: 56ch;
  font-size: var(--step-1);
}

.email {
  font-family: var(--font-mono);
  font-size: var(--step-1);
  overflow-wrap: anywhere;
}

.addr {
  user-select: all;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
