export function startServiceWorker() {
    window.addEventListener('load', async () => {
        if (navigator.serviceWorker) {
            try {
                const reg = await navigator.serviceWorker.register('./ServiceWorkers.js');
                console.log('reg Success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', reg);
            } catch (e) {
                console.log('service worker register fail', e);
            }
        }
    });
}
