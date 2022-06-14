import { withStickIfSugar } from '../composables'
import type { WithHeat, WithSugar } from '../composables'

type Type = 'T' | 'C' | 'H' | 'O'

interface Drink {
  type: Type
}

export type DrinkOrder = Drink & WithSugar & WithHeat

// Below are all the drinks that can be ordered via the drink maker protocol.
// WithSugar interface is implemented by each drink by composition instead of inheritance.

export class Tea implements DrinkOrder {
  readonly type = 'T'
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat?: 'hot' | 'extra_hot') {
    this.sugar = sugar
    this.heat = heat || 'hot'
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }
}

export class Coffee implements DrinkOrder {
  readonly type = 'C'
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }
}

export class Chocolate implements DrinkOrder {
  readonly type = 'H'
  readonly sugar
  readonly heat

  constructor(sugar: 0 | 1 | 2, heat: 'hot' | 'extra_hot' = 'hot') {
    this.sugar = sugar
    this.heat = heat
  }

  isWithStick(): boolean {
    return withStickIfSugar(this.sugar)
  }
}

export class Orange implements DrinkOrder {
  readonly type = 'O'
  readonly sugar = 0
  readonly heat = 'cold'

  isWithStick(): boolean {
    return false
  }
}
