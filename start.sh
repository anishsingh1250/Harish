#!/bin/bash
echo "🚀 Starting Transport ERP Next.js Application..."
cd /home/runner/workspace

# Kill any existing Next.js processes
pkill -f next || true
sleep 2

# Set environment variables
export NODE_ENV=development
export NEXT_PUBLIC_APP_ENV=development

# Start Next.js development server
echo "📦 Starting development server..."
npx next dev --port 5000 --hostname 0.0.0.0