import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/App';
import store, { configureStore } from './src/redux/store';

export { configureStore };

export function render(url) {
    console.log('SSR.tsx!!!!!!!!!!!!!!!!!!!!!');
    return renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>,
    );
}
