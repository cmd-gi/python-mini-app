import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_create_session():
    response = client.post("/session/create")
    assert response.status_code == 200
    assert "session_id" in response.json()

def test_remove_background_no_file():
    response = client.post("/tools/remove-background")
    assert response.status_code == 422 # Validation error for missing file

def test_ocr_no_file():
    response = client.post("/tools/ocr")
    assert response.status_code == 422

def test_caption_generator_no_file():
    response = client.post("/tools/caption-generator")
    assert response.status_code == 422

def test_youtube_download_missing_url():
    response = client.post("/download/youtube")
    assert response.status_code == 422
