import React, { useCallback, useState } from 'react';
import ForumBlock from '../../components/Forum/ForumBlock';
import MenuHeader from '../../components/MenuHeader';

import styles from './Forum.module.css';
import Modal from '../../shared/ui/Modal';
import CreateForumForm from '../../components/Forum/CreateForumForm/CreateForumForm';

const Forum = () => {
    const [modal, setModal] = useState(false);

    const openModal = useCallback(() => {
        setModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setModal(false);
    }, []);

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
