#!/usr/bin/env python3
"""
Transport ERP System - Next.js Launcher
This script provides backward compatibility by launching Next.js
while maintaining the existing Replit workflow structure.
"""

import os
import subprocess
import sys
import time

def start_nextjs():
    """Start Next.js development server"""
    try:
        print("🚀 Starting Transport ERP System (Next.js)...")
        
        # Change to project directory
        os.chdir("/home/runner/workspace")
        
        # Kill any existing processes on ports 3000 and 5000
        subprocess.run(["pkill", "-f", "next"], capture_output=True)
        subprocess.run(["pkill", "-f", "3000"], capture_output=True)
        subprocess.run(["pkill", "-f", "5000"], capture_output=True)
        time.sleep(2)
        
        # Set environment variables
        env = os.environ.copy()
        env.update({
            'NODE_ENV': 'development',
            'PORT': '5000',
            'HOSTNAME': '0.0.0.0'
        })
        
        # Start Next.js on port 5000 to maintain compatibility with Replit
        print("📦 Installing dependencies...")
        subprocess.run(["npm", "install"], check=True, env=env)
        
        print("🌐 Starting Next.js server on port 5000...")
        result = subprocess.run([
            "npx", "next", "dev", 
            "--port", "5000", 
            "--hostname", "0.0.0.0"
        ], env=env)
        
        return result.returncode
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during setup: {e}")
        return 1
    except KeyboardInterrupt:
        print("\n🛑 Shutting down Transport ERP System...")
        return 0
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return 1

if __name__ == "__main__":
    exit_code = start_nextjs()
    sys.exit(exit_code)