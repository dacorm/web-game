import { ReactNode } from 'react'

export interface OnlyChildren {
  children?: ReactNode
}

export interface Props {
  children?: ReactNode
  key?: string | number
}
