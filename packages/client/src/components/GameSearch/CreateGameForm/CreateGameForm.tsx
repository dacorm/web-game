import React, { FC, useRef } from 'react'
import Button from '../../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types'
import CountPlayersList from '../CountPlayersList'

import styles from './CreateGameForm.module.css'

const CreateGameForm: FC = () => {
  const countPlayersAll = useRef<number[]>([2, 3, 4, 5])

  return (
    <form className={styles.form}>
      <div className={styles.formInner}>
        <div className={styles.item}>
          <div className={styles.itemName}>Количество игроков:</div>
          <div className={styles.itemInput}>
            <CountPlayersList countPlayersAll={countPlayersAll.current} />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            theme={ButtonTheme.GREEN}
            size={ButtonSize.X}
            className={styles.button}>
            Создать игру
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateGameForm
