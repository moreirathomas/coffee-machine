import { forwardMessage, makeCommand } from './protocol'

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
      expect(makeCommand({ type: 'tea', sugar: 0 })).toBe('T::')
    })

    it('flag coffee in command', () => {
      expect(makeCommand({ type: 'coffee', sugar: 0 })).toBe('C::')
    })

    it('flag chocolate in command', () => {
      expect(makeCommand({ type: 'chocolate', sugar: 0 })).toBe('H::')
    })
  })

  describe('[sugar flag] I want to be able to send instructions to the drink maker to add one or two sugars', () => {
    it('flag no sugar', () => {
      expect(makeCommand({ type: 'tea', sugar: 0 })).toBe('T::')
    })

    it('flag 1 sugar', () => {
      expect(makeCommand({ type: 'tea', sugar: 1 })).toBe('T:1:0')
    })

    it('flag 2 sugars', () => {
      expect(makeCommand({ type: 'tea', sugar: 2 })).toBe('T:2:0')
    })
  })

  describe('[stick flag] When my order contains sugar the drink maker should add a stick (touillette) with it', () => {
    it('flag without stick when drink has no sugar', () => {
      expect(makeCommand({ type: 'tea', sugar: 0 })).toBe('T::')
    })

    it('flag with stick when drink has 1 sugar', () => {
      expect(makeCommand({ type: 'tea', sugar: 1 })).toBe('T:1:0')
    })

    it('flag with stick when drink has 2 sugars', () => {
      expect(makeCommand({ type: 'tea', sugar: 2 })).toBe('T:2:0')
    })
  })

  describe('[message flag] The drink make can deliver info messages to the customer if ordered so', () => {
    it('flag message', () => {
      expect(forwardMessage('Hello world')).toBe('M:Hello world')
    })
  })
})
