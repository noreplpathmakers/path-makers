#!/bin/bash

# Exit on error
set -e

echo "🚀 Setting up PathMakers..."

# 1. Install Backend Dependencies
echo "📦 Installing Backend dependencies..."
cd backend
npm install
cd ..

# 2. Install Frontend Dependencies
echo "📦 Installing Frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Installation complete!"

# 3. Start Services
echo "🚀 Starting services..."

# Start Backend in background
echo "Starting Backend on port 5000..."
cd backend
# Check if nodemon is available, otherwise use node
if [ -f "./node_modules/.bin/nodemon" ]; then
    ./node_modules/.bin/nodemon server.js &
else
    node server.js &
fi
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "
🎉 Services are running!
Backend PID: $BACKEND_PID
Frontend PID: $FRONTEND_PID

Press CTRL+C to stop all services.
"

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Wait for processes
wait
