type Type = 'tea' | 'coffee' | 'chocolate'

type Sugar = 0 | 1 | 2

export interface Drink {
  type: Type
  sugar: Sugar
}
