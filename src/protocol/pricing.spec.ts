import { defaultPricingHandler } from './pricing'
import { Tea } from './drink'

describe('Pricing', () => {
  describe('The drink maker should make the drinks only if the correct amount of money is given', () => {
    it('correct amount of money', () => {
      expect(defaultPricingHandler(new Tea(0), 0.4).type).toBe('ok')
    })

    it('not enough money', () => {
      expect(defaultPricingHandler(new Tea(0), 0).type).toBe('error')
    })

    it('too much money', () => {
      expect(defaultPricingHandler(new Tea(0), 1).type).toBe('ok')
    })
  })

  describe(`If not enough money is provided, we want to send a message to the drink maker.
     The message should contain at least the amount of money missing`, () => {
    expect(defaultPricingHandler(new Tea(0), 0).value).toBe(
      'M:Not enough money: requires 0.4 Euro'
    )
  })
})
