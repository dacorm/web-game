import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import GameSearch from './pages/GameSearch/GameSearch'
import Forum from './pages/Forum/Forum'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard'
import { NavBar } from './components/NavBar'
import userLogo from './assets/img/userLogo.png'
import { Profile } from './pages/Profile/Profile'
import {ROUTES} from './constants'


function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <>
      <NavBar userLogo={userLogo} userName='SomeUser' />
      <Routes>
        <Route path={ROUTES.MAIN} element={<GameSearch />} />
        <Route path={ROUTES.FORUM} element={<Forum />} />
        <Route path={ROUTES.LEADER} element={<LeaderBoard />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
