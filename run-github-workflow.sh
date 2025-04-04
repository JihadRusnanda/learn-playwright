#!/bin/bash

# Set environment variables
export ACTIONS_RUNTIME_TOKEN="local-run-token"
export ACT="true"

# Create artifacts directory if it doesn't exist
mkdir -p ./artifacts

# Set the scenario name from environment variable or use default
SCENARIO_NAME=${SCENARIO:-"[Web] Sell From Real with auto rejection lower limit"}
echo "Running scenario: $SCENARIO_NAME"

# Run the workflow with act
echo "Running GitHub Actions workflow with act..."
sudo -E act workflow_dispatch -W .github/workflows/local-test.yml \
  --secret-file=.secrets \
  --env-file=.env \
  --artifact-server-path ./artifacts \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  --env SCENARIO_NAME="$SCENARIO_NAME" \
  --env ACT="true" \
  --bind \
  -v \
  --reuse

echo "GitHub Actions workflow run completed!" 