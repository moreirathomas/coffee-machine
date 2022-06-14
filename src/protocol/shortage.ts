import { DrinkOrder } from './drink'

export interface ShortageHandler {
  beverageQuantityChecker(drink: DrinkOrder): boolean

  notifyMissingDrink(drink: DrinkOrder): void
}

type MaybeOK = { type: 'ok'; value: null } | { type: 'error'; value: string }

export function inject(handler: ShortageHandler) {
  return (drink: DrinkOrder): MaybeOK => {
    if (handler && !handler.beverageQuantityChecker(drink)) {
      handler.notifyMissingDrink(drink)

      return {
        type: 'error',
        value: `Shortage of ${drink.type}`,
      }
    }

    return {
      type: 'ok',
      value: null,
    }
  }
}
