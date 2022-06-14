import { DrinkOrder } from '../protocol/drink'
import type { Logger } from './logger'

type Drinks = Record<DrinkOrder['type'], number>

type Report = {
  drinks: Drinks
  totalEarned: number
}

type Prices = Record<DrinkOrder['type'], number>

const prices: Prices = {
  T: 0.4,
  C: 0.6,
  H: 0.5,
  O: 0.6,
}

export class Repository {
  private drinks: Drinks = {
    T: 0,
    C: 0,
    H: 0,
    O: 0,
  }

  private totalEarned: number = 0

  add(drink: DrinkOrder): void {
    this.drinks[drink.type]++
    this.totalEarned += prices[drink.type]
  }

  peek(): Report {
    return {
      drinks: this.drinks,
      totalEarned: this.totalEarned,
    }
  }

  print(logger: Logger): void {
    logger.log(this.peek())
  }
}
