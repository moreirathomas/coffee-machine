import { isEnoughIfGTE } from '../composables'
import { ErrorCommand } from './command'
import { DrinkOrder } from './drink'
import { formatMessage } from './message'

type OK = { type: 'ok'; value: null }

type Prices = Record<DrinkOrder['type'], number>

const prices: Prices = {
  T: 0.4,
  C: 0.6,
  H: 0.5,
  O: 0.6,
}

export function inject(prices: Prices) {
  return (drink: DrinkOrder, money: number): ErrorCommand | OK => {
    if (!isEnoughIfGTE(money, prices[drink.type])) {
      return {
        type: 'error',
        value: formatMessage(`Not enough money: requires ${drink.price} Euro`),
      }
    }

    return {
      type: 'ok',
      value: null,
    }
  }
}

export const defaultPricingHandler = inject(prices)
