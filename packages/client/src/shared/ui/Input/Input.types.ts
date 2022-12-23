import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export enum InputMode {
  TEXT = 'text',
}
export enum InputFeature {
  DYNAMIC_PLACEHOLDER = 'dynamic_placeholder',
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
