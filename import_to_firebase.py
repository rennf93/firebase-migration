import firebase_admin
from firebase_admin import credentials, firestore
import json
import os


# Initialize Firebase
cred = credentials.Certificate("<your-service-account-key>.json")
firebase_admin.initialize_app(cred)


db = firestore.client()


def import_collection(collection_name):
    with open(f'collections/{collection_name}.json', 'r') as file:
        data = json.load(file)
    for doc in data:
        db.collection(collection_name).document(doc['id']).set(doc)
        print(f"Document {doc['id']} added to collection {collection_name}")


collections = [
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
]


for collection_name in collections:
    import_collection(collection_name)
