import './globalStyles/reset.css'

import { Route, Routes } from 'react-router-dom'
import GameSearch from './pages/GameSearch/'
import Forum from './pages/Forum/Forum'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'

import { Profile } from './pages/Profile/Profile'
import { ROUTES } from './constants'
import MenuLayout from './layout/MenuLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuLayout />}>
          <Route path={ROUTES.MAIN} element={<GameSearch />} />
          <Route path={ROUTES.FORUM} element={<Forum />} />
          <Route path={ROUTES.LEADER} element={<LeaderBoard />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
