import { InputFeature, InputMode, InputProps } from './Input.types'
import { FC, useCallback, useRef, useState } from 'react'
import cn from 'classnames'

import styles from './Input.module.css'

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
  mode = InputMode.TEXT,
  feature,
  label,
  customPlaceholder,
  className,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isFirstInit, setIstFirstInit] = useState(true) //если инпут только зарендерился с динам. плэйсхолд, то не вызывать анимацию
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = useCallback(() => {
    isFirstInit && customPlaceholder && setIstFirstInit(false)
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
            className={cn(styles['dynamic_placeholder'], {
              [styles['dynamic_placeholder-up']]: isFocus,
              [styles['dynamic_placeholder-down']]: !isFocus && !isFirstInit,
            })}
            onClick={() => inputRef.current?.focus()}>
            {customPlaceholder}
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
