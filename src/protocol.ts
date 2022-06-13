import { Drink } from './drink'

type TypeFlag = 'T' | 'C' | 'H'

type SugarFlag = '' | '1' | '2'

type StickFlag = '' | '0'

type Command = `${TypeFlag}:${SugarFlag}:${StickFlag}`

const typeFlag: Record<Drink['type'], TypeFlag> = {
  tea: 'T',
  coffee: 'C',
  chocolate: 'H',
}

const sugarFlag: Record<Drink['sugar'], SugarFlag> = {
  0: '',
  1: '1',
  2: '2',
}

const pricing: Record<Drink['type'], number> = {
  tea: 0.4,
  coffee: 0.6,
  chocolate: 0.5,
}

const seperator = ':' as const

function formatFlags(
  type: TypeFlag,
  sugar: SugarFlag,
  stick: StickFlag
): Command {
  return `${type}${seperator}${sugar}${seperator}${stick}`
}

export function makeCommand(drink: Drink, money: number): Command {
  if (money < pricing[drink.type]) {
    throw new Error(
      forwardMessage(`Not enough money: requires ${pricing[drink.type]} Euro`)
    )
  }

  const type = typeFlag[drink.type]

  const sugar = sugarFlag[drink.sugar]

  // Only use a stick when sugar is > 0.
  const stick: StickFlag = drink.sugar === 0 ? '' : '0'

  return formatFlags(type, sugar, stick)
}

type MessageFlag = 'M'

type Message = `${MessageFlag}:${string}`

export function forwardMessage(message: string): Message {
  return `M:${message}`
}
