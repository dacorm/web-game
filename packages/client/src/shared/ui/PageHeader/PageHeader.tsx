import React from 'react';
import Button from '../Button';
import { ButtonSize, ButtonTheme } from '../Button/Button.types';
import style from './PageHeader.module.css';
import { PageHeaderProps } from './PageHeader.types';

const PageHeader: React.FC<PageHeaderProps> = ({ btn, btnName, pageName }) => (
    <div className={style.header}>
        <div className={style['header-title']}>{pageName}</div>
        <div className={style['header-btn']}>
            {btn
          && (
              <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
                  {btnName}
              </Button>
          )}
        </div>
    </div>
);

export default PageHeader;
