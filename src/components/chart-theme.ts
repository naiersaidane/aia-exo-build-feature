// Source unique de couleurs pour recharts (qui ne lit pas les classes Tailwind).
// Valeurs hex alignées sur les tokens @theme de globals.css.
export const CHART = {
  primary: '#0061ff', // aia-blue — la note, donnée principale
  secondary: '#cce0ff', // sky-tint — données contextuelles (volume)
  accent: '#ff4d00', // signal-orange
  grid: '#e5e7eb', // cloud-canvas
  axis: '#727272', // slate-gray (texte des ticks)
  axisLine: '#c7c7c7', // frost-gray (lignes d'axe)
  text: '#262626', // ink-black
} as const;

// Style partagé du tooltip recharts (même langage visuel que les cartes).
export const TOOLTIP_CONTENT_STYLE = {
  borderRadius: 16,
  background: '#f9f9f9', // paper-white
  border: 'none',
} as const;
