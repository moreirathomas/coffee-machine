import { DrinkOrder } from './drink'

type TypeFlag = DrinkOrder['type']

type HeatFlag = '' | 'h'

type SugarFlag = '' | '1' | '2'

type StickFlag = '' | '0'

type Command = `${TypeFlag}${HeatFlag}:${SugarFlag}:${StickFlag}`

const parseHeatFlag = (heat: DrinkOrder['heat']): HeatFlag => {
  return heat === 'extra_hot' ? 'h' : ''
}

const parseSugarFlag = (sugar: DrinkOrder['sugar']): SugarFlag => {
  switch (sugar) {
    case 0:
      return ''
    case 1:
      return '1'
    case 2:
      return '2'
  }
}

const parseStickFlag = (useStick: boolean): StickFlag => {
  return useStick ? '0' : ''
}

const seperator = ':' as const

function formatFlags(
  type: TypeFlag,
  heat: HeatFlag,
  sugar: SugarFlag,
  stick: StickFlag
): Command {
  return `${type}${heat}${seperator}${sugar}${seperator}${stick}`
}

type MessageFlag = 'M'

type Message = `${MessageFlag}:${string}`

export function formatForwardMessage(message: string): Message {
  return `M${seperator}${message}`
}

type MaybeCommand =
  | {
      type: 'command'
      value: Command
    }
  | {
      type: 'error'
      value: Message
    }

export function makeCommand(drink: DrinkOrder, money: number): MaybeCommand {
  if (!drink.isEnough(money)) {
    return {
      type: 'error',
      value: formatForwardMessage(
        `Not enough money: requires ${drink.price} Euro`
      ),
    }
  }

  const heatFlag = parseHeatFlag(drink.heat)
  const sugarFlag = parseSugarFlag(drink.sugar)
  const stickFlag = parseStickFlag(drink.isWithStick())

  return {
    type: 'command',
    value: formatFlags(drink.type, heatFlag, sugarFlag, stickFlag),
  }
}
