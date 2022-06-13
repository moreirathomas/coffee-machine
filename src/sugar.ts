type SugarCount = 0 | 1 | 2

export interface WithSugar {
  sugar: SugarCount
  isWithStick(): boolean
}

export const computeIsWithStick = (sugar: SugarCount): boolean => sugar > 0
