export interface WithPrice {
  price: number
  isEnough(money: number): boolean
}

export const computeIsEnough = (
  moneyProvided: number,
  price: number
): boolean => moneyProvided >= price
