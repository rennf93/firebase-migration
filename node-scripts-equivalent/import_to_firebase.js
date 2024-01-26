var admin = require("firebase-admin");
var fs = require('fs');
const path = require('path');
var serviceAccount = require("./<your-service-account-key>.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


var db = admin.firestore();


function importCollection(collectionName) {
    const data = JSON.parse(fs.readFileSync(`collections/${collectionName}.json`, 'utf8'));
    data.forEach(doc => {
        db.collection(collectionName).doc(doc.id).set(doc)
            .then(() => console.log(`Document ${doc.id} added to collection ${collectionName}`))
            .catch((error) => console.error(`Error adding document ${doc.id}:`, error));
    });
}


const collections = [
    'club',
    'divisions-scraping',
    'league',
    'leagues-scraping',
    'match',
    'matchstats',
    'player',
    'roles',
    'scraping-leagues',
    'team',
    'teams-scraping',
    'users'
];


collections.forEach(collectionName => {
    importCollection(collectionName);
});
