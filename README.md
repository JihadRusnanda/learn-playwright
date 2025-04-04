# Playwright BDD Framework

A modern test automation framework using Playwright with Cucumber for Behavior-Driven Development (BDD) and Jest for unit testing.

## Features

- 🎭 Playwright for browser automation
- 🥒 Cucumber for BDD testing
- 📝 TypeScript support
- 🎨 Beautiful HTML reports
- 📹 Video recording of test runs
- 🔍 Screenshot capture on failure
- 🎯 Parallel test execution
- 🔄 CI/CD integration with GitHub Actions
- 🧪 Jest for unit testing
- 🚀 Local CI/CD testing with act
- ⚡ Optimized CI/CD with dependency caching

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- VS Code (recommended)
- Docker (for running GitHub Actions locally with act)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JihadRusnanda/learn-playwright.git
cd learn-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables in `.env` with your configuration

5. Install act (for running GitHub Actions locally):
```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Windows (with Chocolatey)
choco install act-cli
```

## VS Code Setup for Cucumber

1. Install required extensions:
   - Cucumber (Gherkin) Full Support (Extension ID: `Alexander Krechik.cucumberautocomplete`)
   - Cucumber for VS Code (Extension ID: `stevejpurves.cucumber`)

2. Create `.vscode/settings.json`:
```json
{
    "cucumberautocomplete.steps": [
        "src/step-definitions/*.ts"
    ],
    "cucumberautocomplete.syncfeatures": "src/features/*.feature",
    "cucumberautocomplete.skipDocStringsFormat": true,
    "cucumberautocomplete.strictGherkinCompletion": true,
    "cucumberautocomplete.strictGherkinValidation": true,
    "cucumberautocomplete.customParameters": [
        {
            "parameter": "{word}",
            "value": "\\w+"
        }
    ]
}
```

## Project Structure

```
├── src/
│   ├── features/          # Cucumber feature files
│   ├── step-definitions/  # Step definition files
│   ├── pages/            # Page Object Models
│   └── support/          # Support files and world.ts
├── jest-results/         # Jest test results and coverage reports
├── screenshots/          # Test failure screenshots
├── videos/              # Test execution videos
├── artifacts/           # Local GitHub Actions artifacts
├── .github/
│   ├── workflows/       # GitHub Actions workflows
│   └── actions/         # Reusable GitHub Actions
├── cucumber.js          # Cucumber configuration
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
├── .env                 # Environment variables
├── .secrets             # Secrets for local GitHub Actions runs
└── package.json         # Project dependencies
```

## Running Tests

1. Run all BDD tests:
```bash
npm test
```

2. Run tests in parallel:
```bash
npm run test:parallel
```

3. Run specific feature:
```bash
npm test -- src/features/login.feature
```

4. Run with specific tags:
```bash
npm test -- --tags @smoke
```

5. Run in headed mode:
```bash
npm run test:headed
```

6. Run in debug mode:
```bash
npm run test:debug
```

7. Run unit tests:
```bash
npm run test:unit
```

8. Run web-specific tests:
```bash
npm run test:web
```

9. Run a specific scenario:
```bash
npm run test:scenario
```

## Running GitHub Actions Locally

You can run GitHub Actions workflows locally using act:

1. Run unit tests workflow:
```bash
act -j test -W .github/workflows/unit-tests.yml
```

2. Run feature tests workflow:
```bash
act -j test -W .github/workflows/feature-tests.yml
```

3. Run with artifact storage:
```bash
act -j test -W .github/workflows/unit-tests.yml --artifact-server-path ./artifacts
```

4. Run with environment variables and secrets:
```bash
act -j test -W .github/workflows/unit-tests.yml --env-file=.env --secret-file=.secrets
```

## Test Reports

After test execution, you can find:
- Cucumber HTML reports in `cucumber-report.html`
- Jest test results and coverage reports in `jest-results/` directory
- Test videos in `videos/` directory
- Screenshots in `screenshots/` directory (on test failure)
- GitHub Actions artifacts in `artifacts/` directory (when running with act)

## CI/CD Optimizations

The project includes several optimizations for faster CI/CD execution:

1. **Dependency Caching**: Node modules and Playwright browsers are cached between runs
2. **Composite Actions**: Reusable setup steps to avoid duplication
3. **Conditional Installation**: Dependencies are only installed when the cache is missed
4. **Parallel Test Execution**: Tests can be run in parallel for faster execution
5. **Optimized Artifact Handling**: Artifacts are only uploaded when necessary

## Dependencies

- @cucumber/cucumber: ^10.3.1
- @playwright/test: ^1.42.1
- cucumber-html-reporter: ^7.1.0
- dotenv: ^16.4.5
- jest: ^29.7.0
- typescript: ^5.3.3

## GitHub Actions

The project includes GitHub Actions workflows that:
- Run unit tests on push to main branch
- Run unit tests on pull requests
- Run feature tests on push to main branch
- Run feature tests on pull requests
- Run specific feature scenarios
- Generate and upload test reports as artifacts
- Support parallel test execution
- Use Node.js 18.x

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
