import {
    AnyAction, applyMiddleware, combineReducers, createStore,
} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { userReducer } from './reducers/userReducer/userReducer';
import { gameReducer } from './reducers/gameReducer/gameReducer';
import { createGameReducer } from './reducers/createGameReducer/createGameReducer';
import { leaderboardReducer } from './reducers/leaderboardReducer/leaderboardReducer';

const createNoopStorage = () => ({
    getItem(_key:any) {
        return Promise.resolve(null);
    },
    setItem(_key:any, value:any) {
        return Promise.resolve(value);
    },
    removeItem(_key:any) {
        return Promise.resolve();
    },
});

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');

export type TInitialStateStore = Record<string, unknown> | undefined

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['game'],
};

const reducers = combineReducers({
    user: userReducer,
    game: gameReducer,
    games: createGameReducer,
    leaderboard: leaderboardReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined;

export const configureStore = (preloadedState:TInitialStateStore) => (
    createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export const persistor = persistStore(store);

export type ActionType = {
type: string;
payload?: any;
}

export type appDispatch = typeof store.dispatch;
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type Dispatcher = ThunkDispatch<AppStateType, undefined, AnyAction>;

export default store;
