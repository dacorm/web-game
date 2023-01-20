import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import {
    ButtonColorText, ButtonMode, ButtonSize, ButtonTheme,
} from '../shared/shared.button.types';

export { ButtonTheme };

export { ButtonMode };

export { ButtonSize };

export { ButtonColorText };

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> {
  theme: ButtonTheme
  mode?: ButtonMode
  size: ButtonSize
  colorText?: ButtonColorText
  children: ReactNode
}
