import React, { LazyExoticComponent, Suspense } from 'react'
import { Loading } from '../components/Loading'

export const routerSuspense = (
  Element: LazyExoticComponent<() => JSX.Element>
) => {
  return (
    <Suspense fallback={<Loading />}>
      <Element />
    </Suspense>
  )
}
