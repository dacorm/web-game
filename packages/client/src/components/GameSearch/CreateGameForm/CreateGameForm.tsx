import React, { FC, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import CountPlayersList from '../CountPlayersList';

import styles from './CreateGameForm.module.css';

const CreateGameForm: FC = () => {
    const countPlayersAll = useRef<number[]>([2, 3, 4, 5]);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(ROUTES.GAME);
    }, []);

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
                        onClick={handleClick}
                        className={styles.button}
                    >
                        Создать игру
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CreateGameForm;
