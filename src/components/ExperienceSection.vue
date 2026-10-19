<script setup lang="ts">
import Timeline from 'primevue/timeline'
import Tag from 'primevue/tag'
import { experience } from '../data/profile'
</script>

<template>
  <section id="experience" class="section" aria-labelledby="exp-title">
    <div class="container">
      <header class="section-head">
        <p class="label"><span class="num">02</span> / Experience</p>
        <h2 id="exp-title">Banking, fintech and a US-based API company</h2>
      </header>
      <Timeline :value="experience" class="timeline">
        <template #marker="{ index }">
          <span class="dot" :class="{ current: index === 0 }" aria-hidden="true"></span>
        </template>
        <template #content="{ item }">
          <div class="role">
            <div class="role-head">
              <h3>
                <a v-if="item.companyUrl" :href="item.companyUrl" target="_blank" rel="noopener">{{ item.company }}</a>
                <span v-else>{{ item.company }}</span>
                <span class="at">· {{ item.title }}</span>
              </h3>
              <p class="label when">{{ item.period }} · {{ item.place }}</p>
            </div>
            <ul class="points">
              <li v-for="p in item.points" :key="p">{{ p }}</li>
            </ul>
            <div class="tags">
              <Tag v-for="s in item.stack" :key="s" :value="s" severity="secondary" />
            </div>
          </div>
        </template>
      </Timeline>
    </div>
  </section>
</template>

<style scoped>
.timeline :deep(.p-timeline-event-opposite) {
  display: none;
}

.timeline :deep(.p-timeline-event-content) {
  padding-bottom: 28px;
}

.timeline :deep(.p-timeline-event-connector) {
  background: var(--line);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--faint);
  background: var(--bg);
  margin-top: 8px;
}

.dot.current {
  border-color: var(--accent);
  background: var(--accent);
}

.role {
  display: grid;
  gap: 10px;
  max-width: 70ch;
}

.role-head {
  display: grid;
  gap: 4px;
}

h3 {
  font-size: var(--step-1);
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: 0;
}

.at {
  font-weight: 400;
  color: var(--muted);
  margin-left: 0.3em;
}

.when {
  text-transform: none;
  letter-spacing: 0.02em;
}

.points {
  margin: 0;
  padding-left: 1.1em;
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 0.95rem;
}

.points li::marker {
  color: var(--accent);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
