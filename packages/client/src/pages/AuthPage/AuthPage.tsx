import React from 'react';
import styles from './AuthPage.module.css';
import Form from '../../components/Form';

export const AuthPage = () => (
    <div className={styles.container}>
        <Form isAuth />
    </div>
);
