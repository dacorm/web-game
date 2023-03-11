import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../BoardStage.module.css';
import { ROUTES } from '../../../constants';
import Modal from '../../../shared/ui/Modal';

type Props = {
    isShow: boolean
    onClose: () => void
}

export const PunishModal = memo((props: Props) => (
    <Modal title="Увы..." {...props}>
        <div className={styles.loseWrapper}>
            <div className={styles.loseText}>
                Достигнут статуса банкрота
                <br />
                <br />
                {' '}
                Вы проиграли!
            </div>

            <Link className={styles.loseBtn} to={ROUTES.MAIN}>Вернуться в главное меню</Link>

        </div>
    </Modal>
));
