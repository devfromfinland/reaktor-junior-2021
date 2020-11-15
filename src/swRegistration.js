// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

export const register = () => {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)

    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/swCache.js`)
        .then(reg => console.log('Service Worker (Cache): Registered'))
        .catch(err => console.log(`Service Worker (Cache): Error: ${err}`))
    })
  }
}

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => {
        reg.unregister();
      })
      .catch((err) => {
        console.log(`Service Worker (Cache): Error: ${err}`);
      });
  }
}
