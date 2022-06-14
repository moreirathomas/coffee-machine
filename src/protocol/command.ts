import { DrinkOrder } from './drink'
import { Message } from './message'

type TypeFlag = DrinkOrder['type']

type HeatFlag = '' | 'h'

type SugarFlag = '' | '1' | '2'

type StickFlag = '' | '0'

type Command = `${TypeFlag}${HeatFlag}:${SugarFlag}:${StickFlag}`

function parseHeatFlag(heat: DrinkOrder['heat']): HeatFlag {
  return heat === 'extra_hot' ? 'h' : ''
}

function parseSugarFlag(sugar: DrinkOrder['sugar']): SugarFlag {
  switch (sugar) {
    case 0:
      return ''
    case 1:
      return '1'
    case 2:
      return '2'
  }
}

function parseStickFlag(useStick: boolean): StickFlag {
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

export type MaybeCommand =
  | {
      type: 'command'
      value: Command
    }
  | {
      type: 'error'
      value: Message
    }

export type ErrorCommand = Exclude<MaybeCommand, { type: 'command' }>

export function makeCommand(drink: DrinkOrder): MaybeCommand {
  const heatFlag = parseHeatFlag(drink.heat)
  const sugarFlag = parseSugarFlag(drink.sugar)
  const stickFlag = parseStickFlag(drink.isWithStick())

  return {
    type: 'command',
    value: formatFlags(drink.type, heatFlag, sugarFlag, stickFlag),
  }
}
