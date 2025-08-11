import os
import subprocess
import time
import threading
from flask import Flask, redirect

# Global variable to track Next.js process
nextjs_process = None

def start_nextjs_process():
    """Start Next.js on port 3000 in background"""
    global nextjs_process
    try:
        os.chdir("/home/runner/workspace")
        
        # Kill any existing Next.js process on port 3000
        subprocess.run(["pkill", "-f", "next"], capture_output=True)
        time.sleep(2)
        
        # Start Next.js on port 3000
        env = os.environ.copy()
        nextjs_process = subprocess.Popen(
            ["npx", "next", "dev", "--port", "3000", "--hostname", "0.0.0.0"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env
        )
        print("Next.js started on port 3000")
        return True
    except Exception as e:
        print(f"Error starting Next.js: {e}")
        return False

# Create Flask app for gunicorn compatibility on port 5000
app = Flask(__name__)

@app.route('/')
def index():
    """Main route that serves the Next.js app"""
    global nextjs_process
    
    # Check if Next.js is running
    if nextjs_process is None or nextjs_process.poll() is not None:
        # Start Next.js in background thread
        thread = threading.Thread(target=start_nextjs_process)
        thread.daemon = True
        thread.start()
        time.sleep(3)  # Give it a moment to start
    
    # Check if Next.js is responding
    try:
        result = subprocess.run(["curl", "-s", "-f", "http://localhost:3000"], 
                              capture_output=True, timeout=2)
        if result.returncode == 0:
            return redirect("http://localhost:3000", code=307)
    except:
        pass
    
    # Show loading page if Next.js isn't ready yet
    return '''
    <html>
    <head>
        <title>Transport ERP System</title>
        <meta http-equiv="refresh" content="5">
        <style>
            body { background: #1a1a1a; color: white; font-family: Arial; text-align: center; padding: 50px; }
            .loading { animation: pulse 2s infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        </style>
    </head>
    <body>
        <h1>Transport ERP System</h1>
        <div class="loading">
            <p>🚀 Starting Next.js application...</p>
            <p>This may take a few moments</p>
        </div>
        <p><a href="http://localhost:3000" style="color: #60a5fa;">Try accessing directly on port 3000</a></p>
    </body>
    </html>
    '''

@app.route('/health')
def health():
    """Health check endpoint"""
    return {"status": "ok", "service": "Transport ERP System", "nextjs_running": nextjs_process is not None}

# Start Next.js immediately when module loads
start_nextjs_process()