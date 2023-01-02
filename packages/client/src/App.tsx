import React, { StrictMode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RouterLayout from './layout/RouterLayout/RouterLayout';

import './globalStyles/reset.css';
import './globalStyles/constats.css';
import './globalStyles/global-styles.css';
import { Dispatcher } from './redux/store';
import { getUserInfo } from './redux/userReducer/userReducer';
import { getIsLoggedInFlag } from './redux/userReducer/userSelectors';

function App() {
    const isLoggedIn = useSelector(getIsLoggedInFlag);
    const dispatch = useDispatch<Dispatcher>();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserInfo());
        }
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
