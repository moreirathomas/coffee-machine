import { WithHeat } from './heat'
import { computeIsEnough, WithPrice } from './price'
import { computeIsWithStick, WithSugar } from './sugar'

interface Drink {
  type: 'T' | 'C' | 'H' | 'O'
}

export type DrinkOrder = Drink & WithSugar & WithPrice & WithHeat

export class Tea implements DrinkOrder {
  readonly type = 'T'
  readonly price = 0.4
  // TODO Explicit type constraints?
  sugar
  heat

  constructor(sugar: 0 | 1 | 2, heat?: 'hot' | 'extra_hot') {
    this.sugar = sugar
    this.heat = heat || 'hot'
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
  // TODO Explicit type constraints?
  sugar
  heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
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
  // TODO Explicit type constraints?
  sugar
  heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
  }

  isWithStick(): boolean {
    return computeIsWithStick(this.sugar)
  }

  isEnough(money: number): boolean {
    return computeIsEnough(money, this.price)
  }
}

export class Orange implements DrinkOrder {
  readonly type = 'O'
  readonly price = 0.6
  readonly sugar = 0
  readonly heat = 'cold'

  isWithStick(): boolean {
    return false
  }

  isEnough(money: number): boolean {
    return computeIsEnough(money, this.price)
  }
}
