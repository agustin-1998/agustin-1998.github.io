<script setup lang="ts">
import { agentRun } from '../data/profile'
</script>

<template>
  <figure class="run" aria-labelledby="run-caption">
    <div class="run-head">
      <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="run-name">{{ agentRun.name }}</span>
      <span class="run-caption" id="run-caption">{{ agentRun.caption }}</span>
    </div>
    <ol class="steps">
      <li v-for="step in agentRun.steps" :key="step.label" :class="step.kind">
        <span class="marker" aria-hidden="true">
          <i :class="step.kind === 'checkpoint' ? 'pi pi-user' : 'pi pi-check'"></i>
        </span>
        <span class="text">
          {{ step.label }}
          <span v-if="step.detail" class="detail">{{ step.detail }}</span>
        </span>
        <span v-if="step.kind === 'checkpoint'" class="badge">approval</span>
      </li>
    </ol>
    <figcaption class="run-foot">
      <span v-for="m in agentRun.footer" :key="m.label"><strong>{{ m.value }}</strong> {{ m.label }}</span>
      <a class="see" href="/hu-flow/">See it run <i class="pi pi-arrow-right" aria-hidden="true"></i></a>
    </figcaption>
  </figure>
</template>

<style scoped>
.run {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 1px 0 var(--line), 0 18px 40px -28px rgb(0 0 0 / 0.35);
  font-family: var(--font-mono);
  font-size: 0.84rem;
  overflow: hidden;
  min-width: 0;
}

.run-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  background: var(--code-bg);
}

.dots {
  display: inline-flex;
  gap: 5px;
}

.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--line);
}

.run-name {
  font-weight: 500;
  color: var(--ink);
}

.run-caption {
  color: var(--muted);
}

.steps {
  list-style: none;
  margin: 0;
  padding: 14px 16px 6px;
  display: grid;
  gap: 2px;
}

.steps li {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  align-items: start;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px dashed var(--line);
}

.steps li:last-child {
  border-bottom: 0;
}

.marker {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
}

.marker .pi {
  font-size: 0.62rem;
}

.checkpoint .marker {
  background: var(--check-soft);
  color: var(--check);
  border-radius: 5px;
}

.text {
  color: var(--ink);
  line-height: 1.45;
}

.detail {
  color: var(--faint);
  margin-left: 6px;
}

.badge {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--check);
  padding-top: 2px;
}

.run-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  padding: 12px 16px 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.78rem;
}

.see {
  margin-left: auto;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.see .pi {
  font-size: 0.7rem;
}

.see:hover {
  text-decoration: underline;
}

.run-foot strong {
  color: var(--ink);
  font-weight: 500;
}
</style>
