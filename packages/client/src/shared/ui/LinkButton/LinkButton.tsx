import { Link } from 'react-router-dom';
import cn from 'classnames';
import { LinkButtonAlign, LinkButtonProps } from './LinkButton.types';
import { ButtonTheme } from '../shared/shared.button.types';
import styles from './LinkButton.module.css';

/**
 * Компонент LinkButton
 * @component
 * @example
 * return (
 *   <LinkButton to="/" text="Перейти" size={ButtonSize.M} theme={ButtonTheme.GREEN}/>
 * )
 */

export default function LinkButton({
    text,
    to,
    theme = ButtonTheme.GREEN,
    align = LinkButtonAlign.CENTER,
    mode,
    size,
    colorText,
    className,
}: LinkButtonProps): React.ReactElement {
    return (
        <Link
            to={to}
            className={cn(
                styles.button,
                styles[theme],
                styles[align],
                mode && styles[mode],
                colorText && styles[colorText],
                size && styles[size],
                className && [className],
            )}
        >
            {text}
        </Link>
    );
}
