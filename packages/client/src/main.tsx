import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import ThemeProvider from './Providers/ThemeProvider';

// import { startServiceWorker } from './sw/sw';

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById('root') as HTMLElement;

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
    ReactDOM.createRoot(rootElement).render(app);
} else {
    ReactDOM.hydrateRoot(rootElement, app);
}
// if (process.env.NODE_ENV === 'production') {
//     startServiceWorker();
// }
