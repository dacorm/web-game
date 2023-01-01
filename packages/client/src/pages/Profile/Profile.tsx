import React, { useState } from 'react';
import styles from './Profile.module.css';
import Modal from '../../shared/ui/Modal';
import { ProfileFormPass } from '../../components/ProfileFormPass/ProfileFormPass';
import PageHeader from '../../shared/ui/PageHeader';
import ProfileFormAvatar from '../../components/ProfileFormAvatar';
import ProfileBlockAvatar from '../../components/ProfileBlockAvatar';
import ProfileBlockData from '../../components/ProfileBlockData';
import Button from '../../shared/ui/Button';
import { ButtonTheme } from '../../shared/ui/Button/Button.types';
import userLogo from '../../assets/img/SomeUser.jpg';

const userData = {
    points: 10,
    games: 10,
    rating: 5,
    userName: 'Super 2022',
    userLogo,
};

export default function Profile() {
    const [modal, Setmodal] = useState(false);
    const [editLogo, SeteditLogo] = useState(false);
    const [editPas, SeteditPas] = useState(false);

    const onOpen = () => Setmodal(true);

    const onClose = () => {
        Setmodal(false);
        SeteditPas(false);
        SeteditLogo(false);
    };

    const editPasHandler = () => {
        SeteditPas(true);
        onOpen();
    };

    const editLogoHandler = () => {
        SeteditLogo(true);
        onOpen();
    };

    return (
        <>
            <PageHeader pageName="Профиль" />
            <div className={styles.block}>
                <ProfileBlockAvatar avatar={userData.userLogo} onClick={editLogoHandler} />
                <ProfileBlockData
                    points={userData.points}
                    rating={userData.rating}
                    games={userData.games}
                    userName={userData.userName}
                />
            </div>
            <Button
                theme={ButtonTheme.GREEN}
                type="submit"
                className={styles.button}
                onClick={editPasHandler}
            >
                Изменить пароль
            </Button>

            {modal && editPas && (
                <Modal title="Изменение пароля" onClose={onClose}>
                    <ProfileFormPass />
                </Modal>
            )}
            {modal && editLogo && (
                <Modal title="Изменение аватара" onClose={onClose}>
                    <ProfileFormAvatar />
                </Modal>
            )}

        </>

    );
}
