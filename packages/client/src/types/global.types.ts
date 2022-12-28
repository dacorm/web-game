import { ReactNode } from 'react'

export interface OnlyChildren {
  children?: ReactNode
}

export interface Props {
  children?: ReactNode
  key?: string | number
}

export type TUser = {
  id_user: number
  name: string
  avatar: null
}
