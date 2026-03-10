const cacheName="quran-cache-v1"

const filesToCache=[
"/",
"/index.html",
"/style.css",
"/app.js",
"/parah-01.pdf"
]

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(cacheName).then(cache=>{
return cache.addAll(filesToCache)
})
)
})

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(r=>{
return r || fetch(e.request)
})
)
})