import { useCallback, useState } from 'react';
import styles from './User.module.css';
import boom from '../../../../../assets/img/bum.png';
import { Player } from '../../../../../models/Player/Player';
import Button from '../../../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../../../shared/ui/shared/shared.button.types';
import Modal from '../../../../../shared/ui/Modal';

interface UserProps {
  player: Player
  currentPlayer: Player
  handleDeleteActivePlayer: (idPlayer: number) => void
}

export const User = ({
    player,
    currentPlayer,
    handleDeleteActivePlayer,
}: UserProps) => {
    const playerColor = {
        background: player.fill,
    };

    const [modals, setModals] = useState({
        showDefaulterModal: false,
        showTradeModal: false,
    });

    const closeModal = useCallback(
        (keyType: keyof typeof modals) => () => {
            setModals((prev) => ({ ...prev, [keyType]: false }));
        },
        [],
    );
    const openModal = useCallback(
        (keyType: keyof typeof modals) => () => {
            setModals((prev) => ({ ...prev, [keyType]: true }));
        },
        [],
    );

    return (
        <>
            <div className={styles.userData}>
                <div>
                    <img
                        alt={player.avatar}
                        src={player.avatar}
                        className={styles.userImg}
                    />
                </div>

                <div className={styles.data}>
                    <div>{player.displayName}</div>
                    <hr className={styles.hr} />
                    <div className={styles.balance}>
                        {player.balance}
                        {' '}
                        $
                    </div>
                </div>
                <div className={styles.color} style={playerColor}>
                    {player.userId === currentPlayer.userId && (
                        <img src={boom} alt="boom" />
                    )}
                </div>
                <div className={styles.menu}>
                    {player.userId === currentPlayer.userId && (
                        <Button
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            onClick={openModal('showDefaulterModal')}
                        >
                            Сдаться
                        </Button>
                    )}
                    {player.userId !== currentPlayer.userId && (
                        <Button
                            theme={ButtonTheme.GREEN}
                            size={ButtonSize.M}
                            onClick={openModal('showTradeModal')}
                        >
                            Предложить обмен
                        </Button>
                    )}
                </div>
            </div>
            <Modal
                title="Вы уверены?"
                isShow={modals.showDefaulterModal}
                onClose={closeModal('showDefaulterModal')}
            >
                <div className={styles.defaulterWrapper}>
                    <div className={styles.defaulterText}>
                        Вы собираетесь объявиться банкротом
                        <br />
                        и завершить игру
                    </div>
                    <Button
                        size={ButtonSize.M}
                        theme={ButtonTheme.GREEN}
                        className={styles.btnModal}
                        onClick={() => {
                            handleDeleteActivePlayer(player.userId);
                            closeModal('showDefaulterModal');
                        }}
                    >
                        Подтверждаю
                    </Button>
                </div>
            </Modal>
            <Modal
                title="Попозже сделаю"
                isShow={modals.showTradeModal}
                onClose={closeModal('showTradeModal')}
            >
                <div />
            </Modal>
        </>
    );
};
