import {
    FC, useCallback, useRef, useState,
} from 'react';
import cn from 'classnames';
import { InputFeature, InputProps } from './Input.types';

import styles from './Input.module.css';

/**
 * Компонент Input
 * @component
 * @example
 * return (
 *   <Input feature={InputFeature.WITH_LABEL} type={'email'} label='Электронная почта' />
 *   <Input
        type="text"
        mode={InputMode.TEXT}
        feature={InputFeature.DYNAMIC_PLACEHOLDER}
        customPlaceholder="Введите почту">
      </Input>
 * )
 */

const Input: FC<InputProps> = ({
    children,
    mode,
    feature,
    label,
    customPlaceholder,
    className,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = useCallback(() => {
        setIsFocus(true);
    }, []);

    const handleBlur = useCallback(() => {
        if (inputRef.current && !inputRef.current.value.length) {
            setIsFocus(false);
        }
    }, []);

    switch (feature) {
    case InputFeature.DYNAMIC_PLACEHOLDER: {
        return (
            <div className={styles.dynamic_wrapper}>
                <span
                    className={
                        isFocus
                            ? styles['dynamic_placeholder-up']
                            : styles['dynamic_placeholder-down']
                    }
                >
                    {customPlaceholder}
                </span>

                <input
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                        styles.input,
                        mode && styles[mode],
                        className && [className],
                    )}
                    {...props}
                />
            </div>
        );
    }

    case InputFeature.WITH_LABEL: {
        return (
            <label className={styles.label}>
                {label}
                <input className={cn(styles.inputWithLabel, className)} {...props} />
            </label>
        );
    }

    default: {
        return (
            <input
                className={cn(
                    styles.input,
                    mode && styles[mode],
                    className && [className],
                )}
                {...props}
            />
        );
    }
    }
};

export default Input;
