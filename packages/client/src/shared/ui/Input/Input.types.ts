import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

export enum InputMode {
  TEXT = 'text',
}
export enum InputFeature {
  DYNAMIC_PLACEHOLDER = 'dynamic_placeholder',
  WITH_LABEL = 'with_label',
}

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  mode?: InputMode
  label?: string
  feature?: InputFeature
  customPlaceholder?: string
  children?: ReactNode
}
