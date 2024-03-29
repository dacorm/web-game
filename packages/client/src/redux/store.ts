import {
    AnyAction, applyMiddleware, combineReducers, createStore,
} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useDispatch } from 'react-redux';
import { userReducer } from './reducers/userReducer/userReducer';
import { gameReducer } from './reducers/gameReducer/gameReducer';
import { createGameReducer } from './reducers/createGameReducer/createGameReducer';
import { leaderboardReducer } from './reducers/leaderboardReducer/leaderboardReducer';
import { forumReducer } from './reducers/forumReducer/forumReducer';

export type TInitialStateStore = Record<string, unknown> | undefined

const reducers = combineReducers({
    user: userReducer,
    game: gameReducer,
    games: createGameReducer,
    leaderboard: leaderboardReducer,
    forum: forumReducer,
});

const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined;

export const configureStore = (preloadedState: TInitialStateStore) => createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export type ActionType = {
type: string;
payload?: any;
}

export type appDispatch = typeof store.dispatch;
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>
export const useAppDispatch = () => useDispatch<appDispatch>();

export type Dispatcher = ThunkDispatch<AppStateType, undefined, AnyAction>;

export default store;
