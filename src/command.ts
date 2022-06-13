import { DrinkOrder } from './drink'
import { forwardMessage } from './message'

type TypeFlag = DrinkOrder['type']

type SugarFlag = '' | '1' | '2'

type StickFlag = '' | '0'

type Command = `${TypeFlag}:${SugarFlag}:${StickFlag}`

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
  sugar: SugarFlag,
  stick: StickFlag
): Command {
  return `${type}${seperator}${sugar}${seperator}${stick}`
}

export function makeCommand(drink: DrinkOrder, money: number): Command {
  if (!drink.isEnough(money)) {
    throw new Error(
      forwardMessage(`Not enough money: requires ${drink.price} Euro`)
    )
  }

  const sugarFlag = parseSugarFlag(drink.sugar)
  const stickFlag = parseStickFlag(drink.isWithStick())

  return formatFlags(drink.type, sugarFlag, stickFlag)
}
