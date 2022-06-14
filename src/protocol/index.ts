import { makeCommand as makeCommandFinal, MaybeCommand } from './command'
import { DrinkOrder } from './drink'
import { defaultPricingHandler } from './pricing'
import { inject as injectShortage, ShortageHandler } from './shortage'

export function makeCommand(
  drink: DrinkOrder,
  money: number,
  shortageHandler: ShortageHandler
): MaybeCommand {
  const shortageCheck = injectShortage(shortageHandler)(drink)

  if (shortageCheck.type === 'error') {
    return shortageCheck
  }

  const moneyCheck = defaultPricingHandler(drink, money)

  if (moneyCheck.type === 'error') {
    return moneyCheck
  }

  return makeCommandFinal(drink)
}
