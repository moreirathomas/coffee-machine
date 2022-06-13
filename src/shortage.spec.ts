import { makeCommand } from './command'
import { Tea } from './drink'
import { ShortageHandler } from './shortage'

describe('Shortage', () => {
  it(`When I order a drink and it can't be delivered because of a shortage,
    I want to see a message to the coffee machine console that indicates me the shortage
    and that a notification has been sent`, () => {
    const shortageHandler: ShortageHandler = {
      beverageQuantityChecker: () => false,
      notifyMissingDrink: () => {},
    }

    expect(makeCommand(new Tea(0), 1, shortageHandler).value).toBe(
      'M:Shortage of T'
    )
  })
})
