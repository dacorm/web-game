import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ForumBlock from '../../components/Forum/ForumBlock';
import MenuHeader from '../../components/MenuHeader';

import styles from './Forum.module.css';
import Modal from '../../shared/ui/Modal';
import CreateForumForm from '../../components/Forum/CreateForumForm/CreateForumForm';
import { setMessages } from '../../redux/actionCreators/forum';

const Forum = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const openModal = useCallback(() => {
        setModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setModal(false);
    }, []);

    useEffect(() => {
        dispatch(setMessages([]));
    });

    return (
        <div className={styles.forum}>
            <MenuHeader
                text="Форум"
                buttonText="Создать тему"
                onClick={openModal}
            />
            <ForumBlock />
            <Modal
                title="Создание темы"
                isShow={modal}
                onClose={closeModal}
            >
                <CreateForumForm />
            </Modal>
        </div>
    );
};

export default Forum;
