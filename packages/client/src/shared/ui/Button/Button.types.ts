import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export enum ButtonTheme {
  GREEN = 'green',
  GREY = 'grey',
  TRANSPARENT = 'transparent',
}

export enum ButtonMode {
  FULL_SIZE = 'full_size',
}

export enum ButtonSize {
  S = 's',
  M = 'm',
  X = 'x',
}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: ButtonTheme
  mode?: ButtonMode
  size?: ButtonSize
  children: ReactNode
}
