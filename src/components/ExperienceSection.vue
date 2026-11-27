<script setup lang="ts">
import Timeline from 'primevue/timeline'
import Tag from 'primevue/tag'
import { experience, education, languages } from '../data/profile'
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

      <div class="extra">
        <div>
          <h3 class="label">Education &amp; training</h3>
          <ul class="plain">
            <li v-for="e in education" :key="e.title">
              <strong>{{ e.title }}</strong>
              <span>{{ e.place }}<template v-if="e.period"> · {{ e.period }}</template></span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="label">Languages</h3>
          <ul class="plain">
            <li v-for="l in languages" :key="l"><span>{{ l }}</span></li>
          </ul>
        </div>
      </div>
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

.extra {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 28px;
  margin-top: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.extra h3 {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 400;
  margin: 0 0 12px;
}

.plain {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.plain li {
  display: grid;
  gap: 2px;
  font-size: 0.95rem;
}

.plain strong {
  font-weight: 600;
}

.plain span {
  color: var(--muted);
}

@media (max-width: 720px) {
  .extra {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
