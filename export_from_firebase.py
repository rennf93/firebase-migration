import firebase_admin
from firebase_admin import credentials, firestore, storage
import json
import os


# Initialize Firebase
cred = credentials.Certificate("<your-service-account-key>.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': '<your-buket-name>'
})


db = firestore.client()
bucket = storage.bucket()


# Export Firestore Collections
collections = db.collections()
for collection in collections:
    docs = collection.stream()
    data = [{**doc.to_dict(), "id": doc.id} for doc in docs]
    os.makedirs(f'collections', exist_ok=True)
    with open(f'collections/{collection.id}.json', 'w') as file:
        json.dump(data, file, indent=2)


# Export Files from Firebase Storage
blobs = bucket.list_blobs()
for blob in blobs:
    directory = os.path.dirname(f'bucket/{blob.name}')
    if not os.path.exists(directory):
        os.makedirs(directory)
    blob.download_to_filename(f'bucket/{blob.name}')
    print(f'Downloaded {blob.name} to bucket/{blob.name}')
