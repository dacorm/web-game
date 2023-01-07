import styles from './Flexboxgrid.module.css';

export function getClass(className: string) {
    return (styles && styles[className]) ? styles[className] : className;
}

export function createProps(props: any, classNames: (string | undefined)[]) {
    const newProps: Record<string, string> = {};

    Object.keys(props)
        .filter((key) => (key === 'children'))
        .forEach((key) => (newProps[key] = props[key]));

    const className = classNames.filter((cn) => cn).join(' ');
    return { ...newProps, className };
}
