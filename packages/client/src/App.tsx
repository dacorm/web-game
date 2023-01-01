import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterLayout from './layout/RouterLayout/RouterLayout';

import './globalStyles/reset.css';
import './globalStyles/constats.css';
import './globalStyles/global-styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <RouterLayout />
                </Provider>
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;
