import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

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
export enum ButtonColorText {
  BLUE = 'color-blue',
  GREY = 'color-grey',
  RED = 'color-red',
}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme: ButtonTheme
  mode?: ButtonMode
  size: ButtonSize
  colorText?: ButtonColorText
  children: ReactNode
}
