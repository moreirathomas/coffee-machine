export interface WithPrice {
  price: number
  isEnough(money: number): boolean
}

export const isEnoughIfGTE = (moneyProvided: number, price: number): boolean =>
  moneyProvided >= price
