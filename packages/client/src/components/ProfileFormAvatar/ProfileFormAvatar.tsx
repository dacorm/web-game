import React, { FormEvent, useState } from 'react';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import styles from './ProfileFormAvatar.module.css';
import Button from '../../shared/ui/Button';

import { useActions } from '../../hooks/useActions';

export function ProfileFormAvatar() {
    const [file, setFile] = useState<File | null>(null);
    const { setUserAvatarThunk } = useActions();
    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            if (target.files[0]) {
                setFile(target.files[0]);
            }
        }
    };

    const btnClickHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            setUserAvatarThunk(file);
        }
    };

    return (
        <form className={styles.profileForm} onSubmit={btnClickHandler}>
            <label className={styles.label} htmlFor="avatar">
                Выберите фотo
                <input
                    className={styles.fileInput}
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={changeHandler}
                />
            </label>

            {file && <p className={styles.choosedFiles}>{file ? `Выбран файл - ${file.name}` : ''}</p>}
            {file && (
                <Button
                    theme={ButtonTheme.GREEN}
                    size={ButtonSize.M}
                    type="submit"
                    className={styles.button}
                >
                    Загрузить
                </Button>
            )}
        </form>
    );
}
