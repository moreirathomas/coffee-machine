import { Chocolate, Coffee, Tea } from './drink'
import { makeCommand } from './command'

// We test the ability to create a command from a drink.
// The drink maker receives a command. This command is
// a string composed of 3 flags (type, sugar, stick).
// There may be correlations between flags. However
// here we only care about the ability of computing a
// command string. We do not rely on the underlying
// correlation when testing each flag computation.

describe('Drink maker protocol', () => {
  describe('[type flag] The drink maker should receive the correct instructions for my coffee/tea/chocolate order', () => {
    it('flag tea in command', () => {
      expect(makeCommand(new Tea(0), 1)).toBe('T::')
    })

    it('flag coffee in command', () => {
      expect(makeCommand(new Coffee(0), 1)).toBe('C::')
    })

    it('flag chocolate in command', () => {
      expect(makeCommand(new Chocolate(0), 1)).toBe('H::')
    })
  })

  describe('[sugar flag] I want to be able to send instructions to the drink maker to add one or two sugars', () => {
    it('flag no sugar', () => {
      expect(makeCommand(new Tea(0), 1)).toBe('T::')
    })

    it('flag 1 sugar', () => {
      expect(makeCommand(new Tea(1), 1)).toBe('T:1:0')
    })

    it('flag 2 sugars', () => {
      expect(makeCommand(new Tea(2), 1)).toBe('T:2:0')
    })
  })

  describe('[stick flag] When my order contains sugar the drink maker should add a stick (touillette) with it', () => {
    it('flag without stick when drink has no sugar', () => {
      expect(makeCommand(new Tea(0), 1)).toBe('T::')
    })

    it('flag with stick when drink has 1 sugar', () => {
      expect(makeCommand(new Tea(1), 1)).toBe('T:1:0')
    })

    it('flag with stick when drink has 2 sugars', () => {
      expect(makeCommand(new Tea(2), 1)).toBe('T:2:0')
    })
  })
})

describe('Pricing', () => {
  describe('The drink maker should make the drinks only if the correct amount of money is given', () => {
    it('correct amount of money', () => {
      expect(() => makeCommand(new Tea(0), 0.4)).not.toThrow()
    })

    it('not enough money', () => {
      expect(() => makeCommand(new Tea(0), 0)).toThrowError(
        'M:Not enough money'
      )
    })

    it('too much money', () => {
      expect(() => makeCommand(new Tea(0), 1)).not.toThrow()
    })
  })

  describe(`If not enough money is provided, we want to send a message to the drink maker.
   The message should contain at least the amount of money missing`, () => {
    expect(() => makeCommand(new Tea(0), 0)).toThrowError(
      'M:Not enough money: requires 0.4 Euro'
    )
  })
})
