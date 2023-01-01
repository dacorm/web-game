import styles from './Modal.module.css';

interface ModalProps{
  children:React.ReactNode,
  title: string,
  onClose:()=>void
}

export function Modal({ children, title, onClose }:ModalProps) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalClose} onClick={onClose}>&#10006;</div>
            <h1 className={styles.modalTitle}>
                {title}
                {' '}
            </h1>
            {children}
        </div>
    );
}
