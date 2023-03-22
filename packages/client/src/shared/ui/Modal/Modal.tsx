import React, { useCallback, FC } from 'react';
import cn from 'classnames';
import styles from './Modal.module.css';
import { ModalProps } from './Modal.types';

export const Modal: FC<ModalProps> = ({
    children,
    title,
    onClose,
    isShow = false,
}) => {
    const stopPropagation = useCallback((e: React.MouseEvent): void => {
        e.stopPropagation();
    }, []);

    return (
        <div
            className={cn(styles.modal, {
                [styles.modalShow]: isShow,
            })}
            onClick={onClose}
        >
            <div className={styles.modalContent} onClick={stopPropagation}>
                <div className={styles.title}>
                    <h3 className={styles.titleText}>
                        {' '}
                        {title}
                        {' '}
                    </h3>
                    { onClose && (
                        <div className={styles.titleClose} onClick={onClose}>
                            &#10006;
                        </div>
                    )}
                </div>
                <div className={styles.formWrapper}>{children}</div>
            </div>
        </div>
    );
};
