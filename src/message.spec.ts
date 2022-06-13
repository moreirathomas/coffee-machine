import { forwardMessage } from './message'

it('The drink make can also deliver info messages to the customer if ordered so', () => {
  expect(forwardMessage('Hello world')).toBe('M:Hello world')
})
