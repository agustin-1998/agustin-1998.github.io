<script setup lang="ts">
import CaseStudy from './CaseStudy.vue'
import { work, alsoBuilt } from '../data/profile'
</script>

<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="container">
      <header class="section-head">
        <p class="label"><span class="num">01</span> / Selected work</p>
        <h2 id="work-title">Three projects, told as case studies</h2>
      </header>
      <div class="studies">
        <CaseStudy v-for="(s, i) in work" :key="s.id" :study="s" :index="i" />
      </div>
      <p class="also">
        <span class="label">Also</span>
        <template v-for="link in alsoBuilt" :key="link.href">
          <a :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
        </template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.also {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: baseline;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.95rem;
}
</style>
