import React, { StrictMode } from 'react';

import RouterLayout from './layout/RouterLayout/RouterLayout';

import './globalStyles/reset.css';
import './globalStyles/constants.css';
import './globalStyles/global-styles.css';
import { useIsAuth } from './hooks/useIsAuth';
import { useTheme } from './hooks/useTheme';

function App() {
    const isAuth = useIsAuth();
    const { theme } = useTheme();

    return (
        <StrictMode>
            <div className={theme}>
                <RouterLayout />
            </div>
        </StrictMode>
    );
}

export default App;
