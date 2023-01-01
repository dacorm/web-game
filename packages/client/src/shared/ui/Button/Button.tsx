import { FC } from 'react';
import cn from 'classnames';
import { ButtonProps, ButtonTheme } from './Button.types';

import styles from './Button.module.css';

/**
 * Компонент Button
 * @component
 * @example
 * return (
 *   <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
            Я кнопка
          </Button>
 * )
 */

const Button: FC<ButtonProps> = ({
    children,
    theme = ButtonTheme.GREEN,
    mode,
    size,
    colorText,
    className,
    type = 'button',
    ...props
}: ButtonProps) => (
    <button
        className={cn(
            styles.button,
            styles[theme],
            mode && styles[mode],
            colorText && styles[colorText],
            size && styles[size],
            className && [className],
        )}
        type={type}
        {...props}
    >
        {children}
    </button>
);

export default Button;
