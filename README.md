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

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- VS Code (recommended)

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
├── cucumber.js          # Cucumber configuration
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
├── .env                 # Environment variables
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

## Test Reports

After test execution, you can find:
- Cucumber HTML reports in `cucumber-report.html`
- Jest test results and coverage reports in `jest-results/` directory
- Test videos in `videos/` directory
- Screenshots in `screenshots/` directory (on test failure)

## Dependencies

- @cucumber/cucumber: ^10.3.1
- @playwright/test: ^1.42.1
- cucumber-html-reporter: ^7.1.0
- dotenv: ^16.4.5
- jest: ^29.7.0
- typescript: ^5.3.3

## GitHub Actions

The project includes a GitHub Actions workflow that:
- Runs tests on push to main branch
- Runs tests on pull requests
- Generates and uploads test reports as artifacts
- Supports parallel test execution
- Uses Node.js 18.x

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
