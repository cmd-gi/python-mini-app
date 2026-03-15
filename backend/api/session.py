from fastapi import APIRouter, BackgroundTasks, Form
import uuid
import time
from datetime import datetime, timedelta
try:
    from ..services.firebase_service import get_bucket, get_db
except ImportError:
    from services.firebase_service import get_bucket, get_db

router = APIRouter(prefix="/session", tags=["session"])

@router.post("/create")
async def create_session():
    session_id = str(uuid.uuid4())
    return {"session_id": session_id}

@router.get("/history/{identifier}")
async def get_history(identifier: str):
    db = get_db()
    if not db:
        return {"history": []}

    # identifier could be session_id or user_id
    history_ref = db.collection("history").where("identifier", "==", identifier).order_by("timestamp", direction="DESCENDING").limit(20)
    docs = history_ref.stream()

    history = []
    for doc in docs:
        history.append(doc.to_dict())

    return {"history": history}

@router.post("/cleanup")
async def cleanup_guest_files(background_tasks: BackgroundTasks):
    background_tasks.add_task(perform_cleanup)
    return {"message": "Cleanup task scheduled"}

def perform_cleanup():
    bucket = get_bucket()
    if not bucket:
        return

    blobs = bucket.list_blobs(prefix="guest/")
    now = datetime.now()
    cutoff = now - timedelta(hours=24)

    for blob in blobs:
        if blob.updated < cutoff:
            blob.delete()
            print(f"Deleted expired guest file: {blob.name}")

def log_to_history(identifier: str, tool: str, filename: str, url: str, size: int):
    db = get_db()
    if not db:
        return

    db.collection("history").add({
        "identifier": identifier,
        "tool": tool,
        "filename": filename,
        "url": url,
        "size": size,
        "timestamp": datetime.now()
    })

def upload_to_storage(content: bytes, filename: str, identifier: str, is_guest: bool = True):
    bucket = get_bucket()
    if not bucket:
        return None

    prefix = "guest" if is_guest else "users"
    blob_path = f"{prefix}/{identifier}/{int(time.time())}_{filename}"
    blob = bucket.blob(blob_path)
    blob.upload_from_string(content)
    blob.make_public()
    return blob.public_url
