import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export enum InputMode {
  TEXT = 'text',
}
export enum InputFeature {
  DINAMIC_PLACEHOLDER = 'dinamic_placeholder',
}

export interface InputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  mode?: InputMode
  feature?: InputFeature
  children?: ReactNode
}
