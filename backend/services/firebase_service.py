import firebase_admin
from firebase_admin import credentials, firestore, storage
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
# In a real app, you'd use a service account key file or environment variables
cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT")
if cred_path and os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET")
    })
else:
    # Fallback for development/testing if no creds are provided
    # This will fail on actual operations but allows the app to start
    try:
        firebase_admin.initialize_app(options={
            'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET", "creator-toolkit-placeholder.appspot.com")
        })
    except Exception:
        pass

try:
    db = firestore.client()
except Exception:
    db = None

try:
    bucket = storage.bucket()
except Exception:
    bucket = None

def get_db():
    return db

def get_bucket():
    return bucket
