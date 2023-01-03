import React, { LazyExoticComponent, Suspense } from 'react';
import { Loading } from '../components/Loading';

export const routerSuspense = (
    Element: LazyExoticComponent<() => JSX.Element>,
) => (
    <Suspense fallback={<Loading />}>
        <Element />
    </Suspense>
);
