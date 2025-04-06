#!/bin/bash

# Debug script using act to run GitHub Actions locally

echo "🚀 Starting GitHub Actions debug environment using act..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Starting Docker..."
    open -a Docker
    echo "⏳ Waiting for Docker to start..."
    sleep 10
fi

# Check if act is installed
if ! command -v act &> /dev/null; then
    echo "❌ act is not installed. Installing now..."
    brew install act
fi

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GITHUB_TOKEN not set. Some actions may fail."
    echo "💡 To set up GitHub token:"
    echo "1. Go to https://github.com/settings/tokens"
    echo "2. Generate a new token with 'repo' scope"
    echo "3. Run: export GITHUB_TOKEN=your_token_here"
    echo "4. Then run this script again"
    read -p "Do you want to continue without a token? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run the unit tests workflow
echo "📊 Running unit tests workflow..."
act -W .github/workflows/unit-tests.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Check if act run was successful
if [ $? -eq 0 ]; then
    echo "✅ GitHub Actions workflow completed successfully!"
else
    echo "❌ GitHub Actions workflow failed. Check the output above for details."
    echo "💡 Troubleshooting tips:"
    echo "1. Make sure Docker is running (check Docker Desktop app)"
    echo "2. Try running 'docker ps' to verify Docker is working"
    echo "3. Set up a GitHub token as described above"
    echo "4. Restart Docker Desktop if issues persist"
fi

echo "📁 Test results are available in artifacts/jest-results/"
echo "✨ Debug session completed!" 