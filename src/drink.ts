import { computeIsEnough, WithPrice } from './price'
import { computeIsWithStick, WithSugar } from './sugar'

interface Drink {
  type: 'T' | 'C' | 'H' | 'O'
}

export type DrinkOrder = Drink & WithSugar & WithPrice

export class Tea implements DrinkOrder {
  readonly type = 'T'
  readonly price = 0.4

  constructor(public sugar: 0 | 1 | 2) {
    this.sugar = sugar
  }

  isWithStick(): boolean {
    return computeIsWithStick(this.sugar)
  }

  isEnough(money: number): boolean {
    return computeIsEnough(money, this.price)
  }
}

export class Coffee implements DrinkOrder {
  readonly type = 'C'
  readonly price = 0.6

  constructor(public sugar: 0 | 1 | 2) {
    this.sugar = sugar
  }

  isWithStick(): boolean {
    return computeIsWithStick(this.sugar)
  }

  isEnough(money: number): boolean {
    return computeIsEnough(money, this.price)
  }
}

export class Chocolate implements DrinkOrder {
  readonly type = 'H'
  readonly price = 0.5

  constructor(public sugar: 0 | 1 | 2) {
    this.sugar = sugar
  }

  isWithStick(): boolean {
    return computeIsWithStick(this.sugar)
  }

  isEnough(money: number): boolean {
    return computeIsEnough(money, this.price)
  }
}
