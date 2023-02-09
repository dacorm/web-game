import { ReactNode } from 'react';

export type TInfoBtn = {
    text: string | ReactNode
    onClick: (...args: any) => any
}

export interface ActionContentProps {
    text: string
    acceptInfoBtn: TInfoBtn
    cancelInfoBtn?: TInfoBtn
}
