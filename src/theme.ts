import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

// Aura with a teal primary (the "approved" color of the agent run card)
// and warm stone neutrals to match the paper-like background.
export const PortfolioPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}', 100: '{teal.100}', 200: '{teal.200}', 300: '{teal.300}', 400: '{teal.400}',
      500: '{teal.500}', 600: '{teal.600}', 700: '{teal.700}', 800: '{teal.800}', 900: '{teal.900}', 950: '{teal.950}',
    },
    focusRing: { width: '2px', style: 'solid', color: '{primary.color}', offset: '2px' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff', 50: '{stone.50}', 100: '{stone.100}', 200: '{stone.200}', 300: '{stone.300}', 400: '{stone.400}',
          500: '{stone.500}', 600: '{stone.600}', 700: '{stone.700}', 800: '{stone.800}', 900: '{stone.900}', 950: '{stone.950}',
        },
        primary: { color: '{teal.700}', contrastColor: '#ffffff', hoverColor: '{teal.800}', activeColor: '{teal.900}' },
      },
      dark: {
        surface: {
          0: '#ffffff', 50: '{zinc.50}', 100: '{zinc.100}', 200: '{zinc.200}', 300: '{zinc.300}', 400: '{zinc.400}',
          500: '{zinc.500}', 600: '{zinc.600}', 700: '{zinc.700}', 800: '{zinc.800}', 900: '{zinc.900}', 950: '{zinc.950}',
        },
        primary: { color: '{teal.300}', contrastColor: '{zinc.950}', hoverColor: '{teal.200}', activeColor: '{teal.100}' },
      },
    },
  },
})
