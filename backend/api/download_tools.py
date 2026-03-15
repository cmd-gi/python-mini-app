from fastapi import APIRouter, HTTPException, Form, UploadFile, File, Header
import yt_dlp
import os
import uuid
import io
import base64
from moviepy.editor import VideoFileClip
try:
    from .session import upload_to_storage, log_to_history
except ImportError:
    from session import upload_to_storage, log_to_history

router = APIRouter(prefix="/download", tags=["download"])

DOWNLOAD_DIR = "temp_downloads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

@router.post("/youtube")
async def youtube_download(url: str = Form(...)):
    try:
        ydl_opts = {
            'format': 'best',
            'outtmpl': f'{DOWNLOAD_DIR}/%(id)s.%(ext)s',
            'noplaylist': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            video_id = info.get('id', str(uuid.uuid4()))
            title = info.get('title', 'Unknown Title')
            duration = info.get('duration', 0)
            thumbnail = info.get('thumbnail', '')

            # For simplicity in this demo, we return the info.
            # In a real app, we would download and provide a signed URL from Firebase Storage.
            # Here we provide the direct download link if available or a mock success.

            formats = []
            for f in info.get('formats', []):
                if f.get('ext') == 'mp4' and f.get('vcodec') != 'none':
                    formats.append({
                        "format_id": f.get('format_id'),
                        "resolution": f.get('resolution'),
                        "url": f.get('url'),
                        "ext": f.get('ext')
                    })

            return {
                "id": video_id,
                "title": title,
                "duration": duration,
                "thumbnail": thumbnail,
                "formats": formats[:5] # Return top 5 formats
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/instagram")
async def instagram_download(url: str = Form(...)):
    try:
        # Instagram often requires cookies/auth for reliable extraction with yt-dlp
        # For this toolkit, we'll use a generic extraction attempt
        ydl_opts = {
            'format': 'best',
            'outtmpl': f'{DOWNLOAD_DIR}/%(id)s.%(ext)s',
            'noplaylist': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

            return {
                "id": info.get('id'),
                "title": info.get('title', 'Instagram Media'),
                "thumbnail": info.get('thumbnail'),
                "url": info.get('url'),
                "ext": info.get('ext')
            }
    except Exception as e:
        # Mocking response for demo if extraction fails due to Instagram restrictions
        if "login" in str(e).lower():
            return {
                "id": "mock_id",
                "title": "Instagram Reel (Mock Preview)",
                "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
                "url": "#",
                "ext": "mp4",
                "message": "Direct extraction limited by Instagram. Using mock for demo."
            }
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/video-to-mp3")
async def video_to_mp3(
    file: UploadFile = File(...),
    session_id: str = Header(None),
    user_id: str = Header(None)
):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")

    temp_video_path = f"{DOWNLOAD_DIR}/{uuid.uuid4()}_{file.filename}"
    temp_audio_path = temp_video_path.replace(file.filename.split('.')[-1], "mp3")

    try:
        content = await file.read()
        with open(temp_video_path, "wb") as f:
            f.write(content)

        video = VideoFileClip(temp_video_path)
        video.audio.write_audiofile(temp_audio_path)

        with open(temp_audio_path, "rb") as f:
            audio_content = f.read()

        img_str = base64.b64encode(audio_content).decode()

        identifier = user_id or session_id
        if identifier:
            public_url = upload_to_storage(audio_content, f"{file.filename.split('.')[0]}.mp3", identifier, is_guest=not user_id)
            if public_url:
                log_to_history(identifier, "Video to MP3", f"{file.filename.split('.')[0]}.mp3", public_url, len(audio_content))

        # Cleanup
        video.close()
        if os.path.exists(temp_video_path): os.remove(temp_video_path)
        if os.path.exists(temp_audio_path): os.remove(temp_audio_path)

        return {
            "result": f"data:audio/mp3;base64,{img_str}",
            "filename": f"{file.filename.split('.')[0]}.mp3"
        }
    except Exception as e:
        if os.path.exists(temp_video_path): os.remove(temp_video_path)
        if os.path.exists(temp_audio_path): os.remove(temp_audio_path)
        raise HTTPException(status_code=500, detail=str(e))
