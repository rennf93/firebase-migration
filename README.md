# Galactikos Firebase Scripts

This repository contains two Python scripts for interacting with Firebase in the Galactikos project. The first script is used for importing data into Firestore collections, and the second script is for exporting data from Firestore collections and Firebase Storage.

---

## Requirements

- Python 3.x
- Firebase Admin SDK
- A Firebase project with Firestore and Storage

---

## Setup

1. **Firebase Admin SDK**: You need to install the Firebase Admin SDK. Use the following command to install it:

```bash
    pip install firebase-admin
```


2. **Service Account Key**: You need a Firebase service account key for your project. This can be obtained from the Firebase console. Place the service account key file in the root directory of your project.

---

## Script 1: Import Collections to Firestore


### Description

This script imports data from JSON files into Firestore collections.


### Usage

1. **Prepare JSON files**: Ensure that you have JSON files representing the data you want to import. Place these files in a `collections` directory in the root of your project. Each file should be named after the collection (e.g., `club.json`).

2. **Run the Script**: Execute the script to import data. The script will read each JSON file and import the data into the corresponding Firestore collection.

```bash
    python import_to_firebase.py
```

---

## Script 2: Export Data from Firestore and Firebase Storage

### Description

This script exports data from Firestore collections and Firebase Storage.

### Usage

1. **Run the Script**: When you execute this script, it will export all collections from Firestore to JSON files, creating a `collections` directory in the root of your project. It will also download all files from Firebase Storage into a `bucket` directory.

```bash
    python export_from_firebase.py
```

---


## Notes

- Make sure to update the paths to the service account key files and modify the `<bucker-name>` as per your Firebase project's configuration.
- The scripts should be executed from the root directory of your project where the service account key files are located.
