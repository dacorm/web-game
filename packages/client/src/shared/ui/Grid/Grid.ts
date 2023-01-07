import React, { ReactNode } from 'react';
import { createProps, getClass } from './helpers';

type PropTypes = {
    className: string,
    children: ReactNode,
};

export default function Grid(props: Partial<PropTypes>) {
    const { className } = props;
    const containerClass = getClass('container');
    const classNames = [className, containerClass];

    return React.createElement('div', createProps(props, classNames));
}
