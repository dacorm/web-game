import React from 'react';
import styles from './AuthPage.module.css';
import Form from '../../components/Form'

export const AuthPage = () => {
  return (
    <div className={styles.container}>
      <Form isAuth={true} />
    </div>
  )
}