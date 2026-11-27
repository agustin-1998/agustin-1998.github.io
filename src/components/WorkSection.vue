<script setup lang="ts">
import Tag from 'primevue/tag'
import CaseStudy from './CaseStudy.vue'
import { work, moreProjects } from '../data/profile'
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="container">
      <header class="section-head">
        <p class="label"><span class="num">01</span> / Selected work</p>
        <h2 id="work-title">AI agents, RAG and full stack apps, told as case studies</h2>
      </header>
      <div class="studies">
        <CaseStudy v-for="(s, i) in work" :key="s.id" :study="s" :index="i" />
      </div>

      <div class="more" aria-labelledby="more-title">
        <h3 id="more-title" class="label">More projects</h3>
        <ul class="cards">
          <li v-for="p in moreProjects" :key="p.title" class="card">
            <h4>
              <a v-if="p.href" :href="p.href" target="_blank" rel="noopener">{{ p.title }} <i class="pi pi-arrow-up-right" aria-hidden="true"></i></a>
              <span v-else>{{ p.title }}</span>
            </h4>
            <p class="label ctx">{{ p.context }}</p>
            <p class="sum">{{ p.summary }}</p>
            <div class="tags">
              <Tag v-for="s in p.stack" :key="s" :value="s" severity="secondary" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.more {
  display: grid;
  gap: 16px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.more > h3 {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--accent);
}

.cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card {
  display: grid;
  align-content: start;
  gap: 10px;
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.card h4 {
  margin: 0;
  font-size: var(--step-1);
  font-weight: 600;
}

.card h4 a {
  color: inherit;
}

.card h4 .pi {
  font-size: 0.75em;
  color: var(--accent);
}

.ctx {
  text-transform: none;
  letter-spacing: 0.02em;
}

.sum {
  color: var(--muted);
  font-size: 0.95rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

@media (max-width: 900px) {
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
