import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../shared/ui/Modal';
import { ProfileFormPass } from '../../components/Profile/ProfileFormPass/ProfileFormPass';
import ProfileFormAvatar from '../../components/Profile/ProfileFormAvatar';
import ProfileBlockAvatar from '../../components/Profile/ProfileBlockAvatar';
import ProfileBlockData from '../../components/Profile/ProfileBlockData';
import Button from '../../shared/ui/Button';
import {
    ButtonColorText,
    ButtonSize,
    ButtonTheme,
} from '../../shared/ui/Button/Button.types';

import styles from './Profile.module.css';
import defaultAvatar from '../../assets/img/defaultUserAvatar.png';
import { TProfileModals } from './Profile.types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { logoutThunk } from '../../redux/actionCreators/user';
import { ROUTES } from '../../layout/RouterLayout/RouterConst';
import { Dispatcher } from '../../redux/store';
import { ProtectedRoute } from '../../hof/protectedRoute';

const userData = {
    points: 10,
    games: 10,
    rating: 5,
    userName: 'Super 2022',
    userLogo: defaultAvatar,
};

function Profile() {
    const [modals, setModals] = useState<TProfileModals>({
        showPasswordModal: false,
        showAvatarModal: false,
    });

    const userState = useTypedSelector((state) => state.user);

    const openPasswordModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showPasswordModal: true }));
    }, []);
    const closePasswordModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showPasswordModal: false }));
    }, []);

    const openAvatardModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showAvatarModal: true }));
    }, []);
    const closeAvatardModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showAvatarModal: false }));
    }, []);
    const dispatch = useDispatch<Dispatcher>();
    const navigate = useNavigate();
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logoutThunk());
        navigate(ROUTES.AUTH);
    };
    return (
        <>
            <div className={styles.block}>
                <ProfileBlockAvatar
                    avatar={userState.avatar}
                    onClick={openAvatardModal}
                />
                <ProfileBlockData
                    points={userData.points}
                    rating={userData.rating}
                    games={userData.games}
                    userName={userState.userName}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button
                    theme={ButtonTheme.GREEN}
                    size={ButtonSize.M}
                    className={styles.button}
                    onClick={openPasswordModal}
                >
                    Изменить пароль
                </Button>
                <Button
                    theme={ButtonTheme.TRANSPARENT}
                    type="submit"
                    size={ButtonSize.M}
                    colorText={ButtonColorText.RED}
                    className={styles.button}
                    onClick={handleLogout}
                >
                    Выход
                </Button>
            </div>

            <Modal
                title="Изменение пароля"
                isShow={modals.showPasswordModal}
                onClose={closePasswordModal}
            >
                <ProfileFormPass />
            </Modal>

            <Modal
                title="Изменение аватара"
                isShow={modals.showAvatarModal}
                onClose={closeAvatardModal}
            >
                <ProfileFormAvatar />
            </Modal>
        </>
    );
}

export default ProtectedRoute(Profile, {});
