import { Chocolate, Coffee, Orange, Tea } from './drink'
import { makeCommand } from './command'
import { formatForwardMessage } from './message'

// We test the ability to create a command from a drink.
// The drink maker receives a command. This command is
// a string composed of 3 flags (type, sugar, stick).
// There may be correlations between flags. However
// here we only care about the ability of computing a
// command string. We do not rely on the underlying
// correlation when testing each flag computation.

describe('Drink maker protocol', () => {
  describe(`[type flag] The drink maker should receive the correct instructions for my
   coffee/tea/chocolate/orange juice order`, () => {
    it('tea', () => {
      expect(makeCommand(new Tea(0), 1).value).toBe('T::')
    })

    it('coffee', () => {
      expect(makeCommand(new Coffee(0), 1).value).toBe('C::')
    })

    it('chocolate', () => {
      expect(makeCommand(new Chocolate(0), 1).value).toBe('H::')
    })

    it('orange juice', () => {
      expect(makeCommand(new Orange(), 1).value).toBe('O::')
    })
  })

  describe('[sugar flag] I want to be able to send instructions to the drink maker to add one or two sugars', () => {
    it('no sugar', () => {
      expect(makeCommand(new Tea(0), 1).value).toBe('T::')
    })

    it('1 sugar', () => {
      expect(makeCommand(new Tea(1), 1).value).toBe('T:1:0')
    })

    it('2 sugars', () => {
      expect(makeCommand(new Tea(2), 1).value).toBe('T:2:0')
    })
  })

  describe('[stick flag] When my order contains sugar the drink maker should add a stick (touillette) with it', () => {
    it('without stick when drink has no sugar', () => {
      expect(makeCommand(new Tea(0), 1).value).toBe('T::')
    })

    it('with stick when drink has 1 sugar', () => {
      expect(makeCommand(new Tea(1), 1).value).toBe('T:1:0')
    })

    it('with stick when drink has 2 sugars', () => {
      expect(makeCommand(new Tea(2), 1).value).toBe('T:2:0')
    })
  })

  describe('[heat flag] I want to be able to have my coffee, chocolate or tea extra hot', () => {
    it('extra hot coffee', () => {
      expect(makeCommand(new Coffee(0, 'extra_hot'), 1).value).toBe('Ch::')
    })

    it('extra hot chocolate', () => {
      expect(makeCommand(new Chocolate(1, 'extra_hot'), 1).value).toBe('Hh:1:0')
    })

    it('extra hot tea', () => {
      expect(makeCommand(new Tea(2, 'extra_hot'), 1).value).toBe('Th:2:0')
    })
  })

  describe('[message flag] The drink make can deliver info messages to the customer if ordered so', () => {
    it('flag message', () => {
      expect(formatForwardMessage('Hello world')).toBe('M:Hello world')
    })
  })
})

describe('Pricing', () => {
  describe('The drink maker should make the drinks only if the correct amount of money is given', () => {
    it('correct amount of money', () => {
      expect(makeCommand(new Tea(0), 0.4).type).toBe('command')
    })

    it('not enough money', () => {
      expect(makeCommand(new Tea(0), 0).type).toBe('error')
    })

    it('too much money', () => {
      expect(makeCommand(new Tea(0), 1).type).toBe('command')
    })
  })

  describe(`If not enough money is provided, we want to send a message to the drink maker.
   The message should contain at least the amount of money missing`, () => {
    expect(makeCommand(new Tea(0), 0).value).toBe(
      'M:Not enough money: requires 0.4 Euro'
    )
  })
})
