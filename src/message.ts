type MessageFlag = 'M'

type Message = `${MessageFlag}:${string}`

export function forwardMessage(message: string): Message {
  return `M:${message}`
}
