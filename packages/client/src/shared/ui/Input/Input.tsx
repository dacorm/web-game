import { InputFeature, InputProps } from './Input.types'
import { FC, useCallback, useRef, useState } from 'react'
import cn from 'classnames'

import styles from './Input.module.scss'

const Input: FC<InputProps> = ({
  children,
  mode,
  feature,
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
            type="text"
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

    default: {
      return (
        <input
          type="text"
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
