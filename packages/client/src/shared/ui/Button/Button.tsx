import { ButtonProps, ButtonTheme } from './Button.types'
import { FC } from 'react'
import cn from 'classnames'

import styles from './Button.module.scss'

const Button: FC<ButtonProps> = ({
  children,
  theme = ButtonTheme.GREEN,
  mode,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[theme],
        mode && styles[mode],
        size && styles[size],
        className && [className]
      )}
      {...props}>
      {children}
    </button>
  )
}

export default Button
