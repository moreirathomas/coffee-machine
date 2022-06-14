import { isEnoughIfGTE, withStickIfSugar } from '../composables'
import type { WithHeat, WithPrice, WithSugar } from '../composables'

type Type = 'T' | 'C' | 'H' | 'O'

interface Drink {
  type: Type
}

export type DrinkOrder = Drink & WithSugar & WithPrice & WithHeat

// Below are all the drinks that can be ordered via the drink maker protocol.

export class Tea implements DrinkOrder {
  readonly type = 'T'
  readonly price = 0.4
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat?: 'hot' | 'extra_hot') {
    this.sugar = sugar
    this.heat = heat || 'hot'
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }

  isEnough(money: number): boolean {
    return isEnoughIfGTE(money, this.price)
  }
}

export class Coffee implements DrinkOrder {
  readonly type = 'C'
  readonly price = 0.6
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }

  isEnough(money: number): boolean {
    return isEnoughIfGTE(money, this.price)
  }
}

export class Chocolate implements DrinkOrder {
  readonly type = 'H'
  readonly price = 0.5
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }

  isEnough(money: number): boolean {
    return isEnoughIfGTE(money, this.price)
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
    return isEnoughIfGTE(money, this.price)
  }
}
