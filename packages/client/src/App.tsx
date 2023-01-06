import React, { StrictMode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RouterLayout from './layout/RouterLayout/RouterLayout';

import './globalStyles/reset.css';
import './globalStyles/constants.css';
import './globalStyles/global-styles.css';
import { Dispatcher } from './redux/store';
import { getUserInfo } from './redux/actionCreators/user';
import { getIsLoggedInFlag } from './redux/userReducer/userSelectors';

function App() {
    const isLoggedIn = useSelector(getIsLoggedInFlag);
    const dispatch = useDispatch<Dispatcher>();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [isLoggedIn]);

    return (
        <StrictMode>
            <BrowserRouter>
                <RouterLayout />
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;
