export enum Sizes {
  x ='x',
  y ='y',
  width ='width',
  height ='height',
}
export enum BoardCellAxis {
  top,
  right,
  bottom,
  left,
}
export enum BoardCellGroup {
  goldenrod = 'goldenrod',
  salmon = 'salmon',
  royalBlue = 'royalBlue',
  indigo = 'indigo',
  limeGreen = 'limeGreen',
  darkOrange = 'darkOrange',
  deepPink = 'deepPink',
  linen = 'linen',
}
export enum BoardCellType {
  '???',
  department,
  property,
  tax,
  chance,
  prison,
  station,
  stage,
  box,
}

export type BoardItemSize = Record<Sizes, number> & {rotate?: number, maxWidth?: number, fontSize?: number}
