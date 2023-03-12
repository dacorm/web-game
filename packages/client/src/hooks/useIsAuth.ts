import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIsLoggedInFlag } from '../redux/reducers/userReducer/userSelectors';
import { Dispatcher } from '../redux/store';
import { getUserInfo } from '../redux/actionCreators/user';

export function useIsAuth() {
    console.log('useIsAuth fired');
    const isLoggedIn = useSelector(getIsLoggedInFlag);

    const dispatch = useDispatch<Dispatcher>();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [isLoggedIn]);

    return isLoggedIn;
}
