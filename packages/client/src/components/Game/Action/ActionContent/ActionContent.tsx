import cn from 'classnames';
import { FC } from 'react';
import Button from '../../../../shared/ui/Button';
import { ButtonMode, ButtonSize, ButtonTheme } from '../../../../shared/ui/shared/shared.button.types';

import styles from './ActionContent.module.css';
import { ActionContentProps } from './ActionContent.types';

const ActionContent:FC<ActionContentProps> = ({ text, acceptInfoBtn, cancelInfoBtn = null }) => (
    <div className={styles.actionContent}>
        <div className={styles.text}>
            {text}
        </div>
        <div className={styles.buttons}>
            <Button
                className={cn(
                    cancelInfoBtn && styles.accept,
                    styles.button,
                )}
                onClick={acceptInfoBtn.onClick}
                size={ButtonSize.M}
                theme={ButtonTheme.GREEN}
                mode={ButtonMode.FULL_SIZE}
            >
                {acceptInfoBtn.text}
            </Button>
            {cancelInfoBtn && (
                <Button
                    className={cn(
                        styles.cancel,
                        styles.button,
                    )}
                    onClick={cancelInfoBtn.onClick}
                    size={ButtonSize.M}
                    theme={ButtonTheme.RED}
                    mode={ButtonMode.FULL_SIZE}
                >
                    {cancelInfoBtn.text}
                </Button>
            ) }
        </div>
    </div>
);

export default ActionContent;
