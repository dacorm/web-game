import {
    AnyAction, applyMiddleware, combineReducers, createStore,
} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer/userReducer';
import { gameReducer } from './reducers/gameReducer/gameReducer';
import { createGame } from './actionCreators/createGame';

const reducers = combineReducers({
    user: userReducer,
    game: gameReducer,
    games: createGame,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type ActionType = {
type: string;
payload?: any;
}

export type appDispatch = typeof store.dispatch;
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type Dispatcher = ThunkDispatch<AppStateType, undefined, AnyAction>;

export default store;
