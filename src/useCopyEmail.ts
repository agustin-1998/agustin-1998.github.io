import { useToast } from 'primevue/usetoast'
import { profile } from './data/profile'

export function useCopyEmail() {
  const toast = useToast()
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast.add({ severity: 'success', summary: 'Email copied', detail: profile.email, life: 2500 })
    } catch {
      toast.add({ severity: 'info', summary: 'Copy it from here', detail: profile.email, life: 6000 })
    }
  }
  return { copy }
}
