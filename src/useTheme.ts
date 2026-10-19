import { ref } from 'vue'

const KEY = 'theme'
type Mode = 'light' | 'dark'

function read(): Mode | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function system(): Mode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// A host page (for example an embedded preview) can force a theme with data-theme on <html>.
function forced(): Mode | null {
  const v = document.documentElement.getAttribute('data-theme')
  return v === 'light' || v === 'dark' ? v : null
}

const mode = ref<Mode>(forced() ?? read() ?? system())

new MutationObserver(() => {
  const f = forced()
  if (f && f !== mode.value) {
    mode.value = f
    apply(f)
  }
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

function apply(m: Mode) {
  document.documentElement.classList.toggle('app-dark', m === 'dark')
}

export function useTheme() {
  apply(mode.value)
  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    apply(mode.value)
    try {
      localStorage.setItem(KEY, mode.value)
    } catch {
      /* storage blocked: keep the choice for this visit only */
    }
  }
  return { mode, toggle }
}
