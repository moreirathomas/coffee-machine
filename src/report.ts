import { DrinkOrder } from './drink'

interface Logger {
  log(message?: any): void
}

type Drinks = Record<DrinkOrder['type'], number>

type Report = {
  drinks: Drinks
  totalEarned: number
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
    this.totalEarned += drink.price
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
