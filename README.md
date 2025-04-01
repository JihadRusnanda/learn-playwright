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
