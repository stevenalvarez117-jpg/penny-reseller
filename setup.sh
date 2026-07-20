#!/bin/bash

# Penny Reseller Setup Script

echo "🚀 Setting up Penny Reseller..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Setup Backend
echo "\n📦 Setting up Backend..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend setup complete"

# Setup Frontend  
echo "\n🎨 Setting up Frontend..."
cd ../frontend
npm install
cp .env.example .env.local
echo "✅ Frontend setup complete"

echo "\n✨ Setup complete!"
echo "\n📝 Next steps:"
echo "1. Configure your .env files in backend/ and frontend/"
echo "2. Set up PostgreSQL and Redis"
echo "3. Run: docker-compose up"
echo "\n🎉 Happy reselling!"
