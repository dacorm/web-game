import React, { ReactNode } from 'react';
import { createProps, getClass } from './helpers';
import { ColumnSizeType } from './Grid.types';

type PropTypes = {
    xs: ColumnSizeType,
    sm: ColumnSizeType,
    md: ColumnSizeType,
    lg: ColumnSizeType,
    xl: ColumnSizeType,
    className: string,
    children: ReactNode,
};

const classMap = {
    xs: 'col-xs', sm: 'col-sm', md: 'col-md', lg: 'col-lg', xl: 'col-xl',
};

type ClassMap = keyof typeof classMap

function isInteger(value: string | number) {
    return typeof value === 'number' && Number.isFinite(value) && Math.floor(value) === value;
}

function getColClassNames(props: Partial<PropTypes>) {
    const extraClasses = [];

    if (props.className) {
        extraClasses.push(props.className);
    }

    return Object.keys(props)
        .filter((key) => classMap[key as ClassMap])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        .map((key) => getClass(isInteger(props[key])
            ? (`${classMap[key as ClassMap]}-${props[key as keyof PropTypes]}`)
            : classMap[key as ClassMap]))
        .concat(extraClasses);
}

export default function Col(props: Partial<PropTypes>) {
    return React.createElement('div', createProps(props, getColClassNames(props)));
}
