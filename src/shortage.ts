import { DrinkOrder } from './drink'

export interface ShortageHandler {
  beverageQuantityChecker(drink: DrinkOrder): boolean

  notifyMissingDrink(drink: DrinkOrder): void
}
