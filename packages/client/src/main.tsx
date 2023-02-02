import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import { startServiceWorker } from './sw/sw';

window.addEventListener('load', async () => {
    if (navigator.serviceWorker) {
        try {
            const reg = await navigator.serviceWorker.register('./sw.js');
            // console.log('reg info ', reg);
        } catch (e) {
            console.log('service worker register fail', e);
        }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>,
);

if (process.env.NODE_ENV === 'production') {
    startServiceWorker();
}
