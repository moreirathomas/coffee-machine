import { ErrorCommand } from './command'
import { DrinkOrder } from './drink'
import { formatMessage } from './message'

export interface ShortageHandler {
  beverageQuantityChecker(drink: DrinkOrder): boolean

  notifyMissingDrink(drink: DrinkOrder): void
}

type OK = { type: 'ok'; value: null }

export function inject(handler: ShortageHandler) {
  return (drink: DrinkOrder): ErrorCommand | OK => {
    if (handler && !handler.beverageQuantityChecker(drink)) {
      handler.notifyMissingDrink(drink)

      return {
        type: 'error',
        value: formatMessage(`Shortage of ${drink.type}`),
      }
    }

    return {
      type: 'ok',
      value: null,
    }
  }
}
