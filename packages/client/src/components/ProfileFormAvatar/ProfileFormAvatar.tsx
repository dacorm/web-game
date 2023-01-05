import React, { MouseEventHandler, useState } from 'react';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import styles from './ProfileFormAvatar.module.css';
import Button from '../../shared/ui/Button';
import { useDispatch } from 'react-redux';

import { useActions } from '../../hooks/useActions';

export function ProfileFormAvatar() {
    const [file, setFile] = useState<File | null>(null);
    const choosedFiles = file ? `Выбран файл - ${file}` : '';

    const {setUserAvatarThunk}=useActions()
    const dispatch = useDispatch()
    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            if (target.files[0]) {
                setFile(target.files[0]);
            }
        }
    };

    const btnClickHandler =(e:MouseEventHandler<HTMLButtonElement>)=>{
         e.preventDefault()
         if(file){
            setUserAvatarThunk(file)
         }
         
    }

    return (
        <form className={styles.profileForm}>
            <label className={styles.label} htmlFor="avatar">
                Выберите фото
                <input
                    className={styles.fileInput}
                    type="file"
                    name="avatar"
                    onChange={changeHandler}
                />
            </label>
            <input
                    
                    type="file"
                    name="avatar"
                    onChange={changeHandler}
                />
            {choosedFiles && <p className={styles.choosedFiles}>{choosedFiles}</p>}
            {choosedFiles && (
                <Button
                    theme={ButtonTheme.GREEN}
                    size={ButtonSize.M}
                    type="submit"
                    className={styles.button}
                    onClick={btnClickHandler}
                >
                    Загрузить
                </Button>
            )}
        </form>
    );
}
