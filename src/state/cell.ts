export type CellType = 'code' | 'text'

export interface Cell {
  id: string
  type: CellType
  content: string
}

export const randomId = () => {
  return Math.random().toString(36).substring(2, 5)
}
