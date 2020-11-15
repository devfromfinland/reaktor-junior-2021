/* eslint-disable no-restricted-globals */
// This Service Worker to cache large PAYLOAD from legacy APIs for faster subsequent visits
// This Service Worker also enable offline use of the web

const cacheName = 'v1'

// Call Install Eveent
self.addEventListener('install', e => {
  console.log('Cached Service Worker: Installed')
})

// Call Activate Eveent
self.addEventListener('activate', e => {
  console.log('Cached Service Worker: Activated')

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: clearing old cache')
            return cache.delete(cache)
          }
          return cache
        })
      )
    })
  )
})

// Call Fetch Eveent
self.addEventListener('fetch', e => {
  console.log('Cached Service Worker: Fetching')

  e.responseWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone()

        // Open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone)
          })
        
        return res
      })
      .catch(err => caches.match(e.request).then(res => res))
  )
})