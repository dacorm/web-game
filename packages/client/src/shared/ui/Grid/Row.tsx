import React, { ReactNode } from 'react';
import { createProps, getClass } from './helpers';
import { ViewportSizeType } from './Grid.types';

const rowKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between'];

type PropTypes = {
    start: ViewportSizeType,
    center: ViewportSizeType,
    end: ViewportSizeType,
    top: ViewportSizeType,
    middle: ViewportSizeType,
    bottom: ViewportSizeType,
    around: ViewportSizeType,
    between: ViewportSizeType,
    className: string,
    children: ReactNode,
}

function getRowClassNames(props: Partial<PropTypes>) {
    const modification = [props.className, getClass('row')];

    for (let i = 0; i < rowKeys.length; ++i) {
        const key = rowKeys[i];
        const value = props[key as keyof PropTypes];
        if (value) {
            modification.push(getClass(`${key}-${value}`));
        }
    }

    return modification;
}

export default function Row(props: Partial<PropTypes>) {
    return React.createElement('div', createProps(props, getRowClassNames(props)));
}
