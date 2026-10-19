<script setup lang="ts">
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import type { CaseStudy } from '../data/profile'

defineProps<{ study: CaseStudy; index: number }>()
</script>

<template>
  <article class="study" :aria-labelledby="`study-${study.id}`">
    <aside class="meta">
      <p class="label idx">{{ String(index + 1).padStart(2, '0') }}</p>
      <dl>
        <div><dt class="label">Context</dt><dd>{{ study.context }}</dd></div>
        <div><dt class="label">When</dt><dd>{{ study.period }}</dd></div>
        <div><dt class="label">Status</dt><dd>{{ study.status }}</dd></div>
      </dl>
      <div v-if="study.links.length" class="links">
        <Button
          v-for="link in study.links"
          :key="link.href"
          as="a"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noopener' : undefined"
          :label="link.label"
          icon="pi pi-arrow-up-right"
          iconPos="right"
          size="small"
          outlined
        />
      </div>
    </aside>

    <div class="body">
      <h3 :id="`study-${study.id}`">{{ study.title }}</h3>
      <p class="summary">{{ study.summary }}</p>

      <ul class="metrics" aria-label="Key numbers">
        <li v-for="m in study.metrics" :key="m.label">
          <strong>{{ m.value }}</strong>
          <span>{{ m.label }}</span>
        </li>
      </ul>

      <div class="cols">
        <div>
          <h4 class="label">The problem</h4>
          <p>{{ study.problem }}</p>
        </div>
        <div>
          <h4 class="label">What I built</h4>
          <ul class="list">
            <li v-for="b in study.built" :key="b">{{ b }}</li>
          </ul>
        </div>
        <div>
          <h4 class="label">Decisions</h4>
          <ul class="list">
            <li v-for="d in study.decisions" :key="d">{{ d }}</li>
          </ul>
        </div>
      </div>

      <div class="tags" aria-label="Stack">
        <Tag v-for="s in study.stack" :key="s" :value="s" severity="secondary" />
      </div>
      <p v-if="study.note" class="note">{{ study.note }}</p>
    </div>
  </article>
</template>

<style scoped>
.study {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: clamp(20px, 4vw, 48px);
  padding-block: clamp(28px, 4vw, 44px);
  border-top: 1px solid var(--line);
}

.study:first-child {
  border-top: 0;
  padding-top: 0;
}

.meta {
  display: grid;
  align-content: start;
  gap: 16px;
  font-size: var(--step--1);
}

.idx {
  color: var(--accent);
  font-size: 0.9rem;
}

dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

dt {
  font-size: 0.7rem;
}

dd {
  margin: 2px 0 0;
  color: var(--ink);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.body {
  display: grid;
  gap: 20px;
  min-width: 0;
}

h3 {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 1.9rem);
}

.summary {
  font-size: var(--step-1);
  color: var(--ink);
  max-width: 62ch;
}

.metrics {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  overflow: hidden;
}

.metrics li {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-left: 1px solid var(--line);
}

.metrics li:first-child {
  border-left: 0;
}

.metrics strong {
  font-family: var(--font-serif);
  font-size: var(--step-3);
  font-weight: 500;
  line-height: 1;
  color: var(--accent);
}

.metrics span {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.35;
}

.cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

h4 {
  margin: 0 0 8px;
  font-weight: 400;
}

.cols p,
.list {
  font-size: 0.95rem;
  color: var(--muted);
}

.list {
  margin: 0;
  padding-left: 1.1em;
  display: grid;
  gap: 8px;
}

.list li::marker {
  color: var(--accent);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.note {
  font-size: 0.88rem;
  color: var(--faint);
  border-left: 2px solid var(--line);
  padding-left: 12px;
  max-width: 70ch;
}

@media (max-width: 960px) {
  .cols {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }
}

@media (max-width: 760px) {
  .study {
    grid-template-columns: minmax(0, 1fr);
  }
  .meta {
    order: 2;
  }
  dl {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .metrics {
    grid-template-columns: minmax(0, 1fr);
  }
  .metrics li {
    border-left: 0;
    border-top: 1px solid var(--line);
    grid-template-columns: 4.5rem 1fr;
    align-items: center;
  }
  .metrics li:first-child {
    border-top: 0;
  }
  dl {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
