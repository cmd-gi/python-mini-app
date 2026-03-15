from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from .utils.security import FileSizeLimitMiddleware
except ImportError:
    from utils.security import FileSizeLimitMiddleware
import static_ffmpeg
static_ffmpeg.add_paths()
try:
    from .api.image_tools import router as image_router
    from .api.download_tools import router as download_router
    from .api.session import router as session_router
except ImportError:
    from api.image_tools import router as image_router
    from api.download_tools import router as download_router
    from api.session import router as session_router

app = FastAPI(title="Creator Toolkit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(FileSizeLimitMiddleware, max_file_size=50 * 1024 * 1024) # 50MB

app.include_router(image_router)
app.include_router(download_router)
app.include_router(session_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
