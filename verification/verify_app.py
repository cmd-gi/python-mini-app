from playwright.sync_api import Page, expect, sync_playwright
import os
import subprocess
import time
import signal

def verify_app(page: Page):
    # Start the backend and frontend
    backend_proc = subprocess.Popen(["python3", "backend/main.py"], cwd=".")
    frontend_proc = subprocess.Popen(["npm", "run", "dev"], cwd="frontend")

    time.sleep(5) # Wait for servers to start

    try:
        # Navigate to landing page
        page.goto("http://localhost:5173") # Vite default port
        page.wait_for_timeout(1000)

        # Verify Hero Section
        expect(page.get_by_text("All Creator Tools in One Powerful Place")).to_be_visible()
        page.screenshot(path="/home/jules/verification/landing_page.png")
        page.wait_for_timeout(500)

        # Click "Start Using Tools"
        page.get_by_role("link", name="Start Using Tools").click()
        page.wait_for_timeout(1000)

        # Verify Dashboard
        expect(page.get_by_text("Welcome back!")).to_be_visible()
        page.screenshot(path="/home/jules/verification/dashboard.png")
        page.wait_for_timeout(500)

        # Click a tool (e.g. Image Compressor)
        page.get_by_text("Image Compressor").first.click()
        page.wait_for_timeout(1000)

        # Verify Tool Page
        expect(page.get_by_text("Optimize your images")).to_be_visible()
        page.screenshot(path="/home/jules/verification/tool_page.png")
        page.wait_for_timeout(1000)

        # Final state
        page.screenshot(path="/home/jules/verification/verification.png")

    finally:
        # Cleanup processes
        os.kill(backend_proc.pid, signal.SIGTERM)
        os.kill(frontend_proc.pid, signal.SIGTERM)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="/home/jules/verification/video")
        page = context.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            context.close()
            browser.close()
