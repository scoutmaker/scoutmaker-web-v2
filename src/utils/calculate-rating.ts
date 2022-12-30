export function calculateRating(percentage: number) {
  return parseFloat(((percentage / 100) * 4).toFixed(2))
}
