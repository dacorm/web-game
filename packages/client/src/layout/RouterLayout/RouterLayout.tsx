import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routerSuspense } from '../../hof/routerSuspense'
import MenuLayout from '../MenuLayout'
import GameSearch from '../../pages/GameSearch'
import { ROUTES } from './RouterConst'

const LeaderBoardPage = routerSuspense(
  lazy(() => import('../../pages/LeaderBoard'))
)
const ForumPage = routerSuspense(lazy(() => import('../../pages/Forum')))
const ForumThemePage = routerSuspense(
  lazy(() => import('../../pages/ForumTheme'))
)
const ProfilePage = routerSuspense(lazy(() => import('../../pages/Profile')))
const GamePage = routerSuspense(lazy(() => import('../../pages/Game/Game')))

const RouterLayout = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MenuLayout />}>
        <Route index element={<GameSearch />} />
        <Route path={ROUTES.FORUM} element={ForumPage} />
        <Route path={ROUTES.FORUM_THEME} element={ForumThemePage} />
        <Route path={ROUTES.LEADER} element={LeaderBoardPage} />
        <Route path={ROUTES.PROFILE} element={ProfilePage} />
        <Route path={ROUTES.GAME} element={GamePage} />
      </Route>
    </Routes>
  )
}

export default RouterLayout
