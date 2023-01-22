import { FC } from 'react';
import { OnlyChildren } from '../../../types/global.types';

import style from './LandingStub.module.css';

const LandingStub: FC<OnlyChildren> = ({ children }) => <section className={style.section}>{children}</section>;

export default LandingStub;
