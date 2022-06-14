type Sugar = 0 | 1 | 2

export interface WithSugar {
  sugar: Sugar
  isWithStick(): boolean
}

export const withStickIfSugar = (sugar: Sugar): boolean => sugar > 0
