import './globalStyles/reset.css'

import { Route, Routes } from 'react-router-dom'
import GameSearch from './pages/GameSearch/GameSearch'
import Forum from './pages/Forum/Forum'

import { Profile } from './pages/Profile/Profile'
import { ROUTES } from './constants'
import MenuLayout from './layout/MenuLayout'
import React, { Suspense } from 'react'

const LeaderBoardPage = React.lazy(() => import('./pages/LeaderBoard'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuLayout />}>
          <Route path={ROUTES.MAIN} element={<GameSearch />} />
          <Route path={ROUTES.FORUM} element={<Forum />} />
          <Route path={ROUTES.LEADER} element={<Suspense fallback={<div>Loading...</div>}>
            <LeaderBoardPage />
          </Suspense>} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
        <Route path={ROUTES.AUTH} element={<Suspense fallback={<div>Loading...</div>}>
          <AuthPage />
        </Suspense>} />
        <Route path={ROUTES.REGISTER} element={<Suspense fallback={<div>Loading...</div>}>
          <RegisterPage />
        </Suspense>} />
      </Routes>
    </>
  )
}

export default App
