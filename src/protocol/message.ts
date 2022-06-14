type MessageFlag = 'M'

export type Message = `${MessageFlag}:${string}`

const seperator = ':' as const

export function formatMessage(message: string): Message {
  return `M${seperator}${message}`
}
