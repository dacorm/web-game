import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import { startServiceWorker } from './sw/sw';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>,
);

if (process.env.NODE_ENV === 'production') {
    startServiceWorker();
}
