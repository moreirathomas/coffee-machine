import { formatMessage } from './message'

describe('Forwading message', () => {
  it('The drink make can deliver info messages to the customer if ordered so', () => {
    expect(formatMessage('Hello world')).toBe('M:Hello world')
  })
})
