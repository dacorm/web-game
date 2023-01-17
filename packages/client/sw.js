const staticCasheName = 's-app-v1';
const dynamicCacheName = 'd-app-v1';
const urlsToCache = [
    '/',
    '/forum',
    '/leaderboard',
    '/profile',
    'index.html',
    'offline.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/redux/store.ts',
    'src/layout/RouterLayout/RouterLayout.tsx',
];

async function cacheFirst(req) {
    const cache = await caches.open(staticCasheName);
    // console.log('Staticreq', req);
    const cached = await cache.match(req);
    // if (!cached) {
    //     console.log('Nocached', req);
    // } else {
    //     console.log('cached', cached);
    // }

    return cached ?? await fetch(req);
}

async function networkFirst(req) {
    console.log('network response', req);
    const cache = await caches.open(dynamicCacheName);
    try {
    // выполняем запрос на сервер
        const response = await fetch(req);
        // складываем запросы в cache = кешируем запросы, если метод не PUT
        if (req.method !== 'PUT') {
            await cache.put(req, response.clone());
        }
        return response;
    } catch (e) {
        console.log('NOT INTERNET_____________________________________');
        // если ошибка - нет интернета сервер не доступен и т.д.
        // смотри есть ли в кеше запрос если нет отображаем страничку offline.html
        const cached = await cache.match(req);
        if (!cached) {
            console.log('network Nocached', req);
        } else {
            console.log('network cached', cached);
        }

        return cached ?? caches.match('/offline.html');
    }

    // открываем динамический кеш
}

// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCasheName);
    await cache.addAll(urlsToCache);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.origin === window.location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', async (event) => {
    console.log('activate!!!!!!!!!!!!!!!!!!!!!!!!');
    const cacheNames = await caches.keys();
});
