import { InputFeature, InputProps } from './Input.types'
import { FC, useCallback, useRef, useState } from 'react'
import cn from 'classnames'

import styles from './Input.module.css'

/**
 * Компонент Input
 * @component
 * @example
 * return (
 *   <Input feature={InputFeature.WITH_LABEL} type={'email'} label='Электронная почта' />
 * )
 */

const Input: FC<InputProps> = ({
  children,
  mode,
  feature,
  label,
  className,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    inputRef.current && !inputRef.current.value.length && setIsFocus(false)
  }, [])

  switch (feature) {
    case InputFeature.DYNAMIC_PLACEHOLDER: {
      return (
        <div className={styles['dynamic_wrapper']}>
          <span
            className={
              isFocus
                ? styles['dynamic_placeholder-up']
                : styles['dynamic_placeholder-down']
            }>
            {inputRef.current && inputRef.current.placeholder}
          </span>

          <input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              styles.input,
              mode && styles[mode],
              className && [className]
            )}
            {...props}>
            {children}
          </input>
        </div>
      )
    }

    case InputFeature.WITH_LABEL: {
      return (
        <label className={styles.label}>
          {label}
          <input className={cn(styles.inputWithLabel, className)} {...props}>
            {children}
          </input>
        </label>
      )
    }

    default: {
      return (
        <input
          className={cn(
            styles.input,
            mode && styles[mode],
            className && [className]
          )}
          {...props}>
          {children}
        </input>
      )
    }
  }
}

export default Input
