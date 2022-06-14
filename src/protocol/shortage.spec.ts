import { Tea } from './drink'
import { inject, ShortageHandler } from './shortage'

describe('Shortage', () => {
  it(`When I order a drink and it can't be delivered because of a shortage,
    I want to see a message to the coffee machine console that indicates me the shortage
    and that a notification has been sent`, () => {
    const shortageHandler: ShortageHandler = {
      beverageQuantityChecker: () => false,
      notifyMissingDrink: () => {},
    }

    expect(inject(shortageHandler)(new Tea(0)).type).toBe('error')
  })

  it('When there is no shortage, it should continue the drink maker protocol', () => {
    const shortageHandler: ShortageHandler = {
      beverageQuantityChecker: () => true,
      notifyMissingDrink: () => {},
    }

    expect(inject(shortageHandler)(new Tea(0)).type).toBe('ok')
  })
})
