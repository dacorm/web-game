import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';
import MenuLayout from '../MenuLayout';
import GameSearch from '../../pages/GameSearch';
import { ROUTES } from './RouterConst';
import GameLayout from '../GameLayout';
import LandingLayout from '../LandingLayout';

const LeaderBoardPage = routerSuspense(
    lazy(() => import('../../pages/LeaderBoard')),
);
const ForumPage = routerSuspense(lazy(() => import('../../pages/Forum')));
const ForumThemePage = routerSuspense(
    lazy(() => import('../../pages/ForumTheme')),
);
const ProfilePage = routerSuspense(lazy(() => import('../../pages/Profile')));
const GamePage = routerSuspense(lazy(() => import('../../pages/Game/Game')));
const RegisterPage = routerSuspense(
    lazy(() => import('../../pages/RegisterPage')),
);
const LoginPage = routerSuspense(lazy(() => import('../../pages/AuthPage')));
const LandingPage = routerSuspense(lazy(() => import('../../pages/Landing')));
const NotFoundPage = routerSuspense(lazy(() => import('../../pages/NotFoundPage')));

const RouterLayout = () => (
    <Routes>
        <Route path={ROUTES.MAIN} element={<LandingLayout />}>
            <Route index element={LandingPage} />
            <Route path={ROUTES.LANDING} element={LandingPage} />
        </Route>
        <Route path={ROUTES.MAIN} element={<MenuLayout />}>
            <Route path={ROUTES.GAME_SEARCH} element={<GameSearch />} />
            <Route path={ROUTES.FORUM} element={ForumPage} />
            <Route path={ROUTES.FORUM_THEME} element={ForumThemePage} />
            <Route path={ROUTES.LEADER} element={LeaderBoardPage} />
            <Route path={ROUTES.PROFILE} element={ProfilePage} />
        </Route>
        <Route path={ROUTES.MAIN} element={<GameLayout />}>
            <Route path={ROUTES.GAME} element={GamePage} />
            <Route path={ROUTES.GAMEID} element={GamePage} />
        </Route>
        <Route path={ROUTES.REGISTER} element={RegisterPage} />
        <Route path={ROUTES.AUTH} element={LoginPage} />
        <Route path="*" element={NotFoundPage} />
    </Routes>
);

export default RouterLayout;
