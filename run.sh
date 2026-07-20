#!/bin/bash

# Penny Reseller - Full Setup & Run Script

echo "🚀 Penny Reseller - Full Installation & Setup"
echo "================================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker
echo -e "${BLUE}Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo "${YELLOW}⚠️  Docker not found. Please install Docker first.${NC}"
    echo "Visit: https://www.docker.com/products/docker-desktop"
else
    echo -e "${GREEN}✓ Docker found${NC}"
fi

# Check Docker Compose
echo -e "${BLUE}Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo "${YELLOW}⚠️  Docker Compose not found. Please install Docker Compose.${NC}"
else
    echo -e "${GREEN}✓ Docker Compose found${NC}"
fi

# Setup env files
echo -e "${BLUE}Setting up environment files...${NC}"

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo "${YELLOW}⚠️  backend/.env already exists${NC}"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
else
    echo "${YELLOW}⚠️  frontend/.env.local already exists${NC}"
fi

# Start services
echo -e "${BLUE}Starting services with Docker Compose...${NC}"
echo ""
echo "🐳 Building and starting:"
echo "   - PostgreSQL database"
echo "   - Redis cache"
echo "   - Node.js backend API"
echo "   - Next.js frontend"
echo ""

docker-compose up

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "🌐 Access your application:"
echo -e "   Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "   Backend:  ${BLUE}http://localhost:5000${NC}"
echo -e "   Database: ${BLUE}http://localhost:5432${NC}"
echo -e "   Redis:    ${BLUE}http://localhost:6379${NC}"
echo ""
echo "📚 Documentation:"
echo "   - Full Setup: ./SETUP.md"
echo "   - Backend:   ./backend/README.md"
echo "   - Frontend:  ./frontend/README.md"
echo ""
