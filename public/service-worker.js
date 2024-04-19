self.addEventListener('install', (eve) => {
    console.log('Event: Service worker installed.')
})

self.addEventListener('activate', (eve) => {
    console.log('Event: Service worker activated.')
})