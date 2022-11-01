export const getNProgressTemplate = (color: string) =>
  `<div class="bar" role="bar" style="z-index:9999999; background: ${color};"><div class="peg" style="box-shadow: 0 0 10px ${color}, 0 0 5px ${color};"></div></div><div class="spinner" role="spinner"><div class="spinner-icon" style="border-top-color: ${color};border-left-color: ${color};"></div></div>`
