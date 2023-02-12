import React, { DragEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import styles from './ProfileFormAvatar.module.css';
import Button from '../../../shared/ui/Button';
import { checkIsImageFileType } from '../../../core/checkIsImageFileType';

import { useActions } from '../../../hooks/useActions';

export function ProfileFormAvatar() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<boolean>(false);
    const { setUserAvatarThunk } = useActions();
    const errorMessage = 'Выбран ошибочный файл - необходимо изображение для загрузки';

    const putImage = (tempFile: File) => {
        if (checkIsImageFileType(tempFile)) {
            setError(false);
            setFile(tempFile);
        } else {
            setError(true);
        }
    };

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            if (target.files[0]) {
                const tempFile: File = target.files[0];
                putImage(tempFile);
            }
        }
    };

    const btnClickHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            setUserAvatarThunk(file);
            setFile(null);
        }
    };

    const handleOndragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleOndrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const tempFile = e.dataTransfer.files[0];
        if (tempFile) {
            putImage(tempFile);
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
                    accept="image/*"
                    onChange={changeHandler}
                    hidden
                />

            </label>
            <div
                className={classNames(styles.dragZone, file ? styles.active : '')}
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
            >
                <span>или перетяните на поле</span>
            </div>
            {error && <p className={styles.error}>{errorMessage}</p>}
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
