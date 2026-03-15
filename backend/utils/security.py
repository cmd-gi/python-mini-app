from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class FileSizeLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_file_size: int):
        super().__init__(app)
        self.max_file_size = max_file_size

    async def dispatch(self, request: Request, call_next):
        if request.method == "POST":
            content_length = request.headers.get("content-length")
            if content_length and int(content_length) > self.max_file_size:
                raise HTTPException(status_code=413, detail="File too large. Maximum size is 50MB.")

        response = await call_next(request)
        return response
