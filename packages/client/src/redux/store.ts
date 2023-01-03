import {
    AnyAction, applyMiddleware, combineReducers, createStore,
} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { userReducer } from './userReducer/userReducer';

const reducers = combineReducers({
    user: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type ActionType = {
  type: string;
  payload?: any;
}

export type appDispatch = typeof store.dispatch;
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type Dispatcher = ThunkDispatch<AppStateType, undefined, AnyAction>;

// Для дебага чтобы из консоли можно было получить store.getState() например, знаю что есть девтлузы, но иногда удобно :)
window.store = store;

export default store;
