import CountriesData from './countries-data.json'

export function getFlagEmoji(code: string) {
  let codeFinal = code.toUpperCase()

  if (code.length > 2) {
    codeFinal = CountriesData.find(e => e.alpha3 === codeFinal)?.alpha2 || code
  }

  return codeFinal
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
}
