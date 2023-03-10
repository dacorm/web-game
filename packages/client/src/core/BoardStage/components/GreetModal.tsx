import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../BoardStage.module.css';
import { ROUTES } from '../../../constants';
import Modal from '../../../shared/ui/Modal';

type Props = {
  isShow: boolean
  onClose: () => void
}

export const GreetModal = memo((props: Props) => (
    <Modal title="Поздравляем!" {...props}>
        <div className={styles.winWrapper}>
            <div className={styles.winText}>
                Достигнут статуса монополиста
                <br />
                <br />
                {' '}
                Вы выиграли!
            </div>
            <Link className={styles.winBtn} to={ROUTES.MAIN}>
                Вернуться в главное меню
            </Link>
        </div>
    </Modal>
));
