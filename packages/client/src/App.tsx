import React, { StrictMode } from 'react';

import RouterLayout from './layout/RouterLayout/RouterLayout';

import './globalStyles/reset.css';
import './globalStyles/constants.css';
import './globalStyles/global-styles.css';
import { useIsAuth } from './hooks/useIsAuth';

function App() {
    // const isAuth = useIsAuth();

    return (
        <StrictMode>
            <RouterLayout />
        </StrictMode>
    );
}

export default App;
