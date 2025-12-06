#!/bin/bash

echo "🚀 Deploying to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Build the project first to check for errors
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
