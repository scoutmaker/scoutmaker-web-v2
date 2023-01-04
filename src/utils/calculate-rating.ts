export function calculateRating(percentage: number, maxRating: number = 4) {
  return parseFloat(((percentage / 100) * maxRating).toFixed(2))
}
