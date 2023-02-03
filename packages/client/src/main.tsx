import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from './redux/store';
import { startServiceWorker } from './sw/sw';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);

if (process.env.NODE_ENV === 'production') {
    startServiceWorker();
}
