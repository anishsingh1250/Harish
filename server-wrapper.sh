#!/bin/bash

# Kill any existing Next.js processes
pkill -f "next dev" || true
sleep 2

# Start the Next.js server
cd /home/runner/workspace
nohup npx next dev --port 5000 --hostname 0.0.0.0 > server.log 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > /tmp/nextjs.pid

# Wait for server to be ready
echo "🚀 Starting Next.js development server..."
sleep 8

# Test if server is responding
for i in {1..10}; do
    if curl -s -o /dev/null http://localhost:5000/login; then
        echo "✅ Server is ready on port 5000"
        exit 0
    fi
    echo "⏳ Waiting for server... (attempt $i/10)"
    sleep 2
done

echo "❌ Server failed to start properly"
exit 1