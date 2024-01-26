var admin = require("firebase-admin");
var fs = require('fs');
const path = require('path');
var serviceAccount = require("./<your-service-account-key>.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();
const bucket = admin.storage().bucket("gs://<your-buket-name>");


db.listCollections().then(collections => {
    collections.forEach(collection => {
        collection.get().then(docs => {
            const data = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            fs.writeFileSync(`collections/${collection.id}.json`, JSON.stringify(data, null, 2));
        });
    });
});


bucket.getFiles().then((files) => {
    if (files[0].length === 0) {
        console.log('No files to download.');
        return;
    }

    files[0].forEach((file) => {
        const destinationPath = `bucket/${file.name}`;
        const directory = path.dirname(destinationPath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        file.download({ destination: destinationPath })
            .then(() => console.log(`Downloaded ${file.name} to ${destinationPath}`))
            .catch((error) => console.error(`Error downloading ${file.name}:`, error));
    });
}).catch((error) => console.error('Error getting files:', error));
