import { Route, Routes } from 'react-router-dom'
import GameSearch from './pages/GameSearch/GameSearch'
import { ROUTES } from './constants'
import MenuLayout from './layout/MenuLayout'
import { lazy, Suspense } from 'react'
import { Loading } from './components/Loading'

import './globalStyles/constats.css'
import './globalStyles/reset.css'
import './globalStyles/global-styles.css'

const LeaderBoardPage = lazy(() => import('./pages/LeaderBoard'))
const ForumPage = lazy(() => import('./pages/Forum'))
const ForumThemePage = lazy(() => import('./pages/ForumTheme'))
const ProfilePage = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuLayout />}>
          <Route path={ROUTES.MAIN} element={<GameSearch />} />
          <Route
            path={ROUTES.FORUM}
            element={
              <Suspense fallback={<Loading />}>
                <ForumPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.FORUM_THEME}
            element={
              <Suspense fallback={<Loading />}>
                <ForumThemePage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.LEADER}
            element={
              <Suspense fallback={<Loading />}>
                <LeaderBoardPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <Suspense fallback={<Loading />}>
                <ProfilePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
