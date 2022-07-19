importScripts('ngsw-worker.js');
importScripts('firebase-messaging-sw.js');
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js")

self.addEventListener('sync', (event) => {
    if (event.tag === 'submit') {
        event.waitUntil(bgSyncSubmit());
    }
})

async function bgSyncSubmit() {
    const app = initializeApp({
        projectId: 'tforms-1ea7c',
        appId: '1:909944738530:web:9d73861130aec3a81d04bb',
        storageBucket: 'tforms-1ea7c.appspot.com',
        locationId: 'asia-southeast1',
        apiKey: 'AIzaSyD6vGxi2yj6HB2FyPpJmlsuMSX9PvjfAnA',
        authDomain: 'tforms-1ea7c.firebaseapp.com',
        messagingSenderId: '909944738530',
        measurementId: 'G-04Q2BDLQ9L',
    });
    
    const db = getFirestore(app);
    const formQuestions = db.collection('form-answers');

    let fa = localStorage.getItem('form-bgsync');
    if (fa) {
        let fs = JSON.parse(fa);
        const res = await formQuestions.add(fs);
    }
}