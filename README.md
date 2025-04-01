# Playwright BDD Framework

This is a test automation framework built with Playwright, implementing BDD (Behavior Driven Development) and Page Object Model (POM) patterns.

## Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions workflow
├── src/
│   ├── features/            # Cucumber feature files
│   ├── pages/              # Page Object Models
│   └── step-definitions/   # Cucumber step definitions
├── cucumber.js             # Cucumber configuration
├── package.json           # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests:
  ```bash
  npm run test
  ```

- Run tests in parallel:
  ```bash
  npm run test:parallel
  ```

- Generate HTML report:
  ```bash
  npm run report
  ```

## Writing Tests

1. Create feature files in `src/features/`
2. Create step definitions in `src/step-definitions/`
3. Create page objects in `src/pages/`

## CI/CD

The framework includes GitHub Actions workflow that runs tests on:
- Push to main/master branch
- Pull requests to main/master branch

## Best Practices

- Use Page Object Model for better maintainability
- Write descriptive feature files
- Keep step definitions clean and reusable
- Use TypeScript for better type safety

## VS Code Setup for Cucumber

### Required Extensions
1. Cucumber (Gherkin) Full Support
   - Extension ID: `Alexander Krechik.cucumberautocomplete`
   - Provides step definition navigation and autocomplete

2. Cucumber for VS Code
   - Extension ID: `stevejpurves.cucumber`
   - Provides syntax highlighting and step definition navigation

### Configuration
1. Create a `.vscode` directory in your project root:
   ```bash
   mkdir .vscode
   ```

2. Copy the example settings file:
   ```bash
   cp .vscode/settings.json.example .vscode/settings.json
   ```

The settings file includes:
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

### Features
- Click on steps in feature files to navigate to step definitions
- Get autocomplete suggestions while typing steps
- Syntax highlighting for Gherkin keywords
- Step definition validation
