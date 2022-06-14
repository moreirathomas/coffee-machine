import { Chocolate, Coffee, Orange, Tea } from './drink'
import { makeCommand } from './command'

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
      expect(makeCommand(new Tea(0)).value).toBe('T::')
    })

    it('coffee', () => {
      expect(makeCommand(new Coffee(0)).value).toBe('C::')
    })

    it('chocolate', () => {
      expect(makeCommand(new Chocolate(0)).value).toBe('H::')
    })

    it('orange juice', () => {
      expect(makeCommand(new Orange()).value).toBe('O::')
    })
  })

  describe('[sugar flag] I want to be able to send instructions to the drink maker to add one or two sugars', () => {
    it('no sugar', () => {
      expect(makeCommand(new Tea(0)).value).toBe('T::')
    })

    it('1 sugar', () => {
      expect(makeCommand(new Tea(1)).value).toBe('T:1:0')
    })

    it('2 sugars', () => {
      expect(makeCommand(new Tea(2)).value).toBe('T:2:0')
    })
  })

  describe('[stick flag] When my order contains sugar the drink maker should add a stick (touillette) with it', () => {
    it('without stick when drink has no sugar', () => {
      expect(makeCommand(new Tea(0)).value).toBe('T::')
    })

    it('with stick when drink has 1 sugar', () => {
      expect(makeCommand(new Tea(1)).value).toBe('T:1:0')
    })

    it('with stick when drink has 2 sugars', () => {
      expect(makeCommand(new Tea(2)).value).toBe('T:2:0')
    })
  })

  describe('[heat flag] I want to be able to have my coffee, chocolate or tea extra hot', () => {
    it('extra hot coffee', () => {
      expect(makeCommand(new Coffee(0, 'extra_hot')).value).toBe('Ch::')
    })

    it('extra hot chocolate', () => {
      expect(makeCommand(new Chocolate(1, 'extra_hot')).value).toBe('Hh:1:0')
    })

    it('extra hot tea', () => {
      expect(makeCommand(new Tea(2, 'extra_hot')).value).toBe('Th:2:0')
    })
  })
})
