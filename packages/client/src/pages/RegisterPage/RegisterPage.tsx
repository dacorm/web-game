import React from 'react';
import styles from '../AuthPage/AuthPage.module.css';
import Form from '../../components/Form';

export const RegisterPage = () => (
    <div className={styles.container}>
        <Form isAuth={false} />
    </div>
);
