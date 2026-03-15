# Creator Toolkit

A professional, modern full-stack web application providing multiple creator utilities in one place.

## Features

- **Background Remover**: Remove image backgrounds instantly using AI.
- **YouTube Downloader**: Save videos from YouTube in various resolutions.
- **Instagram Downloader**: Download Reels and posts with ease.
- **AI Caption Generator**: Generate creative captions and viral hashtags.
- **Image to Text (OCR)**: Extract editable text from images.
- **Image Compressor**: Optimize images for web without quality loss.
- **Video to MP3**: Extract high-quality audio from video files.
- **Guest Sessions**: Use tools immediately without an account.
- **History**: Track and redownload your processed files.
- **Dark Mode**: Fully responsive UI with modern dark mode support.

## Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Framer Motion, Axios, Lucide Icons.
- **Backend**: Python FastAPI, `rembg`, `yt-dlp`, `EasyOCR`, `Pillow`, `moviepy`, `static-ffmpeg`.
- **Database**: Firebase Firestore (Ready for integration).
- **Storage**: Firebase Storage (Ready for integration).

## Installation

### Prerequisites

- Python 3.12+
- Node.js 18+
- FFmpeg (Handled automatically by `static-ffmpeg`)

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

- `POST /tools/remove-background`: Removes background from an uploaded image.
- `POST /tools/compress-image`: Compresses an image with adjustable quality.
- `POST /tools/ocr`: Extracts text from an image.
- `POST /tools/caption-generator`: Generates AI captions and hashtags.
- `POST /download/youtube`: Fetches download links for YouTube videos.
- `POST /download/instagram`: Fetches download links for Instagram reels.
- `POST /download/video-to-mp3`: Converts an uploaded video to MP3.

## Session Management

- Guest users have their data stored temporarily.
- A background task cleans up expired guest files every 24 hours.
- Users can log in via Firebase for persistent history.
