import { LinkProps } from 'react-router-dom';
import {
    ButtonColorText, ButtonMode, ButtonSize, ButtonTheme,
} from '../shared/shared.button.types';

export enum LinkButtonAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface LinkButtonProps
  extends Pick<LinkProps, 'to'> {
  text: string;
  theme: ButtonTheme
  align?: LinkButtonAlign
  mode?: ButtonMode
  size: ButtonSize
  colorText?: ButtonColorText,
  className: string,
}
