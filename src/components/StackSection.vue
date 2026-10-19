<script setup lang="ts">
import Tag from 'primevue/tag'
import { stack, principles } from '../data/profile'
</script>

<template>
  <section id="stack" class="section" aria-labelledby="stack-title">
    <div class="container">
      <header class="section-head">
        <p class="label"><span class="num">03</span> / Stack and how I work</p>
        <h2 id="stack-title">Tools I ship with</h2>
      </header>
      <div class="groups">
        <div v-for="g in stack" :key="g.name" class="group">
          <h3 class="label">{{ g.name }}</h3>
          <div class="tags">
            <Tag v-for="i in g.items" :key="i" :value="i" severity="secondary" />
          </div>
        </div>
      </div>
      <ul class="principles" aria-label="How I work">
        <li v-for="(p, i) in principles" :key="p.title">
          <span class="label n">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
}

.group {
  display: grid;
  align-content: start;
  gap: 12px;
}

.group h3 {
  font-family: var(--font-mono);
  font-weight: 400;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.principles {
  list-style: none;
  margin: clamp(40px, 6vw, 64px) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.principles li {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.n {
  color: var(--accent);
}

.principles h3 {
  font-size: var(--step-1);
}

.principles p {
  color: var(--muted);
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .principles {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 480px) {
  .groups {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
