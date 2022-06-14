import { makeCommand as make, MaybeCommand } from './command'
import { DrinkOrder } from './drink'
import { formatForwardMessage } from './message'
import { inject, ShortageHandler } from './shortage'

export function makeCommand(
  drink: DrinkOrder,
  money: number,
  shortageHandler: ShortageHandler
): MaybeCommand {
  const check = inject(shortageHandler)(drink)

  if (check.type === 'error') {
    return {
      type: 'error',
      value: formatForwardMessage(check.value),
    }
  }

  return make(drink, money)
}
