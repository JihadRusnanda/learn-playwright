#!/bin/bash

# Debug script for running CI unit tests locally

echo "🚀 Starting local CI debug environment..."

# Create artifacts directory
mkdir -p artifacts/jest-results

# Run unit tests with coverage
echo "📊 Running unit tests..."
npm run test:unit

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed. Check the output above for details."
fi

echo "📁 Test results are available in artifacts/jest-results/"
echo "✨ Debug session completed!" 