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

## Deployment Guide

### Backend (FastAPI) - Deploy to Railway
1. **Login to Railway**: Go to [railway.app](https://railway.app).
2. **New Project**: Click "New Project" and select "Deploy from GitHub repo".
3. **Choose Repo**: Select your `creator-toolkit` repository.
4. **Configuration**: Railway will detect the `Dockerfile` in the root.
5. **Environment Variables**: Go to the "Variables" tab and add:
   - `PORT`: `8080`
   - `FIREBASE_STORAGE_BUCKET`: `your-app.appspot.com`
   - `FIREBASE_SERVICE_ACCOUNT`: (Paste the content of your JSON key or upload it)
6. **Deploy**: Railway will build the image and start the server.

> **Note**: This backend requires at least **2GB RAM** to run AI models. Ensure your Railway plan supports this.

### Frontend (React) - Deploy to Firebase Hosting
1. **Install Firebase CLI**: `npm install -g firebase-tools`
2. **Login**: `firebase login`
3. **Init**: Run `firebase init` in the root directory.
   - Select **Hosting**.
   - Select your Firebase project.
   - Public directory: `frontend/dist`
   - Configure as single-page app: **Yes**.
4. **Update API URL**: In `frontend/src/services/api.js`, change `API_BASE_URL` to your Railway URL.
5. **Build**: `cd frontend && npm run build`
6. **Deploy**: `firebase deploy --only hosting`

### Cloud Infrastructure
- **Authentication**: Firebase Auth (Google & Email).
- **Database**: Firebase Firestore.
- **Storage**: Firebase Storage with lifecycle rules to auto-delete guest files.
- **Media Processing**: Handled on the server-side via Python libraries.
