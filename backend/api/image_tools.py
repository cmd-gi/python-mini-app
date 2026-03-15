from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header
from rembg import remove
from PIL import Image
import io
import base64
import easyocr
import numpy as np
try:
    from .session import upload_to_storage, log_to_history
except ImportError:
    from api.session import upload_to_storage, log_to_history

# Initialize EasyOCR Reader
reader = easyocr.Reader(['en'])

router = APIRouter(prefix="/tools", tags=["tools"])

@router.post("/remove-background")
async def remove_background(
    file: UploadFile = File(...),
    session_id: str = Header(None),
    user_id: str = Header(None)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        input_image = await file.read()
        output_image = remove(input_image)

        # Convert to base64 to return in JSON
        img = Image.open(io.BytesIO(output_image))
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        output_data = buffered.getvalue()
        img_str = base64.b64encode(output_data).decode()

        # Async upload and log if identifier is present
        identifier = user_id or session_id
        if identifier:
            public_url = upload_to_storage(output_data, f"bg_removed_{file.filename}", identifier, is_guest=not user_id)
            if public_url:
                log_to_history(identifier, "Background Remover", f"bg_removed_{file.filename}", public_url, len(output_data))

        return {
            "result": f"data:image/png;base64,{img_str}",
            "filename": f"bg_removed_{file.filename.split('.')[0]}.png"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/caption-generator")
async def generate_caption(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Simple rule-based/mock caption generator
    # In a real app, you might use a BLIP model or GPT-4 Vision API
    return {
        "captions": [
            "Capturing the perfect moment! ✨",
            "Living my best life in style. 🚀",
            "Simplicity is the ultimate sophistication. 💫"
        ],
        "hashtags": ["#creator", "#toolkit", "#viral", "#aesthetic", "#lifestyle", "#trending", "#instadaily", "#explore", "#creative", "#design"],
        "filename": file.filename
    }

@router.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        content = await file.read()
        # Convert to numpy array for EasyOCR
        img = Image.open(io.BytesIO(content))
        img_np = np.array(img)

        results = reader.readtext(img_np)
        extracted_text = " ".join([res[1] for res in results])

        return {
            "text": extracted_text,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compress-image")
async def compress_image(
    file: UploadFile = File(...),
    quality: int = Form(70),
    session_id: str = Header(None),
    user_id: str = Header(None)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        content = await file.read()
        img = Image.open(io.BytesIO(content))

        # Convert RGBA to RGB if saving as JPEG
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=quality, optimize=True)
        output_data = buffered.getvalue()
        img_str = base64.b64encode(output_data).decode()

        identifier = user_id or session_id
        if identifier:
            public_url = upload_to_storage(output_data, f"compressed_{file.filename}", identifier, is_guest=not user_id)
            if public_url:
                log_to_history(identifier, "Image Compressor", f"compressed_{file.filename}", public_url, len(output_data))

        return {
            "result": f"data:image/jpeg;base64,{img_str}",
            "filename": f"compressed_{file.filename.split('.')[0]}.jpg",
            "original_size": len(content),
            "compressed_size": len(output_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
