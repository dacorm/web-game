import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store, { persistor } from './redux/store';

// import { startServiceWorker } from './sw/sw';

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById('root') as HTMLElement;

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

persistor.subscribe(() => {
    /* Hydrate React components when persistor has synced with redux store */
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
        if (rootElement.innerHTML === '<!--ssr-outlet-->') {
            ReactDOM.createRoot(rootElement).render(app);
        } else {
            ReactDOM.hydrateRoot(rootElement, app);
        }
    }
});

// if (process.env.NODE_ENV === 'production') {
//     startServiceWorker();
// }
