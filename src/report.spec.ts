import { Chocolate, Coffee, Orange, Tea } from './drink'
import { Repository } from './report'

describe('Reporting', () => {
  describe(`I want to be able to print a report anytime that contains:
   how many of each drink was sold and the total amount of money earned so far.`, () => {
    it('total amount of money earned', () => {
      const repo = new Repository()

      expect(repo.peek().totalEarned).toBe(0)
      repo.add(new Tea(0))

      expect(repo.peek().totalEarned).toBe(0.4)
      repo.add(new Tea(0))

      expect(repo.peek().totalEarned).toBe(0.8)
    })

    it('how many of each drink was sold', () => {
      const repo = new Repository()

      expect(repo.peek().drinks).toEqual({
        T: 0,
        C: 0,
        H: 0,
        O: 0,
      })

      repo.add(new Tea(0))
      repo.add(new Tea(0))
      repo.add(new Coffee(0))
      repo.add(new Chocolate(0))

      expect(repo.peek().drinks).toEqual({
        T: 2,
        C: 1,
        H: 1,
        O: 0,
      })
    })

    it('print', () => {
      const repo = new Repository()

      const logger = { log: jest.fn() }

      repo.print(logger)

      expect(logger.log).toHaveBeenCalledWith({
        drinks: {
          T: 0,
          C: 0,
          H: 0,
          O: 0,
        },
        totalEarned: 0,
      })
    })
  })
})
